// tslint:disable-next-line: class-name
interface features extends Object {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    code: string;
    libelle: string;
    type: string;
    commune: string;
    arr_visibles: string;
    id: string;
    epci: string;
  };
  type: string;
}

export interface Arret extends Object {
  type: string;
  features: features[];
}
