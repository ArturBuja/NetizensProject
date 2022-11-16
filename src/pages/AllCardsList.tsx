import React from 'react';

//COMPONENTS
import CardItem from '../components/Cards/CardItem';

interface ISingleCard {
  url: string;
  name: string;
}
interface IProps {
  results: ISingleCard[];
}

const AllCardsList: React.FC<IProps> = ({ results }) => {
  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      {results.map((card: ISingleCard, idx: number) => {
        return <CardItem key={idx} results={card} i={idx} />;
      })}
    </section>
  );
};

export default AllCardsList;
