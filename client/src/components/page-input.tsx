import React from 'react';
import { currentPage } from '../cache';

export default function PageInput() {
  return (
    <div className="pb-5 mt-5">
      <label htmlFor="page-number">
        Search people by page:&nbsp;
        <input
          type="number"
          name="page-number"
          id="page-number"
          min="1"
          max="82"
          className="ml-3"
          placeholder="1"
        />
      </label>
      <input
        onClick={(e) => {
          e.preventDefault();
          const pageChosen = document.getElementById(
            'page-number',
          ) as HTMLInputElement;
          currentPage(parseInt(pageChosen.value, 10));
        }}
        type="button"
        value="Submit"
      />
    </div>
  );
}
