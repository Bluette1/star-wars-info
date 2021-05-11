import { ReactiveVar, useReactiveVar } from '@apollo/client';

export default function useFavourites(favouritePeopleVar: ReactiveVar<string[]>) {
  const getFavourites = useReactiveVar(favouritePeopleVar);
  const setFavourites = (favourites) => {
    localStorage.setItem('favourites', JSON.stringify(favourites) as string);
    favouritePeopleVar(favourites);
  };
  const deleteFavourite = (name) => {
    const favourites = getFavourites.filter((currName) => currName !== name);
    localStorage.setItem('favourites', JSON.stringify(favourites) as string);
    setFavourites(favourites);
  };
  const addFavourite = (name) => {
    const favourites = [...getFavourites, name];
    localStorage.setItem('favourites', JSON.stringify(favourites) as string);
    setFavourites(favourites);
  };
  return {
    getFavourites, setFavourites, deleteFavourite, addFavourite,
  };
}
