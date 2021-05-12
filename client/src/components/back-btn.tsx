import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackBtn() {
  const history = useHistory();
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        className="btn btn-secondary"
        type="submit"
        onClick={() => {
          history.push('/');
          window.location.reload();
        }}
      >
        Back
      </button>
    </div>
  );
}
