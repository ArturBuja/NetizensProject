import { useEffect } from 'react';

//TYPES
import { IuseHttp } from '../types/Index';

//API
import { fetchAllCards } from '../lib/api';

//COMPONENTS
import AllCardsList from './AllCardsList';
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

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && (!loadedCards || loadedCards.length === 0)) {
    console.log('componnet');
    return (
      <p className='centered focused'> Coś poszło nie tak! Error: {error}</p>
    );
    // return;
  }

  return <AllCardsList results={loadedCards} />;
}

export default MainPage;
