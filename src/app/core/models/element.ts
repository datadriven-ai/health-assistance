export interface Invoice {
  invoiceId: string,
  numberInvoice: number,
  protocol: number,
  payment: string,
  emissionDate: Date,
  status: string,
  fiscalCode: string,
  amount: number,
  paymentData: Date
}

export enum InvoiceStatus {
  Nota_di_credito = 'NOTA_DI_CREDITO',
  Fatture = 'FATTURE',
}
