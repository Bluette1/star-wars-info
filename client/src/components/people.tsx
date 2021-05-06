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
  page1, page2, page3, page4, page5, page6, page7, page8, page9,
  myPeopleData,
}) => {
  let error = false;
  const err = () => {
    if (page1.error
      || page2.error
      || page3.error
      || page4.error
      || page5.error
      || page6.error
      || page7.error
      || page8.error
      || page9.error
       || myPeopleData.error) {
      error = true;
    }
    return error;
  };

  if (err()) {
    window.location.reload();
    setTimeout(() => {
      if (err()) { return (<p>Error...Please try again</p>); }
      return null;
    }, 3000);
  }
  if (
    page1.loading
    || page2.loading
    || page3.loading
    || page4.loading
    || page5.loading
    || page6.loading
    || page7.loading
    || page8.loading
    || page9.loading
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

  const allPages = {
    1: page1.people,
    2: page2.people,
    3: page3.people,
    4: page4.people,
    5: page5.people,
    6: page6.people,
    7: page7.people,
    8: page8.people,
    9: page9.people,
  };

  setPeople(allPages);
  const [page, setPage] = useState(getPeople());
  const handlePageChange = async (pge) => {
    localStorage.setItem('page', pge as string);
    currentPage(`${pge}`);
    setPage(getPeople());
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
  graphql(PEOPLE_QUERY, {
    name: 'page1',
    options: {
      context: authLink,
      variables: {
        page: 1,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page2',
    options: {
      context: authLink,
      variables: {
        page: 2,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page3',
    options: {
      context: authLink,
      variables: {
        page: 3,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page4',
    options: {
      context: authLink,
      variables: {
        page: 4,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page5',
    options: {
      context: authLink,
      variables: {
        page: 5,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page6',
    options: {
      context: authLink,
      variables: {
        page: 6,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page7',
    options: {
      context: authLink,
      variables: {
        page: 7,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page8',
    options: {
      context: authLink,
      variables: {
        page: 8,
      },
    },
  }),
  graphql(PEOPLE_QUERY, {
    name: 'page9',
    options: {
      context: authLink,
      variables: {
        page: 9,
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
  page1: PropTypes.objectOf(PropTypes.any).isRequired,
  page2: PropTypes.objectOf(PropTypes.any).isRequired,
  page3: PropTypes.objectOf(PropTypes.any).isRequired,
  page4: PropTypes.objectOf(PropTypes.any).isRequired,
  page5: PropTypes.objectOf(PropTypes.any).isRequired,
  page6: PropTypes.objectOf(PropTypes.any).isRequired,
  page7: PropTypes.objectOf(PropTypes.any).isRequired,
  page8: PropTypes.objectOf(PropTypes.any).isRequired,
  page9: PropTypes.objectOf(PropTypes.any).isRequired,
  myPeopleData: PropTypes.objectOf(PropTypes.any).isRequired,
};
