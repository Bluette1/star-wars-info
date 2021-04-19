import React from 'react';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import PropTypes from 'prop-types';
import heartred from './heart-red.png';
import { favouritePeopleVar } from '../cache';

const DELETE_PERSON = gql`
  mutation deletePerson($name: String!) {
    deletePersonWithName(name: $name) {
      name
    }
  }
`;

export default function RemoveFavourite({ name }) {
  const favouritePeople = useReactiveVar(favouritePeopleVar);
  const [deletePerson, { loading, error }] = useMutation(DELETE_PERSON, {
    onCompleted: ({ deletePersonWithName }) => {
      if (deletePersonWithName) {
        favouritePeopleVar(
          favouritePeople.filter((currName) => currName !== name),
        );
      }
    },
  });
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
          deletePerson({ variables: { name } });
        }}
      />
    </div>
  );
}

RemoveFavourite.propTypes = {
  name: PropTypes.string.isRequired,
};
