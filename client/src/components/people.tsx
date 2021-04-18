import React, { Fragment } from 'react';
import { gql } from '@apollo/client';
import uuid from 'react-uuid';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { favouritePeopleVar, currentPage } from '../cache';
import Logout from './logout-button';
import PageInput from './page-input';
import PersonItem from './person-item';
import authLink from '../auth-link';
import PagesBtnGroup from './pages-btn-group';

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

const People = ({ peopleData, myPeopleData }) => {
  if (peopleData.error || myPeopleData.error) {
    return (<p>Error...</p>);
  }
  if (peopleData.loading || myPeopleData.loading) {
    return <p>Loading...</p>;
  }
  const { people } = peopleData;
  const favouritePeople: string[] = [];
  const { myPeople } = myPeopleData;
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

export default compose(
  graphql(PEOPLE_QUERY, {
    name: 'peopleData',
    options: {
      context: authLink,
      variables: {
        page: parseInt(currentPage(), 10),
      },
    },
  }),
  graphql(MY_PEOPLE_QUERY, {
    name: 'myPeopleData',
    options: {
      context: authLink,
    },
  }),
)(People);

People.propTypes = {
  peopleData: PropTypes.objectOf(PropTypes.any).isRequired,
  myPeopleData: PropTypes.objectOf(PropTypes.any).isRequired,
};
