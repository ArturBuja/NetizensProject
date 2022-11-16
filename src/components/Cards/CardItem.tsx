import { useState, useCallback } from 'react';
import ReactCardFlip from 'react-card-flip';
//styles
import classes from './CardItem.module.css';

//COMPONENTS
import LoadingSpinner from '../../UI/LoadingSpinner';

//API
import { fetchSinglePokemon } from '../../lib/api';

//Hooks
import useHttp from '../../hooks/use-http';

//ICONS
import { AiOutlineHeart, AiFillHeart, AiOutlineRollback } from 'react-icons/ai';

const CardItem = ({ results, i }: any) => {
  const [clicked, setClicked] = useState(false);
  const [favotites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const { sendRequest, status, data, error } = useHttp(
    fetchSinglePokemon,
    true
  );
  const isFavourited = favotites.includes(i);

  const cardClickHandler = async () => {
    sendRequest(results.url);
    setClicked(state => !state);
  };

  const addFav = useCallback(() => {
    if (!isFavourited) {
      const newStarageItem = [...favotites, i];
      setFavorites(newStarageItem);
      window.localStorage.setItem('favorites', JSON.stringify(newStarageItem));
      window.location.reload();
    } else {
      console.log('usuwanie');
      const newStorageItem = favotites.filter((id: number) => id !== i);
      setFavorites(newStorageItem);
      window.localStorage.setItem('favorites', JSON.stringify(newStorageItem));
    }

    const storage = localStorage.getItem('favItem' + i || '[]');

    if (storage == null) {
      localStorage.setItem('favItem' + i, JSON.stringify(results));
    } else {
      localStorage.removeItem('favItem' + i);
    }
  }, [favotites, i, isFavourited, results]);

  let output;

  //Component with detals if status is:
  if (status === 'pending') {
    output = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  //Component with detals if status is:
  if (error) {
    output = <p className='centered focused'>{error}</p>;
  }

  //Component with detals if status is:
  if (status === 'completed') {
    output = (
      <>
        <h4>Statystyki:</h4>
        <>
          {data.stats.map((item: any, idx: number) => {
            return (
              <p key={idx}>
                {item.stat.name}: {item.base_stat}
              </p>
            );
          })}
        </>
        <div className={classes.btnContainer}>
          {isFavourited ? (
            <AiFillHeart onClick={() => addFav()} color='green' size={50} />
          ) : (
            <AiOutlineHeart onClick={() => addFav()} color='green' size={50} />
          )}
          <AiOutlineRollback
            color='green'
            size={50}
            onClick={() => setClicked(state => !state)}
          />
        </div>
      </>
    );
  }
  return (
    <ReactCardFlip isFlipped={clicked} flipDirection={'horizontal'}>
      <div className={classes.frontCard} onClick={cardClickHandler}>
        <h4>{results.name}</h4>
      </div>
      <div className={classes.card}>{output}</div>
    </ReactCardFlip>
  );
};

export default CardItem;
