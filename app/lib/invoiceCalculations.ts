export function getInvoiceValue(invoice:any){

  if(
    typeof invoice.total === "number" &&
    invoice.total > 0
  ){
    return invoice.total;
  }


  if(
    Array.isArray(invoice.lineItems)
  ){
    return invoice.lineItems.reduce(
      (sum,item)=>
        sum +
        (Number(item.total)||0),
      0
    );
  }


  return 0;
}
