export type InvoiceLine = {
  product?: string;
  quantity?: number | null;
  pack?: string | null;
  unitPrice?: number | null;
  total?: number | null;
};


export type Invoice = {
  total?: number | null;
  lineItems?: InvoiceLine[];
};





export function getInvoiceValue(
  invoice: Invoice
): number {


  // Prefer invoice total if available
  if(
    typeof invoice.total === "number" &&
    invoice.total > 0
  ){

    return invoice.total;

  }





  // Otherwise calculate from line items
  if(
    Array.isArray(invoice.lineItems)
  ){

    return invoice.lineItems.reduce(
      (
        sum: number,
        item: InvoiceLine
      ) => {

        return (
          sum +
          (
            typeof item.total === "number"
              ? item.total
              : 0
          )
        );

      },
      0
    );

  }




  return 0;

}







export function getSupplierSpend(
  invoices: Invoice[]
){

  return invoices.reduce(
    (
      total:number,
      invoice:Invoice
    ) => {

      return (
        total +
        getInvoiceValue(invoice)
      );

    },
    0
  );

}
