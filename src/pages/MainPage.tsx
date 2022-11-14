import React, { useEffect } from 'react';
import CardList from '../components/Cards/CardsList';
import useHttp from '../hooks/use-http';
import { fetchAllCards } from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

function MainPage() {
  const {
    sendRequest,
    status,
    data: loadedCards,
  } = useHttp(fetchAllCards, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  console.log(loadedCards);
  let results;

  if (status === 'pending') {
    results = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && (!loadedCards || loadedCards.length === 0)) {
    results = <p className='centered'> Coś poszło nie tak!</p>;
  }

  if (status === 'completed' && (loadedCards || loadedCards.length > 0)) {
    results = <CardList results={loadedCards} />;
  }
  return <section>{results}</section>;
}

export default MainPage;
