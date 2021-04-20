import React, { Fragment } from 'react';
import { gql, useReactiveVar } from '@apollo/client';
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

// const PEOPLE_FETCHED = gql`
//   query peopleVar {
//     peopleCurrent @client
//   }
// `;

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
  // const { data: { peopleCurrent } } = useQuery(PEOPLE_FETCHED);let refetchPeople;
  let refetchPeople;
  const handlePageChange = async (page) => {
    localStorage.setItem('page', page as string);
    currentPage(`${page}`);
    const { data: people } = await refetchPeople({
      variables: { page: currentPage() },
    });
    peopleVar(people);
    window.location.reload();
  };

  const isFavourite = (name) => {
    const favoritePeople = useReactiveVar(favouritePeopleVar);
    const isInFavourites = name ? favoritePeople.includes(name) : false;
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
  peopleVar(people);

  const favouritePeople: string[] = [];
  const { myPeople } = myPeopleData;
  myPeople.forEach((person) => favouritePeople.push(person.name));
  favouritePeopleVar([...favouritePeopleVar(), ...favouritePeople]);
  const peopleCurrent = useReactiveVar(peopleVar);

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
        <PageInput page={parseInt(currentPage(), 10)} callback={handlePageChange} />
        <PagesBtnGroup page={parseInt(currentPage(), 10)} callback={handlePageChange} />
      </div>
      <h4 className="display-4 my-3">People</h4>
      <>
        {peopleCurrent.map((person) => (
          <PersonItem key={`${person.name}-${uuid()}`} person={person} isInFavourites={isFavourite(person.name)} />
        ))}
      </>
      <div style={{ textAlign: 'center' }} className="mb-3">
        <PagesBtnGroup page={parseInt(currentPage(), 10)} callback={handlePageChange} />
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
