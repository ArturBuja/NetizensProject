import { useState, useContext, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import FavoriteContext from '../../store/fovorite-contex';

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

function CardItem({ results, i }: any) {
  const favCtx = useContext(FavoriteContext);
  const [clicked, setClicked] = useState(false);
  const [favotites, setFavorites] = useState([] as number[]);
  const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
  const { sendRequest, status, data, error } = useHttp(
    fetchSinglePokemon,
    true
  );

  useEffect(() => {
    if (getArray !== 0) {
      setFavorites([...getArray]);
    }
  }, []);

  const cardClickHandler = async () => {
    sendRequest(results.url);
    setClicked(state => !state);
  };

  const favioritesHandler = (id: number) => {
    console.log(results);
    favCtx.addToFavorite(results, id);
    console.log(id);
  };

  const addFav = (props: any) => {
    let array = favotites;
    console.log(array);
    let addAray = true;
    array.map((item: any, key: number) => {
      if ((item = props.i)) {
        array.splice(key, 1);
        addAray = false;
      }
    });
    if (addAray) array.push(props.i);
    setFavorites([...array]);
    localStorage.setItem('favorites', JSON.stringify(favotites));

    const storage = localStorage.getItem('favItem' + props.i || '0');

    if (storage == null) {
      localStorage.setItem('favItem' + props.i, JSON.stringify(props.results));
    } else {
      localStorage.removeItem('favItem' + props.i);
    }
  };

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
          {favotites.includes(i) ? (
            <AiFillHeart
              onClick={() => addFav({ results, i })}
              color='green'
              size={50}
            />
          ) : (
            <AiOutlineHeart
              onClick={() => addFav({ results, i })}
              color='green'
              size={50}
            />
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
}

export default CardItem;
