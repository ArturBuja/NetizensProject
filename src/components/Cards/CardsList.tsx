import React from 'react';
import { ICardResult, IFetchcardResponse } from '../../types/Index';
import CardItem from './CardItem';

const CardsList: React.FC<IFetchcardResponse> = ({ results }) => {
  // console.log(cards);
  return (
    <ul>
      {results.map((card: ICardResult, idx: number) => (
        <CardItem key={idx} results={card} />
      ))}
    </ul>
  );
};

export default CardsList;
