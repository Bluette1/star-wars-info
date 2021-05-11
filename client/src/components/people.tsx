import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { favouritePeopleVar, peopleVar } from '../cache';
import Page from './page';
import authLink from '../auth-link';
import usePeopleContent from '../hooks/usePeopleContent';
import useFavourites from '../hooks/useFavourites';

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

const MY_PEOPLE_QUERY = gql`
  query MyPeople {
    myPeople {
      name
    }
  }
`;

const People = ({
  pageData,
  myPeopleData,
}) => {
  if (pageData.error || myPeopleData.error) { return (<p>Error...Please try again</p>); }
  if (
    pageData.loading
    || myPeopleData.loading) {
    return <p>Loading...</p>;
  }

  const {
    setFavourites,
  } = useFavourites(favouritePeopleVar);

  const { getPeople, setPeople } = usePeopleContent(peopleVar);

  setPeople(1, pageData.people);

  const favouritePeople: string[] = [];
  const { myPeople } = myPeopleData;
  myPeople.forEach((person) => favouritePeople.push(person.name));
  setFavourites(favouritePeople);
  return (
    <Page
      refetch={pageData.refetch}
      setPeople={setPeople}
      getPeople={getPeople}
    />
  );
};

export default compose(
  graphql(MY_PEOPLE_QUERY, {
    name: 'myPeopleData',
    options: {
      context: authLink,
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'pageData',
    options: {
      context: authLink,
      variables: {
        page: 1,
      },
    },
  }),
)(People);

People.propTypes = {
  pageData: PropTypes.objectOf(PropTypes.any).isRequired,
  myPeopleData: PropTypes.objectOf(PropTypes.any).isRequired,
};
