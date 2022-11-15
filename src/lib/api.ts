import { IFetchcardResponse } from '../types/Index';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchAllCards = async () => {
  const response = await fetch(baseUrl);
  const data: IFetchcardResponse = await response.json();

  if (!response.ok) {
    throw new Error('Bład przy pobieraniu kart');
  }

  return data.results;
};
export const fetchSinglePokemon = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Bład przy pobieraniu kart');
  }

  return data;
};
