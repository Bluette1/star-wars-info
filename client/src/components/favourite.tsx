import React from 'react';
import { gql, useMutation } from '@apollo/client';
import heartgray from './heart-gray.png';
const POST_PERSON = gql`
    mutation PostPerson($name: String!) {
      postPersonWithName(page: $page) {
        id
        personId
        name
        postedById
      }
    }
  `;

export default function Favourite({ person }) {
  
    const [postPerson, { loading, error }] = useMutation(POST_PERSON, {
      onCompleted: ({ postPersonWithName }) => {
        if (postPersonWithName) {
          // localStorage.setItem('token', signup.token as string);
          // localStorage.setItem('userId', signup.id as string);
          // isLoggedInVar(true);
        }
      },
    });
  return (
    <div className="d-flex">
      Like:
      <img src={heartgray} alt="Like icon" onClick={() => {postPerson()}} />
    </div>
  );
}
