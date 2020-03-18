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
import { FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';  
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
 
export class FormLayoutsComponent implements OnInit,OnDestroy,AfterViewInit {
  [x: string]: any;  
 
  selectedSymptom:any;
  selectedLocation:any;
  selectedSex: string;
  keyword = 'Name';
   Regionkeyword = 'Region';
   Zonekeyword = 'Zone';
  dataService : DataServiceService;
  toastr: ToastrService;
  private subscription: Subscription = new Subscription();

  public sypmtoms=[];
  sexData: any[] = [
    { id: 0, name: 'Male' },
    { id: 1, name: 'Female' } 
  ];
  selectEvent(item) {
    this.selectedLocation = item;
  }
  selectSypmtomEvent(item) {
    if(item.length >1)
    {
    item.forEach((s)=>{
      if(this.selectedSymptom != undefined)
    {
    this.selectedSymptom =  this.selectedSymptom+' '+s.Name;
    }
    else{
    this.selectedSymptom =  s.Name;}
    })}
    else{
      this.selectedSymptom =  item.Name;
    }
    
    }
     
   
  onChangeSearch(val: any) {
  
     
  }
  onChangeRegionSearch(val: any) {
  
    this.dataService.getRegion().subscribe(data => {
      this.geoRegion  = data;
        }); 
        this.dataService.getZone(val.Region).subscribe(data => {
          this.geoZone  = data;
            }); 
  }
  onChangeZoneSearch(val: any) {
  
    this.dataService.getLocationByZone(val.Zone).subscribe(data => {

      this.geojson  = data.filter(e => 
       e.Zone.indexOf(val.Zone) 
       !== -1);
       console.log(this.geojson);
        }); 
  }
  
  onFocused(e){
     
  }
  onChange(name: string, isChecked: boolean) {
     
    if (isChecked) {
      this.selectedSex=name;
    }
  }
  public save(form:any)
  {
  
    var data = {DateCreated: Date.now(), Type:'A',  Remark:form.value.Description, Age:form.value.Age as string, Sex: form.value.gender,lat:this.selectedLocation.Lat,long: this.selectedLocation.Long,symptom:this.selectedSymptom , Name: this.selectedLocation.Name}  ;
 
   this.dataService.createClaim(data).subscribe(res =>{
    this.router.navigate(['form/layout/Claim'])
     this.showToaster();
     },
    error => {
      console.error(error);
    
   } );
  }
 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
     this.dataService.getSymptoms().subscribe(res =>{
      this.sypmtoms = res;
     } ); 

    this.selectedItems = [
       
    ];
    this.dropdownSettings=  {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    this.sypmtoms.forEach((s)=>{
      if(this.selectedSymptom != undefined)
    {
    this.selectedSymptom =  this.selectedSymptom+' '+s.Name;
    }
    else{
    this.selectedSymptom =  s.Name;}
    })
     
    console.log(items);
  }
  ngAfterViewInit(): void {
   
    this.subscription.add(this.dataService.searchLocation('').subscribe(
      result => {
        console.log("geojson",result);
        this.geojson = result;
        this.showToaster();
       },
      error => {
        console.error(error);
      }
    ));
    this.showToaster();
    this.subscription.add(this.dataService.searchLocation('').subscribe(
      result => {
        console.log("geojson",result);
        this.geojson = result;
      
       },
      error => {
        console.error(error);
      }
    ));
    this.subscription.add(this.dataService.getRegion().subscribe(
      result => {
         this.geoRegion = result;
        
       },
      error => {
        console.error(error);
      }
    ));
    this.subscription.add(this.dataService.getZone('').subscribe(
      result => {
         this.geoZone = result;
        
       },
      error => {
        console.error(error);
      }
    ));
  } 
  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  constructor(service: DataServiceService,private toast: ToastrService ,private router: Router) {
     this.dataService =service;
     this.toastr =toast;
  }
}
