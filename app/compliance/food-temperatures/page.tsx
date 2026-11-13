'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useWorkspace } from '../../components/WorkspaceProvider';

const types = [
  {id:'cooking',name:'Cooking',hint:'Record a core food temperature'},
  {id:'reheating',name:'Reheating',hint:'Record a reheated core temperature'},
  {id:'hot_holding',name:'Hot holding',hint:'Record a hot-holding temperature'},
  {id:'cooling',name:'Cooling',hint:'Record temperature, method and time'}
] as const;
type TypeId = typeof types[number]['id'];
export default function FoodTemperaturesPage(){
  const {activeWorkspace}=useWorkspace();
  const [kind,setKind]=useState<TypeId>('cooking');
  const [food,setFood]=useState('');
  const [temperature,setTemperature]=useState('');
  const [method,setMethod]=useState('');
  const [start,setStart]=useState('');
  const [finish,setFinish]=useState('');
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!activeWorkspace || !food.trim() || !temperature.trim() || !Number.isFinite(Number(temperature)))return;
    setSaving(true);setMessage('');
    try{
      const {data:{user},error:authError}=await supabase.auth.getUser();
      if(authError || !user)throw new Error('Sign in to submit a record.');
      const notes=[`Food: ${food.trim()}`,kind==='cooling'?`Cooling method: ${method}`:'',start?`Start: ${start}`:'',finish?`Finish: ${finish}`:''].filter(Boolean).join(' | ');
      const {error}=await supabase.from('compliance_checks').insert({
        organisation_id:activeWorkspace.organisationId,site_id:activeWorkspace.siteId,
        check_type:kind,label:types.find(t=>t.id===kind)?.name||kind,
        measured_temperature_c:Number(temperature),notes,recorded_by:user.id,status:'needs_review'
      });
      if(error)throw error;
      setMessage('Reading submitted for supervisor review.');
      setFood('');setTemperature('');setMethod('');setStart('');setFinish('');
    }catch(error){setMessage(error instanceof Error?error.message:'Unable to submit reading.');}
    finally{setSaving(false);}
  }
  return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900"><div className="mx-auto max-w-2xl space-y-4">
    <Link href="/compliance" className="text-sm font-semibold text-teal-800">← Daily checks</Link>
    <h1 className="text-2xl font-bold">Food temperature checks</h1>
    <p className="text-sm text-slate-600">Record each food or batch separately. Site-specific HACCP limits and automatic alerts are not yet configured.</p>
    <div className="grid grid-cols-2 gap-2">{types.map(t=><button type="button" key={t.id} aria-pressed={kind===t.id} onClick={()=>setKind(t.id)} className={`min-h-16 rounded-2xl border p-3 text-left font-semibold ${kind===t.id?'border-teal-800 bg-teal-800 text-white':'border-slate-200 bg-white'}`}>{t.name}</button>)}</div>
    <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">{types.find(t=>t.id===kind)?.name}</h2>
      <label className="block text-sm font-semibold">Food or batch<input required value={food} onChange={e=>setFood(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3" placeholder="e.g. roast chicken"/></label>
      <label className="block text-sm font-semibold">Measured temperature (°C)<input required type="number" inputMode="decimal" step="0.1" value={temperature} onChange={e=>setTemperature(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3"/></label>
      {kind==='cooling' && <><label className="block text-sm font-semibold">Cooling method<input required value={method} onChange={e=>setMethod(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3" placeholder="e.g. blast chiller"/></label><label className="block text-sm font-semibold">Start time<input required type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3"/></label><label className="block text-sm font-semibold">Finish time<input required type="datetime-local" min={start||undefined} value={finish} onChange={e=>setFinish(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3"/></label></>}
      <button disabled={saving||!activeWorkspace} className="min-h-14 w-full rounded-2xl bg-teal-800 p-3 font-semibold text-white disabled:opacity-40">{saving?'Saving…':'Submit for review'}</button>
      {message && <p role="status" className="text-sm text-teal-900">{message}</p>}
      <p className="text-xs text-slate-500">Use your approved food safety procedures and existing records. This beta does not yet determine whether readings pass HACCP limits.</p>
    </form>
  </div></main>;
}
