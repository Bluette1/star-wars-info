import React from 'react';
import PropTypes from 'prop-types';

export default function PagesBtnGroup({ pg, getPage }) {
  const page = pg;
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {page > 1 ? (
        <button
          type="button"
          className="btn
        btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            getPage(page - 1);
          }}
        >
          Prev
        </button>
      ) : null}
      <button type="button" className="btn btn-secondary">
        {`${page}`}
      </button>
      {page < 9 ? (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            getPage(page + 1);
          }}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}

PagesBtnGroup.propTypes = {
  pg: PropTypes.number.isRequired,
  getPage: PropTypes.func.isRequired,
};
