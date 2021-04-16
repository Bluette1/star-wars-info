import React from 'react';
import { gql, useMutation } from '@apollo/client';
import heartred from './heart-red.png';
import { favouritePeopleVar } from '../cache';

const DELETE_PERSON = gql`
    mutation deletePerson($name: String!) {
      deletePersonWithName(name: $name) {
        id
        personId
        name
        postedById
      }
    }
  `;

export default function RemoveFavourite({ name }) {
  const [deletePerson, { loading, error }] = useMutation(DELETE_PERSON, {
    onCompleted: ({ deletePersonWithName }) => {
      if (deletePersonWithName) {
        favouritePeopleVar(favouritePeopleVar().filter((currName) => currName !== name));
      }
    },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error occurred</p>;
  return (
    <div className="d-flex">
      Like:
      <img src={heartred} alt="Like icon" onClick={() => { deletePerson(); }} />
    </div>
  );
}
