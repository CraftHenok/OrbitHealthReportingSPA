/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete"; 
import {AutocompleteLibModule} from 'angular-ng-autocomplete'; 
//environment import
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { GooglePlacesDirectiveDirective } from './google-places-directive.directive';
import { DataServiceService } from './data-service.service';
 
import {NgAutoCompleteModule} from "ng-auto-complete";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
 
import { ToastrModule } from 'ngx-toastr';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,  
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [AppComponent, GooglePlacesDirectiveDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    ToastrModule.forRoot(),
    FormsModule, 
    AutocompleteLibModule, 
     FormsModule,
     NgMultiSelectDropDownModule.forRoot(),
     NgAutoCompleteModule,
    GooglePlaceModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFirestoreModule,
   LeafletModule.forRoot(),
   LeafletMarkerClusterModule.forRoot(),
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
