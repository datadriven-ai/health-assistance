
export interface RegisterUserDTO {
  username: string;
  password: string;
  name: string;
  surname: string;
  gender: string;
  birthCityId: number;
  birthDate: string;
  fiscalCode: string;
  email: string;
  telephone: string;
  homeCap: string;
  homeAddress: string;
  homeTownId: number;
  agreementId?: number;
  acceptedConditions: {id: number, accepted: boolean}[];
}

export  interface Conventions {
  channelId: number;
  name: string;
  type: string;
  start: string;
  end: string;
  registrationType: string;
  convention: Convention;
}

export interface Convention {
  id: number;
  validDomain: string;
  invalidDomain: string[];
  conventionCode: string;
  twoFactorAuthenticator: string;
}


export interface PhoneCountry {
  name: string;
  dial_code: string;
  code: string;
}
