import React from 'react';
import { currentPage } from '../cache';

export default function PageInput() {
  return (
    <div>
      <label htmlFor="page-number">
        <input type="number" name="page-number" id="page-number" />
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
