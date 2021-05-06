export interface Chamis {
  pseudo: string;
  email: string;
  age: number;
  ville: string;
  description: string;
}

export interface Defis {
  id: string;
  titre: string;
  nomType: string;
  dateDeCreation: Date;
  dateDeModification: Date;
  auteur: string;
  codeArret: string;
  points: number;
  duree: string;
  prologue: string;
  epilogue: string;
  commentaire: string;
}

export interface BlocsTexte {
  bloctexteId: number;
  questionsId: number;
  indicesId: number;
  texte: string;
  defisId: string;
}

export interface Indices {
  indicesId: number;
  defisId: string;
  indiceNum: number;
  description: string;
  points: number;
}
export interface Questions {
  questionId: number;
  defisId: string;
  questionNum: number;
  description: string;
  points: number;
  secret: string;
}

export interface Arrets {
  codeArret: string;
  nomArret: string;
  streetMap: string;
}

export interface MotsCles {
  defisId: string;
  motCle: string;
}

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
  };
}

interface Features {
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
  features: Features[];
}

export interface ArretDefis {
  defis: Defis;
  arret: Arret;
}
export interface DialogData  {
  pseudo: string;
  email: string;
  age: number;
  ville: string;
  description: string;
}


export interface DialogDataAjout{
  auteur: string;
}

