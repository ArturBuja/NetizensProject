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

function CardItem({ results }: any) {
  const [clicked, setClicked] = useState(false);
  const { sendRequest, status, data, error } = useHttp(
    fetchSinglePokemon,
    true
  );

  const cardClickHandler = async () => {
    sendRequest(results.url);
    setClicked(state => !state);
  };

  const favioritesHandler = (id: number) => {
    console.log(id);
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
          <AiOutlineHeart
            onClick={() => favioritesHandler(data.id)}
            color='green'
            size={50}
          />
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
