import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import uuid from 'react-uuid';
import { favouritePeopleVar } from '../cache';
import Logout from './logout-button';
import PageInput from './page-input';
import PersonItem from './person-item';
import authLink from '../auth-link';
import PagesBtnGroup from './pages-btn-group';

require('isomorphic-fetch');

const PEOPLE_QUERY = gql`
  query People($page: Int) {
    people(page: $page) {
      name
      height
      gender
      homeworld
    }
  }
`;
const CURR_PAGE = gql`
  query currentPage {
    currPage @client
  }
`;

export const MY_PEOPLE_QUERY = gql`
  query MyPeople {
    myPeople {
      id
      personId
      name
      postedById
    }
  }
`;

const People = () => {
  const pageData = useQuery(CURR_PAGE);
  const { currPage } = pageData.data;
  const {
    loading: loadingPeopleQuery,
    error: peopleQueryError,
    data: peopleData,
  } = useQuery(PEOPLE_QUERY, {
    context: authLink,
    variables: {
      page: parseInt(currPage, 10),
    },
  });
  if (loadingPeopleQuery) return <p>Loading...</p>;
  if (peopleQueryError) return <p>{`Error :( ${peopleQueryError}`}</p>;
  const { people } = peopleData;

  const {
    loading: loadingMyPeopleQuery,
    error: myPeopleQueryError,
    data: { myPeople },
  } = useQuery(MY_PEOPLE_QUERY, {
    context: authLink,
  });

  if (loadingMyPeopleQuery) return <p>Loading...</p>;
  if (myPeopleQueryError) return <p>{`Error :( ${peopleQueryError}`}</p>;

  const favouritePeople: string[] = [];
  myPeople.forEach((person) => favouritePeople.push(person.name));

  favouritePeopleVar(favouritePeople);

  return (
    <>
      <div
        style={{
          padding: '5px',
          textAlign: 'center',
          borderRadius: '50%',
        }}
      >
        <Logout />
        <PageInput />
        <PagesBtnGroup />
      </div>
      <h4 className="display-4 my-3">People</h4>
      <>
        {people.map((person) => (
          <PersonItem key={`${person.name}-${uuid()}`} person={person} />
        ))}
      </>
      <div style={{ textAlign: 'center' }} className="mb-3">
        <PagesBtnGroup />
      </div>
    </>
  );
};

export default People;
