export interface Protocol {
  canale: string;
  dataCreazione: string;
  dettaglioList: string;
  esito: string;
  id: number;
  numeroProtocollo: string;
  stato: string;
  tipo: ProtocolStatus;
}
export enum ProtocolStatus {
  I = 'Invio',
}
