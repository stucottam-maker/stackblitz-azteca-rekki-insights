import {NextResponse} from "next/server";
import {serviceSupabase} from "../../lib/serverAuth";
import {findPlan} from "../../lib/subscriptionPlans";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const respond=(body:object,status=200)=>NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request:Request){
 if(process.env.VERCEL_ENV!=="preview"||process.env.NEXT_PUBLIC_SUPABASE_URL!=="https://zfkzpqqyzjizjxijmpde.supabase.co")return respond({error:"Trial registration is currently available in the test preview only."},503);
 if(request.headers.get("origin")!==new URL(request.url).origin)return respond({error:"Invalid request origin."},403);
 if(!request.headers.get("content-type")?.includes("application/json"))return respond({error:"Invalid request format."},415);
 try{
  const raw=await request.text();if(raw.length>4096)return respond({error:"Request too large."},413);
  const body=JSON.parse(raw);if(!body||typeof body!=="object"||Array.isArray(body))return respond({error:"Invalid request."},400);
  const plan=findPlan(body.plan);
  const name=typeof body.contactName==="string"?body.contactName.trim():"";
  const business=typeof body.businessName==="string"?body.businessName.trim():"";
  const email=typeof body.email==="string"?body.email.trim().toLowerCase():"";
  const count=body.siteCount;
  if(body.website)return respond({error:"Unable to submit request."},400);
  if(!plan||!name||name.length>100||!business||business.length>160||email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||!Number.isInteger(count)||count<1||count>plan.maxSites||body.consent!==true)return respond({error:"Check your details and the selected plan."},400);
  const {error}=await serviceSupabase.from("subscription_requests").upsert({plan:plan.id,contact_name:name,business_name:business,email,site_count:count},{onConflict:"email,plan",ignoreDuplicates:true});
  if(error)throw error;
  return respond({received:true});
 }catch{ return respond({error:"Trial requests are temporarily unavailable. Please try again later."},503); }
}
