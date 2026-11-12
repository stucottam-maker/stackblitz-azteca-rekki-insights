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
  const [equipment, setEquipment] = useState('Walk-in fridge');
  const [temperature, setTemperature] = useState('');
  const [readings, setReadings] = useState<{equipment:string; temperature:number; at:string}[]>([]);
  const [supplier, setSupplier] = useState('');
  const [deliveryTemp, setDeliveryTemp] = useState('');
  const [deliveries, setDeliveries] = useState<{supplier:string; temperature:number; at:string}[]>([]);
  const completed = 0;
  const card = 'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm';
  const field = 'w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900';
  const btn = 'rounded-xl bg-teal-800 px-4 py-3 font-semibold text-white disabled:opacity-40';
  const now = () => new Date().toLocaleString('en-GB');

  return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="flex items-center justify-between">
        <div><Link href="/" className="text-sm text-teal-800">← Kitchen Insights</Link><h1 className="mt-2 text-3xl font-bold">Compliance</h1><p className="text-slate-500">Daily kitchen checks</p></div>
        <span className="rounded-xl bg-teal-50 px-3 py-2 text-sm font-medium text-teal-900">MVP preview</span>
      </header>
      <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Development preview: checklist ticks are temporary. Submitted measurements are marked for review and must not replace the site&apos;s approved food safety procedures.</p>{site && <p className="text-sm text-slate-600">Site: {site.name}</p>}{feedback && <p role="status" className="rounded-xl bg-slate-100 p-3 text-sm">{feedback}</p>}
      <nav className="flex gap-2 overflow-x-auto">
        {(['today','temperatures','deliveries'] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-medium capitalize ${tab === t ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}>{t}</button>)}
      </nav>
      {tab === 'today' && <>
        <section className="rounded-2xl bg-teal-900 p-5 text-white"><p className="text-sm opacity-80">Today&apos;s checks</p><div className="mt-1 text-3xl font-bold">{tasks.length} available</div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-emerald-400" style={{width:'0%'}} /></div></section>
        <section className="space-y-3">{tasks.map(t => <Link href={t.id === 'fridges' ? '/compliance?tab=temperatures' : t.id === 'deliveries' ? '/compliance?tab=deliveries' : '/compliance/checklist/' + t.id} key={t.id} className={`${card} flex items-center gap-4`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-800">✓</span><span className="flex-1"><span className="block font-semibold">{t.label}</span><span className="text-sm text-slate-500">{t.detail}</span></span><span className="text-sm font-medium text-teal-800">Open →</span></Link>)}</section>
      </>}
      {tab === 'temperatures' && <section className={card}><h2 className="mb-4 text-xl font-bold">Record temperature</h2><form className="space-y-4" onSubmit={async e => {e.preventDefault();if(temperature.trim() && Number.isFinite(Number(temperature))){const ok=await saveCheck({check_type:'temperature',label:'Equipment temperature',equipment_name:equipment,measured_temperature_c:Number(temperature)});if(ok){setReadings(r => [{equipment,temperature:Number(temperature),at:now()},...r]);setTemperature('');}}}}><div className="space-y-3"><p className="text-sm font-semibold text-slate-700">Choose equipment</p><div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{['Walk-in fridge','Prep fridge','Upright fridge','Freezer','Other equipment'].map(x=><button type="button" key={x} aria-pressed={equipment===x} onClick={()=>setEquipment(x)} className={`flex min-h-[72px] w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left font-semibold shadow-sm transition-colors ${equipment===x ? 'border-teal-800 bg-teal-50 text-teal-900' : 'border-slate-200 bg-slate-50 text-slate-800'}`}><span className="flex-1">{x}</span><span aria-hidden="true" className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${equipment===x ? 'border-teal-800 bg-teal-800 text-white' : 'border-slate-300'}`}>{equipment===x ? '✓' : ''}</span></button>)}</div></div><label className="block text-sm font-medium">Temperature (°C)<input className={`${field} mt-1`} type="number" step="0.1" required value={temperature} onChange={e=>setTemperature(e.target.value)}/></label><p className="text-xs text-slate-500">Configured equipment limits and corrective-action workflows will be added before production use.</p><button disabled={saving || !site} className={btn}>{saving?'Saving…':'Submit reading for review'}</button></form><div className="mt-5 space-y-2">{readings.map((r,i)=><div className="rounded-xl bg-slate-50 p-3 text-sm" key={i}>{r.equipment}: <strong>{r.temperature}°C</strong><span className="block text-slate-500">{r.at}</span></div>)}</div></section>}
      {tab === 'deliveries' && <section className={card}><h2 className="mb-4 text-xl font-bold">Delivery check</h2><form className="space-y-4" onSubmit={async e=>{e.preventDefault();if(supplier.trim()&&deliveryTemp.trim()&&Number.isFinite(Number(deliveryTemp))){const ok=await saveCheck({check_type:'delivery',label:'Delivery temperature',measured_temperature_c:Number(deliveryTemp),notes:'Supplier: '+supplier.trim()});if(ok){setDeliveries(d=>[{supplier:supplier.trim(),temperature:Number(deliveryTemp),at:now()},...d]);setSupplier('');setDeliveryTemp('');}}}}><label className="block text-sm font-medium">Supplier<input className={`${field} mt-1`} required value={supplier} onChange={e=>setSupplier(e.target.value)} placeholder="Supplier name"/></label><label className="block text-sm font-medium">Measured temperature (°C)<input className={`${field} mt-1`} type="number" step="0.1" required value={deliveryTemp} onChange={e=>setDeliveryTemp(e.target.value)}/></label><p className="text-xs text-slate-500">Product condition, acceptance, evidence and invoice matching will be added before production use.</p><button disabled={saving || !site} className={btn}>{saving?'Saving…':'Submit delivery for review'}</button></form><div className="mt-5 space-y-2">{deliveries.map((d,i)=><div className="rounded-xl bg-slate-50 p-3 text-sm" key={i}>{d.supplier}: <strong>{d.temperature}°C</strong><span className="block text-slate-500">{d.at}</span></div>)}</div></section>}
    </div>
  </main>;
}
