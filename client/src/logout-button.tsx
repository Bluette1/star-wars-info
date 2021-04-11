import React from 'react';
import { useApolloClient } from '@apollo/client';

import { isLoggedInVar } from './cache';

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <button
      style={{ padding: 0 }}
      data-testid="logout-button"
      type="button"
      onClick={() => {
        client.cache.evict({ fieldName: 'me' });
        client.cache.gc();

        // Remove user details from localStorage.
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        isLoggedInVar(false);
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
