import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { currentPage } from '../cache';
import PageInput from './page-input';
import PersonItem from './person-item';
import PagesBtnGroup from './pages-btn-group';
import Logout from './logout-button';
import Login from './login-button';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const getPage = () => parseInt(currentPage(), 10);

export default function PageComponent({ page, handlePageChange }) {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <>
      <div
        style={{
          padding: '5px',
          textAlign: 'center',
          borderRadius: '50%',
        }}
      >
        {data.isLoggedIn ? <Logout /> : <Login />}
        <PageInput page={getPage()} getPage={handlePageChange} />
        <PagesBtnGroup pg={getPage()} getPage={handlePageChange} />
      </div>
      <h4 className="display-4 my-3">People</h4>
      <>
        {page.map((person) => (
          <PersonItem key={`${person.name}-${uuid()}`} person={person} />
        ))}
      </>
      <div style={{ textAlign: 'center' }} className="mb-3">
        <PagesBtnGroup pg={getPage()} getPage={handlePageChange} />
      </div>
    </>
  );
}

PageComponent.propTypes = {
  page: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
