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

export const MY_PEOPLE = `
  query {
    myPeople {
      id
      personId
      name
      postedById
    }
  }
`;

const fetchFavourites = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: MY_PEOPLE,
    }),
  });

  const results = await res.json();
  const {
    data: { myPeople },
  } = results;
  console.log(myPeople);
  const favouritePeople: string[] = [];
  myPeople.forEach((person) => favouritePeople.push(person.name));

  favouritePeopleVar(favouritePeople);
  return results;
};

const People = () => {
  const pageData = useQuery(CURR_PAGE);
  const { currPage } = pageData.data;
  const { loading, error, data } = useQuery(PEOPLE_QUERY, {
    context: authLink,
    variables: { page: parseInt(currPage, 10) },
    onCompleted: ({ people }) => {
      if (people) {
        fetchFavourites().catch((err) => {
          console.log('Error: ', err);
        });
      }
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error :( ${error}`}</p>;

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
        {data.people.map((person) => (
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
