import React from 'react';
import PropTypes from 'prop-types';

export default function PageInput({ page, callback }) {
  return (
    <div className="pb-5 mt-5">
      <label htmlFor="page-number">
        Search people by page:&nbsp;
        <input
          type="number"
          name="page-number"
          id="page-number"
          min="1"
          max="9"
          className="ml-3"
          placeholder={page}
        />
      </label>
      <input
        onClick={(e) => {
          e.preventDefault();
          const pageChosen = document.getElementById(
            'page-number',
          ) as HTMLInputElement;
          callback(pageChosen.value);
        }}
        type="button"
        value="Submit"
      />
    </div>
  );
}

PageInput.propTypes = {
  page: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
};
