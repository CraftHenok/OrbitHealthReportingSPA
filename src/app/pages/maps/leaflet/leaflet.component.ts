import { Component, OnInit } from '@angular/core';

import { LeafletMarkerClusterDirective, LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster'; 

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
 
import 'leaflet.markercluster';
import { DataServiceService } from '../../../data-service.service'; 
import { Claim } from '../../../Claim';
@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
     
  <div style="height: 400px;"
  leaflet
  [leafletOptions]="options"
  [leafletMarkerCluster]="markerClusterData"
  [leafletMarkerClusterOptions]="markerClusterOptions">
</div>
      
  `,
})
export class LeafletComponent implements OnInit {
	dataService: DataServiceService;
	geoData: any = [];
	// Open Street Map Definition
	LAYER_OSM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: false,
		layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})
	};

	// Values to bind to Leaflet Directive
	layersControlOptions = { position: 'bottomright' };
	baseLayers = {
		'Open Street Map': this.LAYER_OSM.layer
	};
	options = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
		  ],  maxZoom : 6,
	  zoom: 6,
    center: L.latLng({ lat: 8.51803, lng: 42.97537 }),
 	};

	// Marker cluster stuff
	markerClusterGroup: L.MarkerClusterGroup;
	markerClusterData: L.Marker[] = [];
	markerClusterOptions: L.MarkerClusterGroupOptions;
 
	// Generators for lat/lon values
	generateLat() { return Math.random() * 8.51803; }
	generateLon() { return Math.random() * 40; }


	ngOnInit() {

		this.refreshData();

	}

	markerClusterReady(group: L.MarkerClusterGroup) {

		this.markerClusterGroup = group;

	}

	refreshData(): void {
				this.dataService.getClaims().subscribe( res=>
					{ 
						this.geoData= res;
						console.log("response ",+res);
						this.markerClusterData = this.generateData(this.geoData);}
				); 
	}

	generateData(markers: any): L.Marker[] {

		const data: L.Marker[] = [];
			console.log("metadata ",+markers);
		for (let i = 0; i < markers.length; i++) {

			const icon = L.icon({
				iconUrl: 'favicon.ico',
				shadowUrl: 'favicon.ico'
			});
			//	console.log("marker",markers[i]);
			 
	  	data.push(L.marker([ markers[i].Long,markers[i].Lat ], { icon }));
		}

		return data;

	}
	constructor(service: DataServiceService) {
		this.dataService = service;
		 
	  }
 
}
