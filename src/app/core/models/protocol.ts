export interface Protocol {
  canale: string;
  dataCreazione: string;
  dettaglioList: string;
  esito: string;
  id: number;
  numeroProtocollo: string;
  stato: string;
  tipo: string;
}
export enum ProtocolStatus {
  Nota_di_credito = 'NOTA_DI_CREDITO',
  Fatture = 'FATTURE',
}
