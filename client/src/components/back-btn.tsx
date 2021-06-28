import React from 'react';

export default function BackBtn() {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        className="btn btn-secondary"
        type="submit"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Back
      </button>
    </div>
  );
}
