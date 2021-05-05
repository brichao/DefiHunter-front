interface features extends Object {
  geometry: {

  }
  properties: {}
  type: string
}

export interface Arret extends Object {
  type: string;
  features: features[];
  code: string;
  libelle: string;
  commune: string;
  coordinates: [number, number];
}
