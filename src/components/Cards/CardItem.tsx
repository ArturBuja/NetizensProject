import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

//styles
import classes from './CardItem.module.css';
import './heart.css';

//COMPONENTS
import LoadingSpinner from '../../UI/LoadingSpinner';

//API
import { fetchSinglePokemon } from '../../lib/api';

//Hooks
import useHttp from '../../hooks/use-http';

//ICONS
import { AiOutlineRollback } from 'react-icons/ai';

//types
import { ISingleCard, IuseHttp } from '../../types/Index';

type IProps = {
  results: ISingleCard;
  i: number;
  onRemoveItem?: () => void;
};

const CardItem: React.FC<IProps> = ({
  results,
  i,
  onRemoveItem,
}): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const [favotites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const { sendRequest, status, data, error }: IuseHttp = useHttp(
    fetchSinglePokemon,
    true
  );

  const isFavourited = favotites.includes(i);

  const showSecondSideCardHandler = async () => {
    sendRequest(results.url);
    setClicked(state => !state);
  };

  const addOrRemoveCardFromFavorites = () => {
    if (!isFavourited) {
      const favotiesActual = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      const newStarageItem: number[] = [...favotiesActual, i];
      localStorage.setItem('favorites', JSON.stringify(newStarageItem));
      setFavorites(newStarageItem);
    } else {
      const favotiesActual = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      const newStorageItem = favotiesActual.filter((id: number) => id !== i);
      localStorage.setItem('favorites', JSON.stringify(newStorageItem));
      setFavorites(newStorageItem);
      if (onRemoveItem) {
        onRemoveItem();
        setClicked(prevState => !prevState);
      }
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
      <div className={classes.card}>
        <div className={classes.borderCard}></div>
        <figcaption className={classes.captionCard}>
          <div className='centered'>
            <LoadingSpinner />
          </div>
        </figcaption>
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
      <div className={classes.card}>
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
            <div
              onClick={addOrRemoveCardFromFavorites}
              className={isFavourited ? 'heart heart-active' : 'heart'}
            />
            <AiOutlineRollback
              color='#3a1c71'
              size={50}
              style={{ marginLeft: '70%' }}
              onClick={() => setClicked(state => !state)}
            />
          </div>
        </figcaption>
      </div>
    );
  }

  //FRONT CARD SIDE
  return (
    <ReactCardFlip isFlipped={clicked}>
      <div className={classes.card} onClick={showSecondSideCardHandler}>
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
            <i>Kliknij, aby odwrócić kartę i zobaczyć statystyki.</i>
          </p>
        </figcaption>
      </div>
      {/* BACK SIDE CARD */}
      <>{output}</>
    </ReactCardFlip>
  );
};

export default CardItem;
