import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

const getPage = () => {
  const page = localStorage.getItem('page');
  let resultPg = page;
  if (!page) {
    resultPg = '1';
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
            return currentPage;
          },
        },
      },
    },
  },
});
