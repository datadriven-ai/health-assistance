export interface Invoice {
  id: number,
  numeroFattura: string,
  numeroProtocollo: string,
  metodoPagamento: string,
  importo: number,
  dataEmissione: string,
  dataCreazione: string,
  cf: string,
  canaleId: number,
  tipo: string
}

export enum InvoiceStatus {
  Nota_di_credito = 'NOTA_DI_CREDITO',
  Fatture = 'FATTURE',
}
