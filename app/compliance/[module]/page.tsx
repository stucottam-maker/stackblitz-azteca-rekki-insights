'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {supabase} from '../../lib/supabase';
import {useWorkspace} from '../../components/WorkspaceProvider';
import {recipes as legacyRecipes,recipeSlug} from '../../data/allRecipes';
import {demoRecipes} from '../../data/demoRecipes';
import {usesAztecaLegacyCatalogue,usesKommeeDemoCatalogue} from '../../lib/workspaceCatalogues';

const allergens=['Celery','Cereals containing gluten','Crustaceans','Eggs','Fish','Lupin','Milk','Molluscs','Mustard','Tree nuts','Peanuts','Sesame','Soya','Sulphur dioxide / sulphites'];
type AllergenStatus='unknown'|'contains'|'may contain'|'not listed in reviewed sources';
type Kind='waste'|'allergen'|'haccp';
type Entry={id:string;title:string;details:Record<string,any>;recorded_at:string;recorded_by:string};
type Price={id:string;ingredient_id:string;name:string;price:number;unit:string;date:string;invoice:string|null};
const field='mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900';
const button='min-h-12 w-full rounded-xl bg-[#254c39] px-4 py-3 font-semibold text-white disabled:opacity-40';
const panel='space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm';
const money=(n:number)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(n);
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const freshMatrix=()=>Object.fromEntries(allergens.map(a=>[a,'unknown'])) as Record<string,AllergenStatus>;
function csvCell(value:unknown){let s=typeof value==='object'&&value!==null?JSON.stringify(value):String(value??'');if(/^[\s]*[=+\-@]/.test(s)&&typeof value!=='number')s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
function downloadCsv(name:string,rows:unknown[][]){const blob=new Blob(['\ufeff'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export default function ExtraCompliance({params}:{params:{module:string}}){
 const {activeWorkspace}=useWorkspace();
 const kind:Kind|null=params.module==='waste'?'waste':params.module==='allergens'?'allergen':params.module==='haccp'?'haccp':null;
 const site=activeWorkspace?.siteId,org=activeWorkspace?.organisationId;
 const scope=[org,site,kind].join(':');
 const [loaded,setLoaded]=useState('');
 const [records,setRecords]=useState<Entry[]>([]);
 const [prices,setPrices]=useState<Price[]>([]);
 const [priceError,setPriceError]=useState('');
 const [error,setError]=useState('');
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);
 const [refresh,setRefresh]=useState(0);
 const [title,setTitle]=useState('');
 const [priceId,setPriceId]=useState('');
 const [qty,setQty]=useState('');
 const [unit,setUnit]=useState('');
 const [reason,setReason]=useState('Preparation waste');
 const [notes,setNotes]=useState('');
 const [recipeId,setRecipeId]=useState('');
 const [matrix,setMatrix]=useState(freshMatrix);
 const [source,setSource]=useState('');
 const [hazard,setHazard]=useState('');
 const [control,setControl]=useState('');
 const [limit,setLimit]=useState('');
 const [monitor,setMonitor]=useState('');
 const [action,setAction]=useState('');
 const [start,setStart]=useState(today);
 const [end,setEnd]=useState(today);
 const recipes=usesAztecaLegacyCatalogue(org)?legacyRecipes:usesKommeeDemoCatalogue(org)?demoRecipes:[];
 useEffect(()=>{
  setLoaded('');setRecords([]);setPrices([]);setError('');setPriceError('');setMessage('');setTitle('');setPriceId('');setQty('');setUnit('');setNotes('');setRecipeId('');setMatrix(freshMatrix());setSource('');setHazard('');setControl('');setLimit('');setMonitor('');setAction('');
 },[scope]);
 useEffect(()=>{
  if(!site||!org||!kind)return;
  let cancelled=false;
  async function load(){
   try{
    const r=await supabase.from('compliance_extra_records').select('id,title,details,recorded_at,recorded_by').eq('site_id',site).eq('organisation_id',org).eq('kind',kind).order('recorded_at',{ascending:false}).limit(200);
    if(r.error)throw r.error;
    if(!cancelled){setRecords((r.data||[]) as Entry[]);setLoaded(scope);setError('');}
   }catch{if(!cancelled){setLoaded('');setError('Record storage is unavailable for this environment. No records will be saved until its database migration is enabled.');}}
   if(kind==='waste'){
    try{
     const common=(columns:string)=>supabase.from('ingredient_prices').select(columns).eq('site_id',site).eq('organisation_id',org);
     let result:any=await common('id,ingredient_id,price,unit,effective_date,invoice_id,ingredient:ingredients(id,name)').order('effective_date',{ascending:false,nullsFirst:false}).order('updated_at',{ascending:false}).limit(1000);
     if(result.error?.code==='42703'||result.error?.code==='PGRST204')result=await common('id,ingredient_id,price,price_unit,effective_at,ingredient:ingredients(id,name)').order('effective_at',{ascending:false,nullsFirst:false}).limit(1000);
     if(result.error)throw result.error;
     const found=new Set<string>();const options:Price[]=[];
     for(const row of result.data||[]){const item=Array.isArray(row.ingredient)?row.ingredient[0]:row.ingredient;const u=row.unit??row.price_unit;
      if(!item||found.has(row.ingredient_id)||row.price==null||!Number.isFinite(Number(row.price))||Number(row.price)<0||!u)continue;
      found.add(row.ingredient_id);options.push({id:row.id,ingredient_id:row.ingredient_id,name:item.name,price:Number(row.price),unit:u,date:row.effective_date??row.effective_at??'',invoice:row.invoice_id??null});
     }
     if(!cancelled)setPrices(options.sort((a,b)=>a.name.localeCompare(b.name)));
    }catch{if(!cancelled)setPriceError('Ingredient prices could not be loaded. You can record waste without a cost.');}
   }
  }void load();return()=>{cancelled=true;};
 },[site,org,kind,scope,refresh]);
 const selected=prices.find(p=>p.id===priceId);
 const quantity=Number(qty);
 const cost=selected&&qty.trim()&&quantity>0&&Number.isFinite(quantity)&&Number.isFinite(quantity*selected.price)?Math.round(quantity*selected.price*100)/100:null;
 const valid=kind==='waste'?(selected||title.trim())&&qty.trim()&&quantity>0&&Number.isFinite(quantity)&&(selected||unit.trim()) :kind==='allergen'?title.trim()&&source.trim():title.trim()&&hazard.trim()&&control.trim()&&monitor.trim()&&action.trim();
 async function save(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(!site||!org||!kind||!valid||loaded!==scope||busy)return;
  setBusy(true);setMessage('');
  try{
   const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)throw Error('Please sign in again.');
   const details=kind==='waste'?{quantity,unit:selected?.unit||unit.trim(),reason,notes,ingredient_id:selected?.ingredient_id??null,price_id:selected?.id??null,invoice_id:selected?.invoice??null,price_date:selected?.date??null,unit_price:selected?.price??null,estimated_cost:cost,currency:'GBP'}:kind==='allergen'?{recipe_slug:recipeId||null,status:'draft',allergens:matrix,source:source.trim(),notes}: {status:'draft',hazard,control,critical_limit:limit,monitoring:monitor,corrective_action:action,notes};
   const {error}=await supabase.from('compliance_extra_records').insert({site_id:site,organisation_id:org,kind,title:(kind==='waste'?selected?.name||title:title).trim(),details,recorded_by:user.id});if(error)throw error;
   setMessage(kind==='waste'?'Waste recorded.':'Draft saved.');setTitle('');setPriceId('');setQty('');setUnit('');setNotes('');setRecipeId('');setMatrix(freshMatrix());setSource('');setHazard('');setControl('');setLimit('');setMonitor('');setAction('');setRefresh(n=>n+1);
  }catch(e){setMessage(e instanceof Error?e.message:'Unable to save record.');}finally{setBusy(false);}
 }
 async function exportReport(){
  if(!site||!org||!start||!end||start>end||busy)return;setBusy(true);setMessage('');
  try{
   const from=new Date(start+'T00:00:00'),to=new Date(end+'T00:00:00');to.setDate(to.getDate()+1);
   if((to.getTime()-from.getTime())/86400000>32)throw Error('Export up to 31 days at a time.');
   const checks=await supabase.from('compliance_checks').select('id,check_type,label,equipment_name,measured_temperature_c,notes,status,recorded_by,recorded_at').eq('site_id',site).eq('organisation_id',org).gte('recorded_at',from.toISOString()).lt('recorded_at',to.toISOString()).order('recorded_at').limit(1000);
   const lists=await supabase.from('compliance_checklist_submissions').select('id,checklist_type,check_date,answers,failure_count,status,submitted_by,submitted_at,reviewed_by,reviewed_at,review_notes').eq('site_id',site).eq('organisation_id',org).gte('check_date',start).lte('check_date',end).order('submitted_at').limit(1000);
   if(checks.error||lists.error)throw Error('Could not read complete compliance records.');
   if((checks.data?.length??0)>=1000||(lists.data?.length??0)>=1000)throw Error('Too many records. Use a shorter date range to avoid a truncated export.');
   const rows:unknown[][]=[['Site','Record type','Record ID','Recorded at','Staff ID','Status','Details']];
   for(const r of checks.data||[])rows.push([activeWorkspace?.siteName,'Measurement',r.id,r.recorded_at,r.recorded_by,r.status,r]);
   for(const r of lists.data||[])rows.push([activeWorkspace?.siteName,'Checklist',r.id,r.submitted_at,r.submitted_by,r.status,r]);
   downloadCsv('kommee-compliance-'+start+'-to-'+end+'.csv',rows);setMessage('Export created from saved measurement and checklist records.');
  }catch(e){setMessage(e instanceof Error?e.message:'Export failed.');}finally{setBusy(false);}
 }
 if(!kind)return <main className="p-6"><Link href="/compliance">Back to compliance</Link><p>Section not found.</p></main>;
 const name=kind==='waste'?'Food waste':kind==='allergen'?'Allergen matrix':'HACCP & reports';
 return <main className="min-h-screen bg-slate-50 px-4 pt-6 pb-32 text-slate-900"><div className="mx-auto max-w-3xl space-y-4">
  <Link href="/compliance" className="text-sm font-semibold text-teal-800">← Compliance</Link>
  <header><p className="text-sm text-slate-600">{activeWorkspace?.siteName||'Select a site'}</p><h1 className="text-3xl font-bold">{name}</h1></header>
  {kind==='waste'&&<section className="rounded-2xl bg-[#254c39] p-5 text-white"><p className="text-sm">Estimated waste cost · displayed records (latest 200)</p><p className="mt-1 text-3xl font-bold">{loaded!==scope?'—':money(records.reduce((n,r)=>n+(typeof r.details.estimated_cost==='number'?r.details.estimated_cost:0),0))}</p><p className="mt-2 text-xs">{loaded===scope?records.filter(r=>r.details.estimated_cost==null).length+' uncosted entries excluded':'Loading saved entries'}</p></section>}
  {kind==='allergen'&&<p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Draft assessment only. Review current supplier specifications, every ingredient, substitutions and cross-contact before approving any allergen information. Do not use this draft to advise guests. Unknown is never equivalent to absent.</p>}
  {kind==='haccp'&&<><section className={panel}><h2 className="text-xl font-bold">Download compliance records</h2><p className="text-sm text-slate-600">CSV includes saved temperature, delivery and checklist records with dates, staff IDs and review status. It is not a complete inspection pack.</p><div className="grid grid-cols-2 gap-2"><label className="text-sm">From<input className={field} type="date" value={start} onChange={e=>setStart(e.target.value)}/></label><label className="text-sm">To<input className={field} type="date" value={end} onChange={e=>setEnd(e.target.value)}/></label></div><button type="button" className={button} disabled={!site||busy||!start||!end||start>end} onClick={exportReport}>Download CSV</button></section><p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">HACCP entries are draft planning records, not approved plans. Have a competent person validate hazards, limits, monitoring and corrective actions against your site's operations.</p></>}
  {error&&<p role="alert" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}
  {message&&<p role="status" className="rounded-xl bg-white p-3 text-sm">{message}</p>}
  <form className={panel} onSubmit={save}><h2 className="text-xl font-bold">{kind==='waste'?'Record waste':kind==='allergen'?'Create draft assessment':'Draft a HACCP control'}</h2>
  {kind==='waste'?<>
   {priceError&&<p className="text-sm text-amber-800">{priceError}</p>}
   <label className="block text-sm font-semibold">Ingredient / price<select className={field} value={priceId} onChange={e=>setPriceId(e.target.value)}><option value="">Other item (unpriced)</option>{prices.map(p=><option value={p.id} key={p.id}>{p.name} · {money(p.price)}/{p.unit}</option>)}</select></label>
   {selected?<p className="text-sm text-slate-600">Price snapshot: {money(selected.price)} per {selected.unit} · {selected.date||'date unavailable'}. Enter the quantity in exactly this price unit; no pack conversion is assumed.</p>:<label className="block text-sm font-semibold">Item name<input required maxLength={200} className={field} value={title} onChange={e=>setTitle(e.target.value)}/></label>}
   <div className="grid grid-cols-2 gap-2"><label className="block text-sm font-semibold">Quantity<input required type="number" step="any" min="0.0001" className={field} value={qty} onChange={e=>setQty(e.target.value)}/></label><label className="block text-sm font-semibold">Unit<input required className={field} readOnly={Boolean(selected)} value={selected?.unit||unit} onChange={e=>setUnit(e.target.value)}/></label></div>
   <label className="block text-sm font-semibold">Reason<select className={field} value={reason} onChange={e=>setReason(e.target.value)}>{['Preparation waste','Spoilage','Overproduction','Returned food','Damaged delivery','Other'].map(r=><option key={r}>{r}</option>)}</select></label>
   <p className="rounded-xl bg-slate-50 p-3 text-sm font-semibold">Estimated loss: {cost===null?'Uncosted':money(cost)}</p>
  </>:<>
   {kind==='allergen'&&recipes.length>0&&<label className="block text-sm font-semibold">Link existing recipe<select className={field} value={recipeId} onChange={e=>{setRecipeId(e.target.value);setTitle(recipes.find(r=>recipeSlug(r.name)===e.target.value)?.name||'');setMatrix(freshMatrix());setSource('');}}><option value="">Manual dish / ingredient</option>{recipes.map(r=><option value={recipeSlug(r.name)} key={recipeSlug(r.name)}>{r.name}</option>)}</select></label>}
   <label className="block text-sm font-semibold">{kind==='allergen'?'Dish / ingredient':'Process step'}<input required maxLength={200} className={field} value={title} onChange={e=>{setTitle(e.target.value);if(kind==='allergen')setRecipeId('');}}/></label>
   {kind==='allergen'?<><label className="block text-sm font-semibold">Supplier specification / recipe reference<input required className={field} value={source} onChange={e=>setSource(e.target.value)} placeholder="Document, version, date reviewed"/></label><div className="space-y-2">{allergens.map(a=><label key={a} className="flex items-center justify-between gap-2 text-sm"><span className="min-w-0 flex-1">{a}</span><select aria-label={a} className="w-[48%] rounded-xl border bg-white p-2 text-xs" value={matrix[a]} onChange={e=>setMatrix(m=>({...m,[a]:e.target.value as AllergenStatus}))}>{(['unknown','contains','may contain','not listed in reviewed sources'] as const).map(v=><option key={v} value={v}>{v==='not listed in reviewed sources'?'Not listed (draft)':v}</option>)}</select></label>)}</div></>:<>
    {([{label:'Hazard',value:hazard,set:setHazard,required:true},{label:'Control measure',value:control,set:setControl,required:true},{label:'Critical limit (if applicable)',value:limit,set:setLimit,required:false},{label:'Monitoring procedure / frequency',value:monitor,set:setMonitor,required:true},{label:'Corrective action',value:action,set:setAction,required:true}]).map(f=><label className="block text-sm font-semibold" key={f.label}>{f.label}<textarea className={field} required={f.required} value={f.value} onChange={e=>f.set(e.target.value)} rows={2}/></label>)}
   </>}
  </>}
  <label className="block text-sm font-semibold">Notes<textarea className={field} rows={2} value={notes} onChange={e=>setNotes(e.target.value)}/></label><button className={button} disabled={busy||!valid||loaded!==scope}>{busy?'Saving…':kind==='waste'?'Save waste record':'Save draft'}</button></form>
  <section className="space-y-2"><h2 className="text-xl font-bold">Recent {kind==='waste'?'waste entries':'drafts'}</h2>{loaded!==scope?<p className="text-sm text-slate-600">{error?'Records unavailable.':'Loading…'}</p>:records.length===0?<p className="text-sm text-slate-600">No saved entries yet.</p>:records.map(r=><article className={panel} key={r.id}><div><h3 className="font-bold">{r.title}</h3><p className="text-xs text-slate-500">{new Date(r.recorded_at).toLocaleString('en-GB')}</p></div>{kind==='waste'?<p className="text-sm">{r.details.quantity} {r.details.unit} · {r.details.reason} · {typeof r.details.estimated_cost==='number'?money(r.details.estimated_cost):'Uncosted'}</p>:kind==='allergen'?<><p className="text-xs font-semibold text-amber-800">DRAFT · Source: {r.details.source}</p><div className="grid grid-cols-2 gap-1 text-xs">{allergens.map(a=><div key={a} className="rounded-lg bg-slate-50 p-2">{a}: <strong>{r.details.allergens?.[a]||'unknown'}</strong></div>)}</div></>:<p className="text-sm"><strong>Draft:</strong> {r.details.hazard} · {r.details.control}<br/>Monitor: {r.details.monitoring}<br/>Action: {r.details.corrective_action}</p>}{r.details.notes&&<p className="text-xs">{r.details.notes}</p>}</article>)}</section>
 </div></main>;
}
