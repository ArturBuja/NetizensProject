import React from 'react';

//COMPONENTS
import CardItem from './CardItem';

const CardsList: React.FC<any> = ({ results }) => {
  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      {results.map((card: any, idx: number) => (
        <CardItem key={idx} results={card} i={idx} />
      ))}
    </section>
  );
};

export default CardsList;
