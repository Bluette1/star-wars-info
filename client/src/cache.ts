import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

const getPage = () => {
  const page = localStorage.getItem('page');
  let resultPg = '1';
  if (page) {
    resultPg = page;
  }
  return resultPg;
};

const createStorage = (varName) => {
  let people;
  const peopleObj = localStorage.getItem(varName);
  if (peopleObj) {
    console.log('var', peopleObj);
    people = JSON.parse(peopleObj);
  }
  return people;
};

export const peopleVar = makeVar(createStorage('peopleData') || {});
export const favouritePeopleVar = makeVar(createStorage('favourites') || []);

export const currentPage = makeVar(getPage());

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        currPage: {
          read() {
            return currentPage();
          },
        },
        favourites: {
          read() {
            return favouritePeopleVar();
          },
        },
        peopleCurrent: {
          read() {
            return peopleVar();
          },
        },
      },
    },
  },
});
