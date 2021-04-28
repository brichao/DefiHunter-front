import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection, MultiLineString, Polygon, Point} from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private geoJsonMap: Map<string, Promise<FeatureCollection<MultiLineString | Polygon | Point>>> = new Map();

  constructor(private http: HttpClient) { }

  public getFeatureCollection(path: string): Promise<FeatureCollection<MultiLineString | Polygon | Point>>{
    const promise = this.http.get('/assets/geojson/' + path).toPromise() as Promise<FeatureCollection<MultiLineString | Polygon | Point>>;

    this.geoJsonMap.set(path, promise);
    return promise;
  }


}
