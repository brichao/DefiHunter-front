import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  provider = new OpenStreetMapProvider();

  async getResults(query: HTMLInputElement) {
    const results = await this.provider.search({ query: query.value});
    if (results.length > 0) {
      return(results[0]);
    }
    return null;
    // results.forEach(r => {
    //   this.log(r.label + ":");
    //   this.log(r.x);
    //   this.log(r.y);
    // });
  }

}
