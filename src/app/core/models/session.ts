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
  userId: number;
  address: string;
  avatar: string;
  birthDate: string;
  birthPlace: string;
  cap: string;
  channel: string;
  channelId: string;
  city: string;
  professionTitle: string | null;
  dateAcceptancePrivacy: string;
  fiscalCode: string;
  email: string;
  gender: string;
  name: string;
  nation: string;
  phoneNumber: string;
  province: string;
  roles: string[];
  surname: string;
  consent: any[];
}

export class LocalUser {

  email: string;
  firstName: undefined
  id: string;
  lastName: undefined
  refreshToken: string;
  token: string;
  tokenExpire: Date;
  tokenExpireIn: number;
  username: string;

  constructor(u: User) {
    // console.log(u);

    this.username = u.profile.preferred_username;
    if (u.profile.email != null) {
      this.email = u.profile.email;
    }
    this.id = u.profile.sub;
    this.token = u.access_token;
    this.refreshToken = u.refresh_token;
    this.tokenExpireIn = u.expires_in;

    const d = new Date();
    const ex = d.getTime() + u.expires_in * 1000;
    const dx = new Date(ex);
    this.tokenExpire = dx;
  }
}
