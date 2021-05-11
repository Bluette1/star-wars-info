import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { currentPage } from '../cache';
import PageComponent from './pageComponent';

const getPage = () => parseInt(currentPage(), 10);
export default function Page({
  favourites, getPeople, setPeople, refetch,
}) {
  const [page, setPage] = useState(getPeople());
  const handleRefetch = async () => {
    const { data: people } = await refetch({
      page: getPage(),
    });
    if (people) {
      setPeople(getPage(), people.people);
      setPage(people.people);
    }
  };

  const handlePageChange = async (pge) => {
    localStorage.setItem('page', pge as string);
    currentPage(`${pge}`);
    if (getPeople().length === 0) {
      handleRefetch();
    } else { setPage(getPeople()); }
  };
  return <PageComponent favourites={favourites} page={page} handlePageChange={handlePageChange} />;
}

Page.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
  getPeople: PropTypes.func.isRequired,
  setPeople: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
