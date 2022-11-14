import React from 'react';
import { ICardResult, IFetchcardResponse } from '../../types/Index';

function CardItem({ results }: IFetchcardResponse) {
  return <div>{results.name}</div>;
}

export default CardItem;
