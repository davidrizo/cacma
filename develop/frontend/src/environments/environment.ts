// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/* TO-DO We are using the development environment also for production for an error in deployment */
export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:63342/CACMA/php_backend/api',
  home: 'http://localhost:3000',
  // home: 'https://davidrizo.github.io/cacma' //
  auth: {
    CLIENT_ID: 'fsGZbuPGwZcxOMN61PNYeon1yyO3Cp9Z',
    CLIENT_DOMAIN: 'easda-research.eu.auth0.com', // e.g., 'you.auth0.com'
    REDIRECT: 'http://localhost:3000/callback',
    LOGOUT_URL: 'http://localhost:3000'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
