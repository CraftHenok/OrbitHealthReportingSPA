import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'; 
import { DataServiceService } from '../../../data-service.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map'; 
@Component({
    selector: 'AutocompleteComponent',
      styleUrls: ['./autocomplete.component.scss'],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit {
    results: any[] = [];
    queryField: FormControl = new FormControl();
    constructor(private _searchService: DataServiceService) { }
   
    ngOnInit() {
         }

}