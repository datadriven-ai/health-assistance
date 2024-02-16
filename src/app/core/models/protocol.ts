export interface Protocol {
  protocolsId:string,
  send: string,
  date: Date,
  tipoOperazioni: string,
  tipoSpesa: string,
  status: string
}
export enum ProtocolStatus {
  Nota_di_credito = 'NOTA_DI_CREDITO',
  Fatture = 'FATTURE',
}
