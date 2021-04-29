import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { RawResult } from 'leaflet-geosearch/dist/providers/bingProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
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
