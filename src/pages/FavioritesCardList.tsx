//components
import CardItem from '../components/Cards/CardItem';

interface ISingleCard {
  url: string;
  name: string;
}

function FavioritesCardList() {
  const favList: ISingleCard[] = [];
  console.log(favList);
  const getArray: number[] = JSON.parse(
    localStorage.getItem('favorites') || '0'
  );

  for (let index = 0; index < getArray.length; index++) {
    let x: number = getArray[index];
    favList[index] = JSON.parse(localStorage.getItem('favItem' + [x]) || '');
  }

  if (getArray.length <= 0) {
    return (
      <div className='centered'>
        <h2>Brak ulubionych kart.</h2>
      </div>
    );
  }

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      {favList.map((card: ISingleCard, idx: number) => (
        <CardItem key={idx} results={card} i={getArray[idx]} />
      ))}
    </section>
  );
}

export default FavioritesCardList;
