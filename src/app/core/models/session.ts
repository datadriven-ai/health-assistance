import {User} from "oidc-client";

export interface SessionState {
  bypass: string;
  challengeToken: string;
  jwtToken: string | undefined;
  user: UserInfo;


  scope: string;
  email_verified: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
  userID: number;
  resource_access: any;
  realm_access: any;
}

export interface UserInfo {
  id: string;
  cognome:string;
  nome: string;
  enti: Ente[]
  ultimaOperazione: Operazione;
}

export interface Ente {
  cf:string;
  id:string;
  nome: string;
  pIva: string;
  tipo: {
    codice:string;
    id: string;
    nome:string;
  };
  username: string;
}
export interface Operazione {
  canale: string;
  dataCreazione: string;
  dettaglioList: string;
  esito: {
    codice: string;
    descrizione: string;
    esito:string;
    id:string;
  }
  id: string;
  numeroProtocollo: string;
  stato: string;
  tipo: string;
}
