export interface ICardResult {
  cards: any;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface IFetchcardResponse {
  count: number;
  next: string;
  previous?: any;
  results: ICardResult[];
}

export interface Result {
  name: string;
  url: string;
}

export interface IResponseRootResult {
  count: number;
  next: string;
  previous?: any;
  results: Result[];
}
