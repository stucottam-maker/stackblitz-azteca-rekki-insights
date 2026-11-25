export const subscriptionPlans = [
 {id:"starter",name:"Starter",price:29,maxSites:1,sites:"One kitchen site"},
 {id:"professional",name:"Professional",price:59,maxSites:3,sites:"Up to three kitchen sites"},
 {id:"group",name:"Group",price:119,maxSites:1000,sites:"Multi-site kitchens"},
] as const;
export const TRIAL_DAYS=7;
export const findPlan=(id:unknown)=>subscriptionPlans.find(plan=>plan.id===id);
