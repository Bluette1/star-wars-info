import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import uuid from 'react-uuid';
import Logout from '../logout-button';
import PageInput from './page-input';
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
const CURR_PAGE = gql`
query currentPage {
  currPage @client
}
`;
const People = () => {
  const pageData = useQuery(CURR_PAGE);
  const { currPage } = pageData.data;
  console.log('currPage', currPage);
  const { loading, error, data } = useQuery(
    PEOPLE_QUERY,
    { context: authLink, variables: { page: parseInt(currPage, 10) } },
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
        <PageInput />
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
