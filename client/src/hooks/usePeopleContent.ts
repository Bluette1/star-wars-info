import { ReactiveVar } from '@apollo/client';
import { currentPage } from '../cache';

export default function usePeopleContent(peopleVar: ReactiveVar<Object>) {
  const getPeople = () => {
    const currPge = currentPage();
    const all = peopleVar();
    return all[parseInt(currPge, 10)];
  };
  const setPeople = (people) => { peopleVar(people); };

  return {
    getPeople, setPeople,
  };
}
