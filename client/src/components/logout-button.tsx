import React from 'react';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
  isLoggedInVar,
} from '../cache';

const LogoutButton = () => {
  const history = useHistory();
  const client = useApolloClient();
  return (
    <button
      style={{ padding: 0 }}
      data-testid="logout-button"
      type="button"
      className="btn btn-secondary p-2"
      onClick={() => {
        client.cache.evict({ fieldName: 'me' });
        client.resetStore();

        // Remove user details from localStorage.
        localStorage.removeItem('token');
        localStorage.removeItem('page');
        localStorage.removeItem('userId');
        isLoggedInVar(false);
        history.push('/login');
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
