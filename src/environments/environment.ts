// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'local',
  surveyApiKey: 'e579d8f6588b7be42911fd9e5554bb4e',
  baseURL: 'http://127.0.0.1:8080/sts/api/v1',
  authServer: 'https://identityserver4test.webmutua.com',
  postLogoutRedirectUri: 'http://localhost:4200/redirect',
  clientID: 'STS',
  context: 'medic',
  automaticSilentRenew: true,
  silentRedirectUri: 'http://localhost:4200/assets/silent-refresh.html',
  homeUrl: '/redirect',
  customToken: null,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
