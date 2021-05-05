// tslint:disable-next-line: class-name
interface features {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    code: string;
    LIBELLE: string;
    type: string;
    COMMUNE: string;
    arr_visibles: string;
    id: string;
    epci: string;
  };
}

export interface Arret extends Object {
  type: string;
  features: features[];
}
