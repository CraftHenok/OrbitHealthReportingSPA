import { Component, OnInit } from '@angular/core';

import { LeafletMarkerClusterDirective, LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster'; 

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
 
import 'leaflet.markercluster';

import 'leaflet';
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; 
import 'leaflet/dist/leaflet.css';

import { DataServiceService } from '../../../data-service.service'; 
import { Claim } from '../../../Claim';
import { marker } from 'leaflet';
@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
     
  <div style="height: 400px;"
  leaflet
  [leafletOptions]="options"
  [leafletMarkerCluster]="markerClusterData"
  [leafletMarkerClusterOptions]="markerClusterOptions"
  (leafletMarkerClusterReady)="markerClusterReady($event)">
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
    center: L.latLng({ lat: 8.51803, lng: 41.97537 }), 
 	};

	// Marker cluster stuff
 	markerClusterGroup: L.MarkerClusterGroup;
	markerClusterData: L.Marker[] = [];
	markerClusterOptions: L.MarkerClusterGroupOptions;
	
	  markers = L.markerClusterGroup({
		iconCreateFunction: function(cluster) {
			return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
		}
	});
	  
	 
	ngOnInit() {

		this.refreshData();
		

	}

	markerClusterReady(group: L.MarkerClusterGroup) {
		 
		this.markerClusterGroup = group; 
	 	this.markerClusterGroup.refreshClusters();
	}

	refreshData(): void {
				this.dataService.getClaims().subscribe( res=>
					{ 
						this.geoData= res; 
						this.markerClusterData = this.generateData(this.geoData);}
				); 
	}

	generateData(markers: any): L.Marker[] {

		const data: L.Marker[] = []; 
		for (let i = 0; i < markers.length; i++) {
 
		var icon=L.icon({
				iconSize: [25, 41],
				iconAnchor: [10, 41],
				popupAnchor: [2, -40],
				// specify the path here
				iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
				shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
			  })
		 
	  	data.push(L.marker([ markers[i].Lat,markers[i].Long ], {  icon}).bindPopup(markers[i].Name+' '+markers[i].Symptom));
		}

		return data;

	}
	constructor(service: DataServiceService) {
		this.dataService = service;
		 
	  }


}
