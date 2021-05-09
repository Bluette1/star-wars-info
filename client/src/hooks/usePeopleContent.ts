import { ReactiveVar } from '@apollo/client';
import Person from '../Person';

export default function usePeopleContent(peopleVar: ReactiveVar<Person[]>) {
  const getPeople = peopleVar();
  const setPeople = (people) => { peopleVar(people); };
  return {
    getPeople, setPeople,
  };
}
