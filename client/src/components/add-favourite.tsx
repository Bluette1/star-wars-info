import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import heartgray from './heart-gray.png';
import { favouritePeopleVar, isLoggedInVar } from '../cache';
import useFavourites from '../hooks/useFavourites';

const POST_PERSON = gql`
  mutation PostPerson($name: String!) {
    postPersonWithName(name: $name) {
      id
      personId
      name
      postedById
    }
  }
`;

export default function AddFavourite({ name, handleFavouriteChange }) {
  const {
    addFavourite,
  } = useFavourites(favouritePeopleVar);
  const isLoggedIn = isLoggedInVar();

  const [postPerson, { loading, error }] = useMutation(POST_PERSON);
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;

  return (
    <div className="d-flex p-3">
      Like:&nbsp;
      <img
        className="mt-n2"
        style={{ cursor: 'pointer' }}
        role="presentation"
        src={heartgray}
        alt="Like icon"
        onClick={() => {
          if (isLoggedIn) {
            postPerson({ variables: { name } });
          }
          addFavourite(name);
          handleFavouriteChange();
        }}
      />
    </div>
  );
}

AddFavourite.propTypes = {
  name: PropTypes.string.isRequired,
  handleFavouriteChange: PropTypes.func.isRequired,
};
