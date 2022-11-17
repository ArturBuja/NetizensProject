import { IFetchAllCardResponse } from '../types/Index';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60&offset=60';

export const fetchAllCards = async () => {
  const response = await fetch(baseUrl);
  const data: IFetchAllCardResponse = await response.json();
  if (!response.ok) {
    console.warn('Bład przy pobieraniu kart');
  }

  return data.results;
};
export const fetchSinglePokemon = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    console.warn('Bład przy pobieraniu kart');
  }

  return data;
};
