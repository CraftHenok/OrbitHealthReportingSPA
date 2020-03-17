import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents } from './maps-routing.module';

import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { DataServiceService } from '../../data-service.service';

@NgModule({
  imports: [
    ThemeModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
    NbCardModule,
  ],
  providers: [DataServiceService],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
})
export class MapsModule { }
