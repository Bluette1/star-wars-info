import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddFavourite from './add-favourite';
import RemoveFavourite from './remove-favourite';

const PersonItem = ({
  person: {
    name, height, gender, homeworld,
  }, isInFavourites,
}) => {
  const favourite = isInFavourites ? '&favourite=true' : '';

  return (
    <div className="card card-body mb-3">
      <div className="row d-flex">
        <div className="col-md-6">
          <h6>
            Name:&nbsp;
            <span>{name}</span>
          </h6>
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
          <div>
            {isInFavourites ? (
              <RemoveFavourite name={name} />
            ) : (
              <AddFavourite name={name} />
            )}
          </div>
          <div>
            <Link to={`/person/?search=${name}${favourite}`} className="btn btn-secondary">
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
  isInFavourites: PropTypes.bool.isRequired,
};

export default PersonItem;
