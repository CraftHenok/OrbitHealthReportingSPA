import { Component,NgZone, ViewChild, OnInit ,OnDestroy,  AfterViewInit} from '@angular/core'; 
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { DataServiceService } from '../../../data-service.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {Subscription} from 'rxjs';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutoCompleteComponent} from "ng-auto-complete";
import { geoJSON } from 'leaflet';
import { Claim } from '../../../Claim';
//import  *  as  data  from  '../../data/geojson.json';
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
 
export class FormLayoutsComponent implements OnInit,OnDestroy,AfterViewInit {
  [x: string]: any;  
 
  selectedSymptom:any;
  selectedLocation:any;
  keyword = 'Name';
  dataService : DataServiceService;
  private subscription: Subscription = new Subscription();

  public sypmtoms=[];
 
  selectEvent(item) {
    this.selectedLocation = item;
  }
  selectSypmtomEvent(item) {
    this.selectedSymptom = item;
  }
  onChangeSearch(val: any) {
  
    this.dataService.searchLocation(val).subscribe(data => {
      this.geojson  = data;
        }); 
  }
  
  onFocused(e){
     
  }
  public save(form:any)
  {
    var data = { Remark:form.value.Description,lat:this.selectedLocation.Lat,long: this.selectedLocation.Long,symptom:this.selectedSymptom.item_text , Name: this.selectedLocation.Name}  ;
 
   this.dataService.createClaim(data).subscribe(res =>{
    console.log(res);
   } );
  }
 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.sypmtoms = [
      { item_id: 1, item_text: 'Coughing' },
      { item_id: 2, item_text: 'Sweating' },
      { item_id: 3, item_text: 'Unable to Breath' } 
    ];
    this.selectedItems = [
       
    ];
    this.dropdownSettings=  {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  ngAfterViewInit(): void {
   
    this.subscription.add(this.dataService.searchLocation('').subscribe(
      result => {
        console.log("geojson",result);
        this.geojson = result;
       },
      error => {
        console.error(error);
      }
    ));
  } 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  constructor(service: DataServiceService) {
    this.dataService = service;
     
  }
}
