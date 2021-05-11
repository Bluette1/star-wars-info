import React from 'react';
import PropTypes from 'prop-types';
import AddFavourite from './add-favourite';
import RemoveFavourite from './remove-favourite';

export default function FavouriteContainer({
  isInFavourites, name, handleFavouriteChange,
}) {
  return (
    <div>
      {isInFavourites ? (
        <RemoveFavourite name={name} handleFavouriteChange={handleFavouriteChange} />
      ) : (
        <AddFavourite name={name} handleFavouriteChange={handleFavouriteChange} />
      )}
    </div>
  );
}

FavouriteContainer.propTypes = {
  name: PropTypes.string.isRequired,
  isInFavourites: PropTypes.bool.isRequired,
  handleFavouriteChange: PropTypes.func.isRequired,
};
