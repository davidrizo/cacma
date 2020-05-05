// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/* TO-DO We are using the development environment also for production for an error in deployment */
export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:63342/CACMA/php_backend/api',
  client_id: 'fsGZbuPGwZcxOMN61PNYeon1yyO3Cp9Z', // auth0 client ID
  home: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
