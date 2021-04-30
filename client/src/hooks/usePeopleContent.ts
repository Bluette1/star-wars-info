import { ReactiveVar } from '@apollo/client';

export default function usePeopleContent(peopleVar: ReactiveVar<Object>) {
  const getPeople = (page) => {
    const all = peopleVar();
    return all[page];
  };
  const setPeople = (people) => { peopleVar(people); };

  return {
    getPeople, setPeople,
  };
}
