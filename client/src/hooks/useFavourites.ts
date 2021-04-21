import { ReactiveVar, useReactiveVar } from '@apollo/client';

export default function useFavourites(favouritePeopleVar: ReactiveVar<string[]>) {
  const getFavourites = useReactiveVar(favouritePeopleVar);
  const setFavourites = (favourites) => { favouritePeopleVar(favourites); };
  const deleteFavourite = (name) => {
    setFavourites(
      getFavourites.filter((currName) => currName !== name),
    );
  };
  const addFavourite = (name) => { setFavourites([...getFavourites, name]); };
  return {
    getFavourites, setFavourites, deleteFavourite, addFavourite,
  };
}
