'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import { useWorkspace } from '../../../components/WorkspaceProvider';

type Answer = 'yes' | 'no' | 'na';
type Response = { answer?: Answer; note?: string };
const templates: Record<string, {title:string; description:string; questions:string[]}> = {
  opening: {title:'Opening checklist',description:'Complete before food preparation begins.',questions:[
    'Handwash stations stocked with soap and paper towels',
    'Food preparation surfaces clean and sanitised',
    'Any sign of pests? (Droppings, gnaw marks, insects or other pest activity)',
    'Food stored safely and correctly labelled',
    'Staff fit for work and wearing clean protective clothing',
    'Equipment and extraction safe to operate'
  ]},
  closing: {title:'Closing checklist',description:'Complete at the end of service.',questions:[
    'Food cooled and stored according to the site HACCP plan',
    'All food covered, labelled and date marked',
    'Work surfaces and equipment cleaned and sanitised',
    'Waste removed and bins cleaned',
    'Floors cleaned and drains checked',
    'Doors secured and equipment switched off as required'
  ]},
  cleaning: {title:'Cleaning schedule',description:'Record completion of scheduled cleaning.',questions:[
    'High-touch surfaces cleaned',
    'Preparation benches and boards sanitised',
    'Refrigerator handles and seals cleaned',
    'Cleaning chemicals stored correctly',
    'Cleaning tools washed and stored safely'
  ]}
};

export default function ChecklistPage({params}:{params:{type:string}}) {
  const {activeWorkspace} = useWorkspace();
  const template = templates[params.type];
  const [answers,setAnswers] = useState<Record<string,Response>>({});
  const [loaded,setLoaded] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [note,setNote] = useState('');
  const key = activeWorkspace && template ? ['ki-compliance-draft',activeWorkspace.organisationId,activeWorkspace.siteId,params.type,new Date().toISOString().slice(0,10)].join(':') : '';
  useEffect(() => {
    setLoaded(false);
    setSubmitted(false);
    if (!key) return;
    try {
      const value=localStorage.getItem(key);
      setAnswers(value ? JSON.parse(value) : {});
    } catch {setAnswers({});}
    setLoaded(true);
  },[key]);
  useEffect(() => {
    if(!key || !loaded) return;
    try {localStorage.setItem(key,JSON.stringify(answers));} catch {setNote('Draft could not be saved on this device.');}
  },[key,loaded,answers]);
  const total=template?.questions.length ?? 0;
  const count=useMemo(()=>template?.questions.filter((_,i)=>Boolean(answers[String(i)]?.answer)).length ?? 0,[answers,template]);
  const isPestQuestion = (question:string) => question.startsWith('Any sign of pests?');
  const isFailure = (question:string, answer?:Answer) => answer === (isPestQuestion(question) ? 'yes' : 'no');
  const failures=template?.questions.map((q,i)=>({q,i})).filter(({q,i})=>isFailure(q,answers[String(i)]?.answer)) ?? [];
  async function submitChecklist(){
    if(!activeWorkspace || !template || count!==total || failures.some(({i})=>!answers[String(i)]?.note?.trim()))return;
    setSubmitting(true);setNote('');
    try{
      const {data:{user},error:authError}=await supabase.auth.getUser();
      if(authError||!user)throw new Error('Sign in to submit this checklist.');
      const {error}=await supabase.from('compliance_checklist_submissions').insert({
        organisation_id:activeWorkspace.organisationId,site_id:activeWorkspace.siteId,
        checklist_type:params.type,check_date:new Date().toLocaleDateString('en-CA'),
        answers, failure_count:failures.length,submitted_by:user.id,status:'needs_review'
      });
      if(error)throw error;
      setSubmitted(true);
    }catch(error){setNote(error instanceof Error?error.message:'Could not submit checklist.');}
    finally{setSubmitting(false);}
  }
  if(!template) return <main className="p-6"><p>Checklist not found.</p><Link href="/compliance" className="text-teal-800 underline">Back to Compliance</Link></main>;
  return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
    <div className="mx-auto max-w-2xl space-y-5">
      <Link href="/compliance" className="text-sm font-semibold text-teal-800">← All checks</Link>
      <header><p className="text-sm font-medium text-teal-800">{activeWorkspace?.siteName ?? 'Select a site'}</p><h1 className="mt-1 text-3xl font-bold">{template.title}</h1><p className="mt-1 text-slate-500">{template.description}</p></header>
      <div className="rounded-2xl border border-teal-100 bg-white p-5"><div className="flex items-center justify-between"><strong>Progress</strong><span className="text-sm text-slate-600">{count} of {total} answered</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-700 transition-all" style={{width:`${total ? count/total*100 : 0}%`}} /></div><p className="mt-3 text-xs text-slate-500">Draft saved automatically on this device. Not yet submitted as an official compliance record.</p></div>
      <section className="space-y-3">{template.questions.map((question,i)=>{
        const id=String(i), response=answers[id] || {};
        return <div key={id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-900">{i+1}</span><h2 className="pt-0.5 text-[15px] font-semibold leading-snug sm:text-base">{question}</h2></div>
          <div className="mt-3 grid grid-cols-3 gap-2.5">{(['yes','no','na'] as const).map(answer=><button type="button" key={answer} aria-pressed={response.answer===answer} onClick={()=>setAnswers(prev=>({...prev,[id]:{...prev[id],answer}}))} className={`min-h-16 rounded-2xl border px-1 py-3 text-base font-semibold transition-colors active:scale-[0.98] ${response.answer===answer ? answer==='na' ? 'border-slate-400 bg-slate-100 text-slate-700' : isFailure(question,answer) ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}><span className="block text-lg leading-5" aria-hidden="true">{answer==='yes'?'✓':answer==='no'?'×':'−'}</span><span className="mt-1 block">{answer==='yes'?'Yes':answer==='no'?'No':'N/A'}</span></button>)}</div>
          {isFailure(question,response.answer) && <label className="mt-4 block text-sm font-medium text-rose-800">Corrective action taken or required<textarea value={response.note||''} onChange={e=>setAnswers(prev=>({...prev,[id]:{...prev[id],note:e.target.value}}))} placeholder="What happened? What action was taken? Who needs to follow up?" rows={3} className="mt-2 w-full rounded-xl border border-rose-200 p-3 text-slate-900" /></label>}
        </div>;
      })}</section>
      {failures.length>0 && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{failures.length} failed check(s) require corrective action. Escalate according to your site food-safety procedures.</p>}
      <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="font-semibold">Checklist draft</p><p className="mt-1 text-sm text-slate-600">Answered: {count}/{total}. {failures.length} failed check(s).</p>{note && <p role="status" className="mt-2 text-sm text-rose-800">{note}</p>}<button type="button" disabled={submitting || submitted || !activeWorkspace || count!==total || failures.some(({i})=>!answers[String(i)]?.note?.trim())} onClick={submitChecklist} className="mt-4 w-full rounded-xl bg-teal-800 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{submitting?'Submitting…':submitted?'Submitted for review':'Submit checklist for review'}</button>{submitted && <p role="status" className="mt-3 text-sm text-teal-800">Checklist saved to the server for manager review. Keep using your approved site food-safety procedures.</p>}</div>
    </div>
  </main>;
}
