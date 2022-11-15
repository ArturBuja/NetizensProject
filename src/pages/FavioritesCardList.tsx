import CardItem from '../components/Cards/CardItem';
import CardList from '../components/Cards/CardsList';

function FavioritesCardList() {
  const favList: any = [{}];
  const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
  for (let index = 0; index < getArray.length; index++) {
    let x = getArray[index];
    favList[index] = JSON.parse(localStorage.getItem('favItem' + [x]) || '');
  }
  console.log(getArray);
  if (getArray.length <= '0' || getArray === '0' || getArray === 0) {
    return (
      <div className='centered'>
        <h2>Brak ulubionych kart.</h2>
      </div>
    );
  }

  return (
    <div className='centered'>
      <h2>Brak ulubionych kart.</h2>
    </div>
  );
}

export default FavioritesCardList;
