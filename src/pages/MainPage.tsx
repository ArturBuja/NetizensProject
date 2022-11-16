import { useEffect } from 'react';

//TYPES
import { IuseHttp } from '../types/Index';

//API
import { fetchAllCards } from '../lib/api';

//COMPONENTS
import CardList from './AllCardsList';
import LoadingSpinner from '../UI/LoadingSpinner';

//CUSTOM HOOKS
import useHttp from '../hooks/use-http';

function MainPage() {
  const {
    sendRequest,
    status,
    data: loadedCards,
    error,
  }: IuseHttp = useHttp(fetchAllCards, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let results: React.ReactNode;

  if (status === 'pending') {
    results = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && (!loadedCards || loadedCards.length === 0)) {
    results = <p className='centered'> Coś poszło nie tak! Error: {error}</p>;
  }

  if (status === 'completed' && (loadedCards || loadedCards.length > 0)) {
    results = <CardList results={loadedCards} />;
  }
  return <section>{results}</section>;
}

export default MainPage;
