import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import uuid from 'react-uuid';
import Logout from '../logout-button';
import PersonItem from './person-item';
import authLink from '../auth-link';

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

const People = () => {
  const { loading, error, data } = useQuery(
    PEOPLE_QUERY,
    { context: authLink },
  );

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
      </div>
      <h4 className="display-4 my-3">People</h4>
      <>
        {data.people.map((person) => (
          <PersonItem key={`${person.name}-${uuid()}`} person={person} />
        ))}
      </>

    </>
  );
};

export default People;
