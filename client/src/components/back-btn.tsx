import React from 'react';
import { Link } from 'react-router-dom';

export default function BackBtn() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
}
