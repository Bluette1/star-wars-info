import React from 'react';
import PropTypes from 'prop-types';
import AddFavourite from './add-favourite';
import RemoveFavourite from './remove-favourite';

export default function FavouriteContainer({ isInFavourites, name }) {
  return (
    <div>
      {isInFavourites ? (
        <RemoveFavourite name={name} />
      ) : (
        <AddFavourite name={name} />
      )}
    </div>
  );
}

FavouriteContainer.propTypes = {
  name: PropTypes.string.isRequired,
  isInFavourites: PropTypes.bool.isRequired,
};
