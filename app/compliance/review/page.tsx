'use client';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useWorkspace } from '../../components/WorkspaceProvider';
type Submission={id:string;checklist_type:string;check_date:string;submitted_at:string;submitted_by:string;failure_count:number;status:string;answers:Record<string,{answer?:string;note?:string}>;review_notes:string|null};
export default function ComplianceReviewPage(){
 const {activeWorkspace}=useWorkspace();
 const [items,setItems]=useState<Submission[]>([]);
 const [loading,setLoading]=useState(true);
 const [message,setMessage]=useState('');
 const [notes,setNotes]=useState<Record<string,string>>({});
 const [busy,setBusy]=useState('');
 const [canReview,setCanReview]=useState(false);
 useEffect(()=>{
  let active=true;
  async function load(){
   if(!activeWorkspace){setItems([]);setLoading(false);return;}
   setLoading(true);
   const [{data,error},{data:{user}}]=await Promise.all([
    supabase.from('compliance_checklist_submissions').select('id,checklist_type,check_date,submitted_at,submitted_by,failure_count,status,answers,review_notes').eq('site_id',activeWorkspace.siteId).eq('organisation_id',activeWorkspace.organisationId).order('submitted_at',{ascending:false}).limit(100),
    supabase.auth.getUser()
   ]);
   if(!active)return;
   setItems((data||[]) as Submission[]);
   if(error)setMessage(error.message);
   if(user){
    const {data:membership}=await supabase.from('organisation_members').select('role').eq('organisation_id',activeWorkspace.organisationId).eq('user_id',user.id).in('role',['owner','admin','manager']).maybeSingle();
    if(active)setCanReview(Boolean(membership));
   }
   setLoading(false);
  }
  load();return()=>{active=false;};
 },[activeWorkspace?.organisationId,activeWorkspace?.siteId]);
 async function review(item:Submission){
  setBusy(item.id);setMessage('');
  try{
   const {data:{user},error:authError}=await supabase.auth.getUser();
   if(authError||!user||!canReview)throw new Error('Manager access required.');
   const {error}=await supabase.from('compliance_checklist_submissions').update({status:'reviewed',reviewed_by:user.id,reviewed_at:new Date().toISOString(),review_notes:notes[item.id]||null}).eq('id',item.id).eq('site_id',activeWorkspace?.siteId).eq('status','needs_review');
   if(error)throw error;
   setItems(old=>old.map(v=>v.id===item.id?{...v,status:'reviewed',review_notes:notes[item.id]||null}:v));
   setMessage('Checklist marked as reviewed.');
  }catch(error){setMessage(error instanceof Error?error.message:'Review failed.');}
  finally{setBusy('');}
 }
 return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900"><div className="mx-auto max-w-3xl space-y-4">
  <Link href="/compliance" className="text-sm font-semibold text-teal-800">← Compliance</Link><h1 className="text-2xl font-bold">Checklist records</h1>
  <p className="text-sm text-slate-600">Submitted checklists for {activeWorkspace?.siteName||'the selected site'}. Review requires manager permissions.</p>
  {message&&<p role="status" className="rounded-xl bg-amber-50 p-3 text-sm">{message}</p>}
  {loading?<p>Loading records…</p>:items.length===0?<p className="rounded-2xl bg-white p-5">No submitted checklists yet.</p>:items.map(item=><article key={item.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
   <div className="flex items-center justify-between gap-2"><h2 className="font-semibold capitalize">{item.checklist_type} checks</h2><span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{item.status==='reviewed'?'Reviewed':'Needs review'}</span></div>
   <p className="text-xs text-slate-500">{new Date(item.submitted_at).toLocaleString('en-GB')} · {item.failure_count} failed checks · Staff ID: {item.submitted_by}</p>
   <details><summary className="cursor-pointer text-sm font-semibold text-teal-800">View answers and corrective actions</summary><div className="mt-2 space-y-2">{Object.entries(item.answers||{}).map(([key,value])=><div key={key} className="rounded-xl bg-slate-50 p-3 text-sm"><strong>Question {Number(key)+1}: {value.answer||'Not answered'}</strong>{value.note&&<p className="mt-1 text-rose-800">Action: {value.note}</p>}</div>)}</div></details>
   {canReview&&item.status==='needs_review'&&<div className="space-y-2"><label className="block text-sm font-medium">Manager notes<textarea className="mt-1 w-full rounded-xl border border-slate-300 p-3" rows={2} value={notes[item.id]||''} onChange={e=>setNotes(old=>({...old,[item.id]:e.target.value}))}/></label><button disabled={busy===item.id} onClick={()=>review(item)} className="min-h-12 rounded-xl bg-teal-800 px-4 font-semibold text-white disabled:opacity-40">Mark reviewed</button></div>}
   {item.review_notes&&<p className="text-sm">Manager notes: {item.review_notes}</p>}
  </article>)}
 </div></main>;
}
