 
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";   
 
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import {shareReplay} from 'rxjs/operators'; 
import { Claim } from './Claim';

@Injectable({
  providedIn: "root"
})
 
export class DataServiceService {
  baseurl: string;
  http: HttpClient
 constructor(private httpclient: HttpClient,private angularFirestore: AngularFirestore ) {  
            this.baseurl="http://localhost:26922/api/";  
            this.http= httpclient;
}  
 
  
 public createClaim(claim: any) {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var data = JSON.stringify(claim);
      return this.http.post(this.baseurl+"Incidents",data,{headers:headers});
     }
     getClaims(): Observable<any> {
      return this.http.get(this.baseurl+"Incidents");
  }
           

        public getJSON(): Observable<any> {
          return this.http.get(this.baseurl+"Locations");
      }
      public getRegion(): Observable<any> {
        return this.http.get(this.baseurl+"Regions");
    }
    public getZone(): Observable<any> {
      return this.http.get(this.baseurl+"Zones");
  }
  public searchLocation(search:string): Observable<any> {
    return this.http.get(this.baseurl+"Locations/"+search);
}
  public getLocationByZone(zone:string): Observable<any> {
    return this.http.get(this.baseurl+"Locations/FilterLocationByZone?Zone="+zone);
}
      public getGeoJson() {
                    
            var geojson=  this.http.get(this.baseurl+"locations").pipe(
            shareReplay(1)
          );
              return geojson;  
        } 
    }
