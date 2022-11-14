import { ICardResult, IFetchcardResponse } from '../types/Index';

const BASE_URL = 'https://swapi.dev/api/';

export const fetchAllCards = async () => {
  const response = await fetch(`${BASE_URL}/people/`);
  const data: IFetchcardResponse = await response.json();
  const transformedSWPeaople: ICardResult[] = [];
  data.results.map((card: ICardResult) => transformedSWPeaople.push(card));

  return transformedSWPeaople;
};
