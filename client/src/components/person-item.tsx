import React from 'react';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import PropTypes from 'prop-types';
import AddFavourite from './add-favourite';
import RemoveFavourite from './remove-favourite';
import { favouritePeopleVar } from '../cache';

const PersonItem = ({
  person: {
    name, height, gender, homeworld,
  },
}) => {
  const favoritePeople = useReactiveVar(favouritePeopleVar);
  const isInFavourites = name ? favoritePeople.includes(name) : false;
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Name:&nbsp;
            <span>{name}</span>
          </h4>
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
          <div>
            {isInFavourites ? (
              <RemoveFavourite name={name} />
            ) : (
              <AddFavourite name={name} />
            )}
          </div>
          <div className="col-md-3">
            <Link to={`/person/?search=${name}`} className="btn btn-secondary">
              Person Details
            </Link>
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
