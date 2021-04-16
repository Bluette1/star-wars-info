import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import heartgray from './heart-gray.png';
import { favouritePeopleVar } from '../cache';

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
  const [postPerson, { loading, error }] = useMutation(POST_PERSON, {
    onCompleted: ({ postPersonWithName }) => {
      if (postPersonWithName) {
        favouritePeopleVar([...favouritePeopleVar(), name]);
      }
    },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;
  return (
    <div className="d-flex">
      Like:
      <img role="presentation" src={heartgray} alt="Like icon" onClick={() => { postPerson(); }} />
    </div>
  );
}

AddFavourite.propTypes = {
  name: PropTypes.string.isRequired,
};
