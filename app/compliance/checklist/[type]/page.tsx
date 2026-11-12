'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useWorkspace } from '../../../components/WorkspaceProvider';

type Answer = 'yes' | 'no' | 'na';
type Response = { answer?: Answer; note?: string };
const templates: Record<string, {title:string; description:string; questions:string[]}> = {
  opening: {title:'Opening checklist',description:'Complete before food preparation begins.',questions:[
    'Handwash stations stocked with soap and paper towels',
    'Food preparation surfaces clean and sanitised',
    'No signs of pests or contamination',
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
  const failures=template?.questions.map((q,i)=>({q,i})).filter(({i})=>answers[String(i)]?.answer==='no') ?? [];
  if(!template) return <main className="p-6"><p>Checklist not found.</p><Link href="/compliance" className="text-teal-800 underline">Back to Compliance</Link></main>;
  return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
    <div className="mx-auto max-w-2xl space-y-5">
      <Link href="/compliance" className="text-sm font-semibold text-teal-800">← All checks</Link>
      <header><p className="text-sm font-medium text-teal-800">{activeWorkspace?.siteName ?? 'Select a site'}</p><h1 className="mt-1 text-3xl font-bold">{template.title}</h1><p className="mt-1 text-slate-500">{template.description}</p></header>
      <div className="rounded-2xl border border-teal-100 bg-white p-5"><div className="flex items-center justify-between"><strong>Progress</strong><span className="text-sm text-slate-600">{count} of {total} answered</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-700 transition-all" style={{width:`${total ? count/total*100 : 0}%`}} /></div><p className="mt-3 text-xs text-slate-500">Draft saved automatically on this device. Not yet submitted as an official compliance record.</p></div>
      <section className="space-y-3">{template.questions.map((question,i)=>{
        const id=String(i), response=answers[id] || {};
        return <div key={id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-900">{i+1}</span><h2 className="pt-1 font-semibold leading-snug">{question}</h2></div>
          <div className="mt-4 grid grid-cols-3 gap-2">{(['yes','no','na'] as const).map(answer=><button type="button" key={answer} aria-pressed={response.answer===answer} onClick={()=>setAnswers(prev=>({...prev,[id]:{...prev[id],answer}}))} className={`min-h-12 rounded-xl border text-sm font-semibold ${response.answer===answer ? answer==='no'?'border-rose-600 bg-rose-50 text-rose-800':'border-teal-700 bg-teal-50 text-teal-900':'border-slate-200 bg-white text-slate-700'}`}>{answer==='yes'?'Yes':answer==='no'?'No':'N/A'}</button>)}</div>
          {response.answer==='no' && <label className="mt-4 block text-sm font-medium text-rose-800">Corrective action taken or required<textarea value={response.note||''} onChange={e=>setAnswers(prev=>({...prev,[id]:{...prev[id],note:e.target.value}}))} placeholder="What happened? What action was taken? Who needs to follow up?" rows={3} className="mt-2 w-full rounded-xl border border-rose-200 p-3 text-slate-900" /></label>}
        </div>;
      })}</section>
      {failures.length>0 && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{failures.length} failed check(s) require corrective action. Escalate according to your site food-safety procedures.</p>}
      <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="font-semibold">Checklist draft</p><p className="mt-1 text-sm text-slate-600">Answered: {count}/{total}. {failures.length} failed check(s).</p>{note && <p role="status" className="mt-2 text-sm text-rose-800">{note}</p>}<button type="button" disabled={count!==total || failures.some(({i})=>!answers[String(i)]?.note?.trim())} onClick={()=>setSubmitted(true)} className="mt-4 w-full rounded-xl bg-teal-800 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Review completed draft</button>{submitted && <p role="status" className="mt-3 text-sm text-teal-800">Draft complete. Permanent server-side submission and audit logging are not yet enabled.</p>}</div>
    </div>
  </main>;
}
