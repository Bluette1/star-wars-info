import React from 'react';
import heartred from './heart-red.png';

export default function Favourite() {
  return (
    <div className="d-flex m-md-0 m-1">
      Is a favourite:&nbsp;
      <img
        className="mt-n2"
        role="presentation"
        src={heartred}
        alt="Like icon"
      />
    </div>
  );
}
