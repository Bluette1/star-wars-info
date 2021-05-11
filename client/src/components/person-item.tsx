import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavouriteContainer from './favourite-container';
import useFavourites from '../hooks/useFavourites';
import { favouritePeopleVar } from '../cache';

const PersonItem = ({
  person: {
    name, height, gender, homeworld,
  },
}) => {
  const {
    isFavourite: isInFavourites,
  } = useFavourites(favouritePeopleVar);
  const [isInFavouritesState, setIsInFavouritesState] = useState(isInFavourites(name));

  // const favourite = () => (isInFavouritesState ? '&favourite=true' : '');
  // const [favouriteState, setFavouriteState] = useState(favourite());

  const handleFavouriteChange = () => {
    setIsInFavouritesState(!isInFavouritesState);
    // setFavouriteState(favourite());
  };

  return (
    <div className="card card-body mb-3">
      <div className="row d-flex">
        <div className="col-md-6">
          <p>
            Name:&nbsp;
            <span>{name}</span>
          </p>
          <p>
            Height:&nbsp;
            {height}
          </p>
          <p>
            Gender:&nbsp;
            {gender}
          </p>
          <p>
            Homeworld:&nbsp;
            {homeworld}
          </p>
        </div>
        <div className="col-md-6 d-md-flex justify-content-md-between">
          <FavouriteContainer
            handleFavouriteChange={handleFavouriteChange}
            isInFavourites={isInFavouritesState}
            name={name}
          />
          <div>
            {isInFavouritesState
              ? (
                <Link to={`/person/?search=${name}&favourite=true`} className="btn btn-secondary">
                  Person Details
                </Link>
              ) : (
                <Link to={`/person/?search=${name}`} className="btn btn-secondary">
                  Person Details
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

PersonItem.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PersonItem;
