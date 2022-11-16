export interface ISingleCard {
  url: string;
  name: string;
}
export interface IFetchAllCardResponse {
  count: number;
  next: string;
  previous?: any;
  results: ISingleCard[];
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
