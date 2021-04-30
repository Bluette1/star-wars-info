import { ReactiveVar } from '@apollo/client';
import { currentPage } from '../cache';

const pageMap = {
  1: 'page1',
  2: 'page2',
  3: 'page3',
  4: 'page4',
  5: 'page5',
  6: 'page6',
  7: 'page7',
  8: 'page8',
  9: 'page9',
};

export default function usePeopleContent(peopleVar: ReactiveVar<Object>) {
  const getPeople = () => {
    const currPge = currentPage();
    // const allPeople = getPeople(pageMap[parseInt(currPge, 10)]);
    const all = peopleVar();
    return all[pageMap[parseInt(currPge, 10)]];
  };
  const setPeople = (people) => { peopleVar(people); };

  return {
    getPeople, setPeople,
  };
}
