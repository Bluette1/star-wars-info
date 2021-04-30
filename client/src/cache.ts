import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));
export const peopleVar = makeVar<Object>({});
export const favouritePeopleVar = makeVar<string[]>([]);

const getPage = () => {
  const page = localStorage.getItem('page');
  let resultPg = '1';
  if (page) {
    resultPg = page;
  }
  return resultPg;
};

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
