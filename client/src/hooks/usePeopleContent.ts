import { ReactiveVar } from '@apollo/client';
import { currentPage } from '../cache';

export default function usePeopleContent(peopleVar: ReactiveVar<Object>) {
  const getPeople = () => {
    const currPg = parseInt(currentPage(), 10);
    const people = peopleVar();
    if (people[currPg]) {
      return people[currPg];
    }
    return [];
  };
  const setPeople = (pge, people) => {
    const currPeople = peopleVar();
    currPeople[pge] = people;
    localStorage.setItem('peopleData', JSON.stringify(currPeople) as string);
    peopleVar(currPeople);
  };
  return {
    getPeople, setPeople,
  };
}
