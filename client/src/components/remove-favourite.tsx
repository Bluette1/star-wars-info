import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import heartred from './heart-red.png';
import { favouritePeopleVar, isLoggedInVar } from '../cache';
import useFavourites from '../hooks/useFavourites';

const DELETE_PERSON = gql`
  mutation deletePerson($name: String!) {
    deletePersonWithName(name: $name) {
      name
    }
  }
`;

export default function RemoveFavourite({ name, handleFavouriteChange }) {
  const {
    deleteFavourite,
  } = useFavourites(favouritePeopleVar);

  const isLoggedIn = isLoggedInVar();

  const [deletePerson, { loading, error }] = useMutation(DELETE_PERSON);
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;
  return (
    <div className="d-flex">
      Unlike:&nbsp;
      <img
        className="mt-n2"
        role="presentation"
        src={heartred}
        alt="Like icon"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (isLoggedIn) {
            deletePerson({ variables: { name } });
          }
          deleteFavourite(name);
          handleFavouriteChange();
        }}
      />
    </div>
  );
}

RemoveFavourite.propTypes = {
  name: PropTypes.string.isRequired,
  handleFavouriteChange: PropTypes.func.isRequired,
};
