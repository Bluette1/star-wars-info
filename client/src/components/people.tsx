import React, { Fragment, useState } from 'react';
import { gql } from '@apollo/client';
import uuid from 'react-uuid';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { favouritePeopleVar, currentPage, peopleVar } from '../cache';
import Logout from './logout-button';
import PageInput from './page-input';
import PersonItem from './person-item';
import authLink from '../auth-link';
import PagesBtnGroup from './pages-btn-group';
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

const getPage = () => parseInt(currentPage(), 10);

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
  const { getPeople, setPeople } = usePeopleContent(peopleVar);

  const {
    getFavourites: favourites, setFavourites,
  } = useFavourites(favouritePeopleVar);

  const isFavourite = (name) => {
    const isInFavourites = name ? favourites.includes(name) : false;
    return isInFavourites;
  };

  setPeople(pageData.people);
  const [page, setPage] = useState(getPeople);
  const handleRefetch = async (pge) => {
    const { data: people } = await pageData.refetch({
      variables: { pge },
    });
    setPeople(people);
  };

  const handlePageChange = async (pge) => {
    localStorage.setItem('page', pge as string);
    currentPage(`${pge}`);
    handleRefetch(pge);
    setPage(getPeople);
  };

  const favouritePeople: string[] = [];
  const { myPeople } = myPeopleData;
  myPeople.forEach((person) => favouritePeople.push(person.name));
  setFavourites([...favouritePeopleVar(), ...favouritePeople]);

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
        <PageInput page={getPage()} getPage={handlePageChange} />
        <PagesBtnGroup page={getPage()} getPage={handlePageChange} />
      </div>
      <h4 className="display-4 my-3">People</h4>
      <>
        {page.length > 0 ? page.map((person) => (
          <PersonItem key={`${person.name}-${uuid()}`} person={person} isInFavourites={isFavourite(person.name)} />
        )) : null}
      </>
      <div style={{ textAlign: 'center' }} className="mb-3">
        <PagesBtnGroup page={getPage()} getPage={handlePageChange} />
      </div>
    </>
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
