interface Coordinate {
  lat: number;
  long: number;
}

export interface Ligne {
  coordinates: Coordinate[];
  properties: {
    numero: string;
    code: string;
    couleur: string;
    libelle: string;
    zonesArret: string[];
  }
}
