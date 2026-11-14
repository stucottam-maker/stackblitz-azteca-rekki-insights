'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useWorkspace } from '../components/WorkspaceProvider';
import Link from 'next/link';

type Task = { id: string; label: string; detail: string; done: boolean };
const initialTasks: Task[] = [
  { id: 'opening', label: 'Opening checklist', detail: 'Kitchen, hygiene & service readiness', done: false },
  { id: 'fridges', label: 'Fridge temperatures', detail: 'Fridges, freezers & cold storage', done: false },
  { id: 'deliveries', label: 'Delivery checks', detail: 'Incoming goods & temperatures', done: false },
  { id: 'closing', label: 'Closing checklist', detail: 'Cleaning, waste & security', done: false },
];

export default function CompliancePage() {
  const [tasks, setTasks] = useState(initialTasks);
  const { activeWorkspace } = useWorkspace();
  const site = activeWorkspace ? { id: activeWorkspace.siteId, organisation_id: activeWorkspace.organisationId, name: activeWorkspace.siteName } : null;
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
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
      setFeedback('Record submitted for supervisor review.');
      return true;
    } catch(err) {setFeedback(err instanceof Error?err.message:'Could not save record.');return false;}
    finally {setSaving(false);}
  }
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<'today' | 'temperatures' | 'deliveries'>('today');
  useEffect(() => { const selected=searchParams.get('tab'); if(selected==='temperatures'||selected==='deliveries') setTab(selected); },[searchParams]);
  const equipmentNames = ['Walk-in fridge','Prep fridge','Upright fridge','Freezer','Other equipment'];
  const [temperatures, setTemperatures] = useState<Record<string,string>>({});
  const [readings, setReadings] = useState<{equipment:string; temperature:number; at:string}[]>([]);
  const [supplier, setSupplier] = useState('');
  const [deliveryTemp, setDeliveryTemp] = useState('');
  const [deliveries, setDeliveries] = useState<{supplier:string; temperature:number; at:string}[]>([]);
  const [checkView,setCheckView] = useState<'scheduled'|'on-demand'>('scheduled');
  const [round,setRound] = useState<'morning'|'afternoon'>('morning');
  const card = 'rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4';
  const field = 'w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900';
  const btn = 'rounded-xl bg-teal-800 px-4 py-3 font-semibold text-white disabled:opacity-40';
  const now = () => new Date().toLocaleString('en-GB');

  return <main className="ki-v2-workflow ki-v2-compliance min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="flex items-center justify-between">
        <div><Link href="/" className="text-sm text-teal-800">← Kitchen Insights</Link><h1 className="mt-2 text-3xl font-bold">Compliance</h1><p className="text-slate-500">Daily kitchen checks</p></div>
        <span className="rounded-xl bg-teal-50 px-3 py-2 text-sm font-medium text-teal-900">Live records</span>
      </header>
      <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Submitted checklists and measurements are saved to your selected site for review. Follow your site&apos;s approved food safety procedures; automated limits and scheduling are not yet configured.</p>{site && <p className="text-sm text-slate-600">Site: {site.name}</p>}{feedback && <p role="status" className="rounded-xl bg-slate-100 p-3 text-sm">{feedback}</p>}
      <Link href="/compliance/review" className="block rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-900">Checklist records & manager review →</Link>
      <nav className="flex gap-2 overflow-x-auto">
        {(['today','temperatures','deliveries'] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-medium capitalize ${tab === t ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}>{t}</button>)}
      </nav>
      {tab === 'today' && <>
        <section className="rounded-3xl bg-teal-900 p-5 text-white"><p className="text-sm opacity-80">Daily Checks</p><h2 className="mt-1 text-2xl font-bold">Today&apos;s food safety checks</h2><p className="mt-2 text-sm text-teal-50">Open scheduled tasks or start an extra check when needed. Submitted checks are stored for manager review.</p></section>
        <div role="tablist" aria-label="Check type" className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-1">
          {(['scheduled','on-demand'] as const).map(v=><button role="tab" aria-selected={checkView===v} key={v} onClick={()=>setCheckView(v)} className={`min-h-12 rounded-xl px-3 font-semibold ${checkView===v?'bg-teal-800 text-white':'text-slate-700'}`}>{v==='scheduled'?'Scheduled':'On-demand'}</button>)}
        </div>
        {checkView==='scheduled' && <div className="grid grid-cols-2 gap-2"><button onClick={()=>setRound('morning')} aria-pressed={round==='morning'} className={`rounded-xl px-4 py-3 font-semibold ${round==='morning'?'bg-teal-50 text-teal-900 ring-2 ring-teal-700':'bg-white text-slate-700'}`}>Morning</button><button onClick={()=>setRound('afternoon')} aria-pressed={round==='afternoon'} className={`rounded-xl px-4 py-3 font-semibold ${round==='afternoon'?'bg-teal-50 text-teal-900 ring-2 ring-teal-700':'bg-white text-slate-700'}`}>Afternoon / Closing</button></div>}
        <section aria-label="Available checks" className="space-y-3">
          {(checkView==='scheduled'?(round==='morning'?[
            {name:'Opening checks',desc:'Hygiene, surfaces and pest activity',when:'Before service',href:'/compliance/checklist/opening'},
            {name:'Chiller & freezer temperatures',desc:'Individual equipment readings',when:'Morning round',href:'/compliance?tab=temperatures'},
            {name:'Cooking & reheating',desc:'Core food temperature checks',when:'During preparation',href:'/compliance/food-temperatures'},
            {name:'Delivery checks',desc:'Goods received and condition',when:'As deliveries arrive',href:'/compliance?tab=deliveries'}
          ]:[
            {name:'Afternoon temperatures',desc:'Fridges and freezers',when:'Afternoon round',href:'/compliance?tab=temperatures'},
            {name:'Hot holding',desc:'Service temperature monitoring',when:'During service',href:'/compliance/food-temperatures'},
            {name:'Kitchen cleaning',desc:'Equipment, surfaces and utensils',when:'End of shift',href:'/compliance/checklist/cleaning'},
            {name:'Closing checks',desc:'Storage, waste and security',when:'End of day',href:'/compliance/checklist/closing'}
          ]):[
            {name:'Extra cleaning',desc:'Additional cleaning check',when:'When required',href:'/compliance/checklist/cleaning'},
            {name:'Additional temperature round',desc:'Fridges and freezers',when:'When required',href:'/compliance?tab=temperatures'},
            {name:'Delivery check',desc:'Extra delivery inspection',when:'When required',href:'/compliance?tab=deliveries'},
            {name:'Food cooling',desc:'Food name, method and timings',when:'When required',href:'/compliance/food-temperatures'},
            {name:'Fish freezing',desc:'Freezing process monitoring',when:'Where applicable',href:''},
            {name:'Pickles & chutneys',desc:'Batch pH and water activity',when:'Where applicable',href:''}
          ]).map(item=><article key={item.name} className={card+' flex items-center gap-2.5 sm:gap-3'}>
            <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-base text-teal-800 sm:h-11 sm:w-11">○</span>
            <div className="min-w-0 flex-1"><h2 className="break-words text-[17px] font-semibold leading-snug sm:text-lg">{item.name}</h2><p className="mt-1 text-[13px] leading-snug text-slate-500 sm:text-sm">{item.desc}</p><p className="mt-1 text-xs leading-snug text-slate-500">{item.when}</p></div>
            {item.href?<Link href={item.href} className="flex min-h-11 shrink-0 items-center rounded-xl bg-teal-50 px-2.5 py-2 text-[13px] font-semibold text-teal-900 sm:px-3 sm:text-sm">Open →</Link>:<span className="text-xs font-semibold text-slate-500">Coming soon</span>}
          </article>)}
        </section>
        <p className="text-xs text-slate-500">Scheduling is a preview grouping, not yet automatic deadlines. Progress and staff sign-off will require permanent audit records. Specialist checks are not active until configured for the site.</p>
      </>}
      {tab === 'temperatures' && <section className={card}>
        <h2 className="mb-1 text-xl font-bold">Record temperatures</h2>
        <p className="mb-4 text-sm text-slate-500">Enter each equipment reading below. All temperatures are visible together.</p>
        <form className="space-y-4" onSubmit={async e=>{
          e.preventDefault();
          const entries=equipmentNames.filter(name=>temperatures[name]?.trim() && Number.isFinite(Number(temperatures[name])));
          if(!entries.length || !site) return;
          setSaving(true);setFeedback('');
          try {
            const {data:{user},error:authError}=await supabase.auth.getUser();
            if(authError||!user) throw new Error('Please sign in again.');
            const rows=entries.map(name=>({check_type:'temperature',label:'Equipment temperature',equipment_name:name,measured_temperature_c:Number(temperatures[name]),organisation_id:site.organisation_id,site_id:site.id,recorded_by:user.id,status:'needs_review'}));
            const {error}=await supabase.from('compliance_checks').insert(rows);
            if(error) throw error;
            const at=now();
            setReadings(prev=>[...entries.map(name=>({equipment:name,temperature:Number(temperatures[name]),at})),...prev]);
            setTemperatures(prev=>Object.fromEntries(Object.entries(prev).filter(([name])=>!entries.includes(name))));
            setFeedback(`${entries.length} reading(s) submitted for supervisor review.`);
          } catch(err){setFeedback(err instanceof Error?err.message:'Could not save readings.');}
          finally {setSaving(false);}
        }}>
          <div className="space-y-3">
            {equipmentNames.map(name=><label key={name} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 sm:text-base">{name}</span>
              <span className="flex shrink-0 items-center gap-2"><input aria-label={name+' temperature in Celsius'} type="number" inputMode="decimal" step="0.1" value={temperatures[name]??''} onChange={e=>setTemperatures(prev=>({...prev,[name]:e.target.value}))} placeholder="—" className="w-24 rounded-xl border border-slate-300 bg-white px-3 py-3 text-right text-lg font-semibold text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-100" /><span className="text-sm font-semibold text-slate-600">°C</span></span>
            </label>)}
          </div>
          <p className="text-xs text-slate-500">Only filled-in readings are submitted. Equipment thresholds and corrective-action workflows are not yet configured. Continue using approved food safety records.</p>
          <button type="submit" disabled={saving || !site || !equipmentNames.some(name=>temperatures[name]?.trim() && Number.isFinite(Number(temperatures[name])))} className={btn+' w-full'}>{saving?'Saving…':'Submit temperature readings for review'}</button>
        </form>
        {readings.length>0 && <div className="mt-5 space-y-2"><h3 className="font-semibold">Submitted this session</h3>{readings.map((r,i)=><div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm" key={i}><span>{r.equipment}<span className="block text-xs text-slate-500">{r.at}</span></span><strong>{r.temperature}°C</strong></div>)}</div>}
      </section>}
      {tab === 'deliveries' && <section className={card}><h2 className="mb-4 text-xl font-bold">Delivery check</h2><form className="space-y-4" onSubmit={async e=>{e.preventDefault();if(supplier.trim()&&deliveryTemp.trim()&&Number.isFinite(Number(deliveryTemp))){const ok=await saveCheck({check_type:'delivery',label:'Delivery temperature',measured_temperature_c:Number(deliveryTemp),notes:'Supplier: '+supplier.trim()});if(ok){setDeliveries(d=>[{supplier:supplier.trim(),temperature:Number(deliveryTemp),at:now()},...d]);setSupplier('');setDeliveryTemp('');}}}}><label className="block text-sm font-medium">Supplier<input className={`${field} mt-1`} required value={supplier} onChange={e=>setSupplier(e.target.value)} placeholder="Supplier name"/></label><label className="block text-sm font-medium">Measured temperature (°C)<input className={`${field} mt-1`} type="number" step="0.1" required value={deliveryTemp} onChange={e=>setDeliveryTemp(e.target.value)}/></label><p className="text-xs text-slate-500">Product condition, acceptance, evidence and invoice matching will be added before production use.</p><button disabled={saving || !site} className={btn}>{saving?'Saving…':'Submit delivery for review'}</button></form><div className="mt-5 space-y-2">{deliveries.map((d,i)=><div className="rounded-xl bg-slate-50 p-3 text-sm" key={i}>{d.supplier}: <strong>{d.temperature}°C</strong><span className="block text-slate-500">{d.at}</span></div>)}</div></section>}
    </div>
  </main>;
}
