import { InMemoryCache, makeVar } from '@apollo/client';

console.log('token', localStorage.getItem('token'));
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

const getPage = () => {
  const page = localStorage.getItem('page');
  let resultPg;
  if (!page) {
    resultPg = 1;
  }
  return makeVar <number>(resultPg);
};

export const currentPage = getPage();

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
