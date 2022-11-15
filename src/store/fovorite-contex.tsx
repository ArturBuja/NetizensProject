import React, { useState } from 'react';

const FavoriteContext = React.createContext({
  isFovorite: false,
  addToFavorite: (item: any, itemId: any) => {},
  removeFavorite: (item: any, itemId: any) => {},
});

export const FavoriteContextProvider = (props: any) => {
  const [isFovorite, setIsFovorite] = useState(false);

  const addToFavoritesHandler = (item: any, id: number) => {
    setIsFovorite(true);
    localStorage.setItem(`favoriteItem${id}`, item);
  };
  const removeFromFavoritesHandler = (itemId: any) => {
    setIsFovorite(false);
    localStorage.removeItem(`favoriteItem${itemId}`);
  };
  return (
    <FavoriteContext.Provider
      value={{
        isFovorite: isFovorite,
        addToFavorite: addToFavoritesHandler,
        removeFavorite: removeFromFavoritesHandler,
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
