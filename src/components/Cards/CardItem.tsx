import { useState } from 'react';
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

//types
import { ISingleCard, IuseHttp } from '../../types/Index';

type IProps = {
  results: ISingleCard;
  i: number;
};

const CardItem: React.FC<IProps> = ({ results, i }): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const [favotites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const { sendRequest, status, data, error }: IuseHttp = useHttp(
    fetchSinglePokemon,
    true
  );
  const isFavourited = favotites.includes(i);

  const cardClickHandler = async () => {
    sendRequest(results.url);
    setClicked(state => !state);
  };

  const addFav = () => {
    if (!isFavourited) {
      const favotiesActual = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      const newStarageItem: number[] = [...favotiesActual, i];
      console.log(newStarageItem);
      localStorage.setItem('favorites', JSON.stringify(newStarageItem));
      setFavorites(newStarageItem);
    } else {
      const favotiesActual = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      const newStorageItem = favotiesActual.filter((id: number) => id !== i);
      localStorage.setItem('favorites', JSON.stringify(newStorageItem));
      setFavorites(newStorageItem);
    }

    const storage = localStorage.getItem('favItem' + i || '[]');

    if (storage == null) {
      localStorage.setItem('favItem' + i, JSON.stringify(results));
    } else {
      localStorage.removeItem('favItem' + i);
    }
  };

  let output: React.ReactNode;

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
        <div className={classes.borderCard}></div>
        <figcaption className={classes.captionCard}>
          <h4>Statystyki:</h4>
          <>
            {data.stats.map((item: any, idx: number) => {
              return (
                <ul key={idx}>
                  <li>
                    {item.stat.name}: {item.base_stat}
                  </li>
                </ul>
              );
            })}
          </>
          <div className={classes.btnContainer}>
            {isFavourited ? (
              <AiFillHeart onClick={() => addFav()} color='red' size={50} />
            ) : (
              <AiOutlineHeart onClick={() => addFav()} color='red' size={50} />
            )}
            <AiOutlineRollback
              color='#3a1c71'
              size={50}
              onClick={() => setClicked(state => !state)}
            />
          </div>
        </figcaption>
      </>
    );
  }
  return (
    <ReactCardFlip isFlipped={clicked} flipDirection={'horizontal'}>
      <figure className={classes.frontCard} onClick={cardClickHandler}>
        <div className={classes.borderCard}></div>
        <figcaption
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          className={classes.captionCard}
        >
          <h4>{results.name}</h4>
          <p>
            <i>Kliknij aby odwórcić kartę i zobaczyć statystyki</i>
          </p>
        </figcaption>
      </figure>
      <figure className={classes.card}>{output}</figure>
    </ReactCardFlip>
  );
};

export default CardItem;
