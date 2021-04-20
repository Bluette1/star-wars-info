import { ReactiveVar, useReactiveVar } from '@apollo/client';

export default function useFavourites(favouritePeopleVar: ReactiveVar<string[]>) {
  const getFavourites = useReactiveVar(favouritePeopleVar);
  const setFavourites = (favourites) => { favouritePeopleVar(favourites); };

  return {
    operations: { getFavourites, setFavourites },
  };
}
