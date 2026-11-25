'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useWorkspace } from '../components/WorkspaceProvider';
import Link from 'next/link';

type DailySummary = { opening:number; closing:number; cleaning:number; readings:number; am:number; pm:number; deliveries:number; flagged:number };
const checklistTypes = ['opening','cleaning','closing'] as const;
function localDay(date:Date) {
  return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
}
type Tile = { title:string; detail:string; icon:string; status:string; href?:string; action?:()=>void; tone?:'done'|'attention' };

export default function CompliancePage() {
  const { activeWorkspace } = useWorkspace();
  const site = activeWorkspace ? { id: activeWorkspace.siteId, organisation_id: activeWorkspace.organisationId, name: activeWorkspace.siteName } : null;
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [day,setDay] = useState(()=>localDay(new Date()));
  const [summary,setSummary] = useState<{key:string;data:DailySummary|null;error:boolean}|null>(null);
  const siteId=site?.id, orgId=site?.organisation_id;
  const summaryKey=siteId && orgId ? [orgId,siteId,day,refresh].join(':') : '';
  const daily=summary?.key===summaryKey ? summary.data : null;
  const summaryError=summary?.key===summaryKey && summary.error;
  useEffect(()=>{
    const sync=()=>{setDay(localDay(new Date()));setRefresh(n=>n+1);};
    window.addEventListener('focus',sync);
    const timer=window.setInterval(()=>setDay(localDay(new Date())),30000);
    return ()=>{window.removeEventListener('focus',sync);window.clearInterval(timer);};
  },[]);
  useEffect(()=>{
    if(!siteId || !orgId || !summaryKey) return;
    let cancelled=false;
    async function load(){
      try{
        const start=new Date(day+'T00:00:00');
        const end=new Date(start);end.setDate(end.getDate()+1);
        const base=()=>supabase.from('compliance_checklist_submissions').select('id',{count:'exact',head:true}).eq('site_id',siteId).eq('organisation_id',orgId).eq('check_date',day);
        const records=(type:string)=>supabase.from('compliance_checks').select('id',{count:'exact',head:true}).eq('site_id',siteId).eq('organisation_id',orgId).eq('check_type',type).gte('recorded_at',start.toISOString()).lt('recorded_at',end.toISOString());
        const results=await Promise.all([
          base().eq('checklist_type','opening'),base().eq('checklist_type','closing'),base().eq('checklist_type','cleaning'),
          records('temperature').in('label',['Equipment temperature','Equipment temperature AM','Equipment temperature PM']),records('temperature').eq('label','Equipment temperature AM'),records('temperature').eq('label','Equipment temperature PM'),records('delivery'),
          base().gt('failure_count',0).eq('status','needs_review')
        ]);
        if(results.some(r=>r.error || r.count===null))throw new Error('Daily records unavailable');
        const [opening,closing,cleaning,readings,am,pm,deliveries,flagged]=results.map(r=>r.count ?? 0);
        if(!cancelled)setSummary({key:summaryKey,data:{opening,closing,cleaning,readings,am,pm,deliveries,flagged},error:false});
      }catch{if(!cancelled)setSummary({key:summaryKey,data:null,error:true});}
    }
    void load();
    return ()=>{cancelled=true;};
  },[siteId,orgId,day,summaryKey]);
  useEffect(()=>{
    setDrafts({AM:{},PM:{}});setSupplier('');setDeliveryTemp('');setDeliveries([]);setFeedback('');
  },[siteId,orgId]);
  async function saveCheck(input:{check_type:string;label:string;measured_temperature_c?:number;equipment_name?:string;notes?:string}) {
    if(!site) {setFeedback('Select an authorised site before saving.');return false;}
    setSaving(true);setFeedback('');
    try {
      const {data:{user},error:authError}=await supabase.auth.getUser();
      if(authError||!user) throw new Error('Please sign in again.');
      const {error}=await supabase.from('compliance_checks').insert({
        ...input,organisation_id:site.organisation_id,site_id:site.id,recorded_by:user.id,status:'needs_review'
      });
      if(error) throw error;
      setFeedback('Record submitted for supervisor review.');setRefresh(n=>n+1);
      return true;
    } catch(err) {setFeedback(err instanceof Error?err.message:'Could not save record.');return false;}
    finally {setSaving(false);}
  }
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<'today' | 'temperatures' | 'deliveries'>('today');
  useEffect(() => { const selected=searchParams.get('tab'); setTab(selected==='temperatures'||selected==='deliveries'?selected:'today'); },[searchParams]);
  const equipmentNames = ['Walk-in fridge','Prep fridge','Upright fridge','Freezer','Other equipment'];
  const [round,setRound]=useState<'AM'|'PM'>(()=>new Date().getHours()<12?'AM':'PM');
  const [drafts,setDrafts]=useState<Record<'AM'|'PM',Record<string,string>>>({AM:{},PM:{}});
  const temperatures=drafts[round];
  const [history,setHistory]=useState<{key:string;rows:{id:string;equipment_name:string|null;measured_temperature_c:number;recorded_at:string;label:string}[];error:boolean}|null>(null);
  useEffect(()=>{
    if(!siteId||!orgId)return;
    let cancelled=false;
    async function load(){
      try{
        const start=new Date(day+'T00:00:00'),end=new Date(start);end.setDate(end.getDate()+1);
        const {data,error}=await supabase.from('compliance_checks').select('id,equipment_name,measured_temperature_c,recorded_at,label').eq('site_id',siteId).eq('organisation_id',orgId).eq('check_type','temperature').in('label',['Equipment temperature','Equipment temperature AM','Equipment temperature PM']).gte('recorded_at',start.toISOString()).lt('recorded_at',end.toISOString()).order('recorded_at',{ascending:false});
        if(error)throw error;
        if(!cancelled)setHistory({key:summaryKey,rows:data||[],error:false});
      }catch{if(!cancelled)setHistory({key:summaryKey,rows:[],error:true});}
    }
    void load();return()=>{cancelled=true;};
  },[siteId,orgId,day,summaryKey]);
  const currentHistory=history?.key===summaryKey?history:null;
  const readings=currentHistory?.rows.filter(r=>r.label==='Equipment temperature '+round)||[];
  const previous=(name:string)=>readings.find(r=>r.equipment_name===name);
  const [supplier, setSupplier] = useState('');
  const [deliveryTemp, setDeliveryTemp] = useState('');
  const [deliveries, setDeliveries] = useState<{supplier:string; temperature:number; at:string}[]>([]);
  const card = 'rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4';
  const field = 'w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900';
  const btn = 'rounded-xl bg-teal-800 px-4 py-3 font-semibold text-white disabled:opacity-40';
  const now = () => new Date().toLocaleString('en-GB');
  const complete=daily?checklistTypes.filter(t=>daily[t]>0).length:0;
  const progress=daily?Math.round(complete/checklistTypes.length*100):null;
  const checklistStatus=(type:typeof checklistTypes[number])=>daily?(daily[type]>0?'Submitted for review':'Not submitted today'):'Status unavailable';
  const tiles:Tile[]=[
    {title:'Opening checks',icon:'sun',detail:'Before service',status:checklistStatus('opening'),href:'/compliance/checklist/opening',tone:daily?.opening?'done':undefined},
    {title:'Closing checks',icon:'moon',detail:'End of service',status:checklistStatus('closing'),href:'/compliance/checklist/closing',tone:daily?.closing?'done':undefined},
    {title:'Temperatures',icon:'thermometer',detail:'Fridges & freezers',status:daily?'AM: '+daily.am+' · PM: '+daily.pm:'Status unavailable',action:()=>setTab('temperatures')},
    {title:'Cleaning',icon:'sparkles',detail:'Daily cleaning schedule',status:checklistStatus('cleaning'),href:'/compliance/checklist/cleaning',tone:daily?.cleaning?'done':undefined},
    {title:'Cooking & cooling',icon:'pot',detail:'Food & batch temperatures',status:'Record a measurement',href:'/compliance/food-temperatures'},
    {title:'Deliveries',icon:'truck',detail:'Incoming goods',status:daily?daily.deliveries+' records today':'Status unavailable',action:()=>setTab('deliveries')},
    {title:'Pest control',icon:'bug',detail:'Included in opening checklist',status:'Open pest check',href:'/compliance/checklist/opening'},
    {title:'Records & review',icon:'clipboard',detail:'Saved checklists',status:daily?daily.flagged+' flagged checklist(s) awaiting review':'View records',href:'/compliance/review',tone:daily?.flagged?'attention':undefined},
    {title:'Food waste',icon:'bin',detail:'Ingredient-linked waste costing',status:'Open waste log',href:'/compliance/waste'},
    {title:'Allergens',icon:'list',detail:'Verified recipe allergen matrix',status:'Open draft matrix',href:'/compliance/allergens'},
    {title:'HACCP & reports',icon:'shield',detail:'Site-specific plans & inspection export',status:'Open plans & exports',href:'/compliance/haccp'}
  ];

  return <main className="ki-v2-workflow ki-v2-compliance min-h-screen bg-slate-50 px-4 pt-6 pb-32 text-slate-900">
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="flex items-center justify-between gap-3">
        <div><Link href="/" className="text-sm font-semibold text-teal-800">← Kommee</Link><h1 className="mt-2 text-3xl font-bold">Kitchen compliance</h1><p className="mt-1 text-sm text-slate-600">{site?.name ?? 'Select a site'} · {new Date(day+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</p></div>
        <button type="button" onClick={()=>{setDay(localDay(new Date()));setRefresh(n=>n+1);}} className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-teal-800">Refresh</button>
      </header>
      {feedback && <p role="status" className="rounded-xl bg-slate-100 p-3 text-sm">{feedback}</p>}
      <nav aria-label="Compliance sections" className="grid grid-cols-3 gap-2">
        {(['today','temperatures','deliveries'] as const).map(t=><button key={t} type="button" aria-pressed={tab===t} onClick={()=>setTab(t)} className={`min-h-11 rounded-xl px-2 py-2 text-xs font-semibold capitalize sm:text-sm ${tab===t?'bg-teal-800 text-white':'border border-slate-200 bg-white text-slate-700'}`}>{t}</button>)}
      </nav>
      {tab === 'today' && <>
        <section className="rounded-3xl bg-[#254c39] p-5 text-white shadow-sm sm:p-6" aria-label="Today's checklist progress">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0"><p className="text-sm font-medium text-white">Today&apos;s checklist progress</p><p className="mt-1 text-4xl font-bold tabular-nums">{progress===null?'–':progress+'%'}</p><p className="mt-2 text-sm text-white">{daily?complete+' of 3 checklist types submitted':!site?'Select a site to see progress':summaryError?'Could not load saved records':'Loading saved records…'}</p></div>
            <svg viewBox="0 0 80 80" className="h-20 w-20 shrink-0" aria-hidden="true"><circle cx="40" cy="40" r="32" fill="none" stroke="#557563" strokeWidth="7"/><circle cx="40" cy="40" r="32" fill="none" stroke="#c9e6a8" strokeWidth="7" strokeLinecap="round" strokeDasharray={201.06} strokeDashoffset={201.06*(1-(progress??0)/100)} transform="rotate(-90 40 40)"/><text x="40" y="45" fill="white" textAnchor="middle" fontSize="14" fontWeight="bold">{daily?complete+'/3':'–'}</text></svg>
          </div>
          <p className="mt-4 text-xs text-white">Measures checklist submissions only, not food safety compliance or manager approval.</p>
        </section>
        {summaryError && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Saved records could not be loaded. Refresh to retry; missing data is not treated as zero.</p>}
        {daily && daily.flagged>0 && <Link href="/compliance/review" className="block rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">{daily.flagged} checklist(s) with failed answers awaiting review →</Link>}
        <section aria-label="Kitchen checks" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tiles.map(tile=>{
            const content=<><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ee] text-[#254c39]"><TileIcon name={tile.icon}/></span><h2 className="mt-2 break-words text-sm font-bold leading-snug sm:text-base">{tile.title}</h2><p className="mt-1 text-xs leading-snug text-slate-600">{tile.detail}</p><p className={`mt-3 text-xs font-semibold leading-snug ${tile.tone==='attention'?'text-amber-800':tile.tone==='done'?'text-green-800':'text-slate-600'}`}>{tile.status}</p></>;
            const style="min-h-[144px] rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm sm:p-4";
            return tile.href?<Link key={tile.title} href={tile.href} className={style+' hover:border-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700'}>{content}</Link>:tile.action?<button key={tile.title} type="button" onClick={tile.action} className={style+' hover:border-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700'}>{content}</button>:<article key={tile.title} className={style+' opacity-70'}>{content}</article>;
          })}
        </section>
        <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">Follow your site&apos;s approved food safety procedures. Automated deadlines, temperature limits, equipment configuration are not yet configured. Review HACCP records against approved procedures.</p>
      </>}
      {tab === 'temperatures' && <section className={card}>
        <h2 className="mb-1 text-xl font-bold">Record temperatures</h2>
        <p className="mb-4 text-sm text-slate-500">Select the round. AM and PM readings are recorded separately.</p>
        <div className="mb-4 grid grid-cols-2 gap-2">{(['AM','PM'] as const).map(r=><button type="button" key={r} disabled={saving} aria-pressed={round===r} onClick={()=>setRound(r)} className={`min-h-16 rounded-2xl border p-3 text-left ${round===r?'bg-[#254c39] text-white border-[#254c39]':'bg-white text-slate-800 border-slate-200'}`}><strong>{r==='AM'?'☀ AM · Morning':'☾ PM · Afternoon'}</strong><span className="mt-1 block text-xs">{daily?(r==='AM'?daily.am:daily.pm)+' readings saved':'Checking records…'}</span></button>)}</div>
        {currentHistory?.error&&<p role="alert" className="mb-3 text-sm text-amber-900">Saved temperatures could not be loaded. Refresh to retry.</p>}
        <form className="space-y-4" onSubmit={async e=>{
          e.preventDefault();
          const entries=equipmentNames.filter(name=>temperatures[name]?.trim() && Number.isFinite(Number(temperatures[name])));
          if(!entries.length || !site) return;
          setSaving(true);setFeedback('');
          try {
            const {data:{user},error:authError}=await supabase.auth.getUser();
            if(authError||!user) throw new Error('Please sign in again.');
            const rows=entries.map(name=>({check_type:'temperature',label:'Equipment temperature '+round,equipment_name:name,measured_temperature_c:Number(temperatures[name]),organisation_id:site.organisation_id,site_id:site.id,recorded_by:user.id,status:'needs_review'}));
            const {error}=await supabase.from('compliance_checks').insert(rows);
            if(error) throw error;
            setDrafts(prev=>({...prev,[round]:Object.fromEntries(Object.entries(prev[round]).filter(([name])=>!entries.includes(name)))}));
            setFeedback(`${entries.length} ${round} reading(s) submitted for supervisor review.`);setRefresh(n=>n+1);
          } catch(err){setFeedback(err instanceof Error?err.message:'Could not save readings.');}
          finally {setSaving(false);}
        }}>
          <div className="space-y-3">
            {equipmentNames.map(name=><label key={name} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 sm:text-base">{name}{previous(name)&&<small className="block text-xs font-normal text-slate-500">Last saved: {previous(name)?.measured_temperature_c}°C</small>}</span>
              <span className="flex shrink-0 items-center gap-2"><input aria-label={name+' temperature in Celsius'} type="number" inputMode="decimal" step="0.1" value={temperatures[name]??''} disabled={saving} onChange={e=>setDrafts(prev=>({...prev,[round]:{...prev[round],[name]:e.target.value}}))} placeholder="—" className="w-24 rounded-xl border border-slate-300 bg-white px-3 py-3 text-right text-lg font-semibold text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-100" /><span className="text-sm font-semibold text-slate-600">°C</span></span>
            </label>)}
          </div>
          <p className="text-xs text-slate-500">Only filled-in readings are submitted. Equipment thresholds and corrective-action workflows are not yet configured. Continue using approved food safety records.</p>
          <button type="submit" disabled={saving || !site || !equipmentNames.some(name=>temperatures[name]?.trim() && Number.isFinite(Number(temperatures[name])))} className={btn+' w-full'}>{saving?'Saving…':'Submit '+round+' readings for review'}</button>
        </form>
        {readings.length>0 && <div className="mt-5 space-y-2"><h3 className="font-semibold">Saved {round} readings today</h3>{readings.map(r=><div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm" key={r.id}><span>{r.equipment_name}<span className="block text-xs text-slate-500">{new Date(r.recorded_at).toLocaleString('en-GB')}</span></span><strong>{r.measured_temperature_c}°C</strong></div>)}</div>}
      </section>}
      {tab === 'deliveries' && <section className={card}><h2 className="mb-4 text-xl font-bold">Delivery check</h2><form className="space-y-4" onSubmit={async e=>{e.preventDefault();if(supplier.trim()&&deliveryTemp.trim()&&Number.isFinite(Number(deliveryTemp))){const ok=await saveCheck({check_type:'delivery',label:'Delivery temperature',measured_temperature_c:Number(deliveryTemp),notes:'Supplier: '+supplier.trim()});if(ok){setDeliveries(d=>[{supplier:supplier.trim(),temperature:Number(deliveryTemp),at:now()},...d]);setSupplier('');setDeliveryTemp('');}}}}><label className="block text-sm font-medium">Supplier<input className={`${field} mt-1`} required value={supplier} onChange={e=>setSupplier(e.target.value)} placeholder="Supplier name"/></label><label className="block text-sm font-medium">Measured temperature (°C)<input className={`${field} mt-1`} type="number" step="0.1" required value={deliveryTemp} onChange={e=>setDeliveryTemp(e.target.value)}/></label><p className="text-xs text-slate-500">Product condition, acceptance, evidence and invoice matching will be added before production use.</p><button disabled={saving || !site} className={btn}>{saving?'Saving…':'Submit delivery for review'}</button></form><div className="mt-5 space-y-2">{deliveries.map((d,i)=><div className="rounded-xl bg-slate-50 p-3 text-sm" key={i}>{d.supplier}: <strong>{d.temperature}°C</strong><span className="block text-slate-500">{d.at}</span></div>)}</div></section>}
    </div>
  </main>;
}

function TileIcon({name}:{name:string}){
  const paths:Record<string,string>={
    sun:'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    moon:'M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z',
    thermometer:'M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0ZM12 10v7',
    sparkles:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
    pot:'M4 10h16v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7ZM2 10h20M8 6h8M12 3v3',
    truck:'M3 5h12v12H3zM15 9h4l3 4v4h-7M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    bug:'M8 8h8v8a4 4 0 0 1-8 0V8Zm0 3H4m12 0h4M8 15H4m12 0h4M9 5l3 3 3-3M12 8v12',
    clipboard:'M8 5H5v16h14V5h-3M8 3h8v4H8zM8 11h8m-8 4h8',
    bin:'M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
    list:'M5 5h14v14H5zM8 9h8m-8 3h8m-8 3h8',
    shield:'M12 3 4 6v5c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-3Zm-4 9 3 3 5-6'
  };
  return <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.list}/></svg>;
}
