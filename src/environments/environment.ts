// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:4200',
  firebaseConfig: {
    apiKey: 'AIzaSyAHgW69C2McqTeBss0UpvHPX8d6SKWEOLc',
    authDomain: 'chat-d0950.firebaseapp.com',
    databaseURL: 'https://chat-d0950.firebaseio.com',
    projectId: 'chat-d0950',
    storageBucket: 'chat-d0950.appspot.com',
    messagingSenderId: '469818241868',
    appId: '1:469818241868:web:fe3fbd1032e57da79915e9',
    measurementId: 'G-PPYEX40CRM'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
