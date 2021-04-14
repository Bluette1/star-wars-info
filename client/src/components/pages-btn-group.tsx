import React from 'react';
import { currentPage } from '../cache';

export default function PagesBtnGroup() {
  const currPage = parseInt(currentPage(), 10);
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn
        btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          currentPage(`${currPage - 1}`);
        }}
      >
        Prev
      </button>
      <button type="button" className="btn btn-secondary">
        {`${currPage}`}
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          currentPage(`${currPage + 1}`);
        }}
      >
        Next
      </button>
    </div>
  );
}
