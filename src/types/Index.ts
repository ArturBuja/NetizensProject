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

export interface IuseHttp {
  sendRequest: any;
  status: 'pending' | 'completed';
  data: any;
  error: string;
}
