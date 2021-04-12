import React from 'react';
import { Link } from 'react-router-dom';

export default function PersonItem({
  person: {
    name, height, gender, homeworld,
  },
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Name:&nbsp;
            <span>{name}</span>
          </h4>
          <p>{height}</p>
          <p>{gender}</p>
          <p>{homeworld}</p>
        </div>
        <div className="col-md-3">
          <Link to={`/person/?search=${name}`} className="btn btn-secondary">
            Person Details
          </Link>
        </div>
      </div>
    </div>
  );
}
