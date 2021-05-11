import { ReactiveVar } from '@apollo/client';

export default function useFavourites(favouritePeopleVar: ReactiveVar<string[]>) {
  const getFavourites = favouritePeopleVar();
  const setFavourites = (favourites) => {
    localStorage.setItem('favourites', JSON.stringify([...favouritePeopleVar(), ...favourites]) as string);
    favouritePeopleVar(favourites);
  };
  const deleteFavourite = (name) => {
    const favourites = favouritePeopleVar().filter((currName) => currName !== name);
    localStorage.setItem('favourites', JSON.stringify(favourites) as string);
    favouritePeopleVar(favourites);
  };
  const addFavourite = (name) => {
    const favourites = [...favouritePeopleVar(), name];
    localStorage.setItem('favourites', JSON.stringify(favourites) as string);

    favouritePeopleVar(favourites);
  };
  const isFavourite = (name) => {
    const isInFavourites = name ? favouritePeopleVar().includes(name) : false;
    return isInFavourites;
  };
  return {
    getFavourites, setFavourites, deleteFavourite, addFavourite, isFavourite,
  };
}
