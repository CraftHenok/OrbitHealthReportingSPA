/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

 
export const environment = {
  production: false,
  apiurl: "http://40.68.42.200/orbithealth.reporting.api/api/",
 
   // Your web app's Firebase configuration
     firebaseConfig : {
    apiKey: "AIzaSyDNvPAMKmPqtS2icd7phWOqK8vT3_KwMyc",
    authDomain: "fireorbithealth.firebaseapp.com",
    databaseURL: "https://fireorbithealth.firebaseio.com",
    projectId: "fireorbithealth",
    storageBucket: "fireorbithealth.appspot.com",
    messagingSenderId: "622438589562",
    appId: "1:622438589562:web:48b7a7a9acb4fa1f83c7c3",
    measurementId: "G-MB4WFCYHTV"
  }
 
 
};