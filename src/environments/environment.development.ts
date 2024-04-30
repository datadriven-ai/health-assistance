export const environment = {
  production: false,
  environmentName: 'local',
  surveyApiKey: 'e579d8f6588b7be42911fd9e5554bb4e',
  baseURL: 'http://192.168.17.155:8080/sts/api/v1',
  authServer: 'https://identityserver4test.webmutua.com',
  postLogoutRedirectUri: 'http://localhost:4200/redirect',
  clientID: 'STS',
  context: 'medic',
  automaticSilentRenew: true,
  silentRedirectUri: 'http://localhost:4200/assets/silent-refresh.html',
  homeUrl: '/redirect',
  customToken: null,
};
