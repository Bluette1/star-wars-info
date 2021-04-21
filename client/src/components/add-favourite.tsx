import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import heartgray from './heart-gray.png';
import { favouritePeopleVar } from '../cache';
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

export default function AddFavourite({ name }) {
  const {
    addFavourite,
  } = useFavourites(favouritePeopleVar);
  const [postPerson, { loading, error }] = useMutation(POST_PERSON, {
    onCompleted: ({ postPersonWithName }) => {
      if (postPersonWithName) {
        addFavourite(name);
      }
    },
  });
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
          postPerson({ variables: { name } });
        }}
      />
    </div>
  );
}

AddFavourite.propTypes = {
  name: PropTypes.string.isRequired,
};
