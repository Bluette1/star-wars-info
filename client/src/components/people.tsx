import React, { Fragment } from 'react';
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

const People = ({ peopleData, myPeopleData }) => {
  const { getPeople: allPeople, setPeople } = usePeopleContent(peopleVar);
  const {
    getFavourites: favourites, setFavourites,
  } = useFavourites(favouritePeopleVar);

  let refetchPeople;
  const handlePageChange = async (page) => {
    localStorage.setItem('page', page as string);
    currentPage(`${page}`);
    const { data: people } = await refetchPeople({
      variables: { page: getPage() },
    });
    setPeople(people);
    window.location.reload();
  };

  const isFavourite = (name) => {
    const isInFavourites = name ? favourites.includes(name) : false;
    return isInFavourites;
  };

  if (peopleData.error || myPeopleData.error) {
    return (<p>Error...</p>);
  }
  if (peopleData.loading || myPeopleData.loading) {
    return <p>Loading...</p>;
  }

  const { people, refetch } = peopleData;
  refetchPeople = refetch;
  setPeople(people);

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
        <PageInput page={getPage()} refetch={handlePageChange} />
        <PagesBtnGroup page={getPage()} refetch={handlePageChange} />
      </div>
      <h4 className="display-4 my-3">People</h4>
      <>
        {allPeople.map((person) => (
          <PersonItem key={`${person.name}-${uuid()}`} person={person} isInFavourites={isFavourite(person.name)} />
        ))}
      </>
      <div style={{ textAlign: 'center' }} className="mb-3">
        <PagesBtnGroup page={getPage()} refetch={handlePageChange} />
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
        page: getPage(),
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
