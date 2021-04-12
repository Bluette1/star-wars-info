import React from 'react';
import Logout from '../logout-button';

export default function People() {
  return (
    <div>
      <div
        style={{
          padding: '5px',
          textAlign: 'center',
          borderRadius: '50%',
        }}
      >
        <Logout />
      </div>
    </div>
  );
}
