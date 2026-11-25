import { NextResponse } from "next/server";
import { serviceSupabase } from "../../../lib/serverAuth";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const reply=(body:object,status=200)=>NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request:Request){
 const key=process.env.STRIPE_TEST_SECRET_KEY;
 const config=process.env.STRIPE_TEST_PORTAL_CONFIGURATION;
 const returnOrigin=process.env.STRIPE_TEST_RETURN_ORIGIN;
 if(process.env.VERCEL_ENV!=="preview"||process.env.KOMMEE_STRIPE_SANDBOX!=="1"||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,"")!=="https://zfkzpqqyzjizjxijmpde.supabase.co"||
    !key||!/^(sk|rk)_test_/.test(key)||!config||!/^bpc_[A-Za-z0-9]+$/.test(config)||!returnOrigin)
  return reply({error:"Sandbox portal is not configured."},503);
 try{
  const origin=new URL(returnOrigin);
  if(origin.protocol!=="https:"||origin.origin!==returnOrigin||!origin.hostname.endsWith(".vercel.app"))
   return reply({error:"Sandbox return URL is invalid."},503);
  const token=request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if(!token)return reply({error:"Sign in first."},401);
  const {data,error}=await serviceSupabase.auth.getUser(token);
  if(error||!data.user?.email_confirmed_at)return reply({error:"Verified sign-in required."},401);
  const body=await request.json().catch(()=>null);
  const id=body?.sessionId;
  if(typeof id!=="string"||!/^cs_test_[A-Za-z0-9]+$/.test(id)||id.length>200)
   return reply({error:"Invalid sandbox session."},400);
  const headers={Authorization:"Bearer "+key};
  const res=await fetch("https://api.stripe.com/v1/checkout/sessions/"+id,{headers,cache:"no-store"});
  const session=await res.json();
  if(!res.ok||session.livemode!==false||session.status!=="complete"||session.mode!=="subscription"||
     session.client_reference_id!==data.user.id||session.metadata?.kommee_user_id!==data.user.id||
     typeof session.customer!=="string"||!/^cus_[A-Za-z0-9]+$/.test(session.customer)||
     typeof session.subscription!=="string"||!/^sub_[A-Za-z0-9]+$/.test(session.subscription))
   return reply({error:"Completed checkout not found for this account."},403);
  const response=await fetch("https://api.stripe.com/v1/billing_portal/sessions",{
   method:"POST",headers:{...headers,"Content-Type":"application/x-www-form-urlencoded"},
   body:new URLSearchParams({customer:session.customer,configuration:config,return_url:origin.origin+"/pricing?checkout=test-success&session_id="+id}),cache:"no-store"});
  const portal=await response.json();
  if(!response.ok||portal.livemode!==false||typeof portal.url!=="string")return reply({error:"Sandbox portal unavailable."},502);
  const url=new URL(portal.url);
  if(url.protocol!=="https:"||url.hostname!=="billing.stripe.com")return reply({error:"Invalid portal URL."},502);
  return reply({url:portal.url});
 }catch{return reply({error:"Sandbox portal unavailable."},503);}
}
