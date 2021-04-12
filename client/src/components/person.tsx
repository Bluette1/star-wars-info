import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import LinkItem from './link-item';

const PERSON_QUERY = gql`
  query Person($name: String!) {
    person(name: $name) {
      name
      height
      gender
      homeworld
      eyeColor
      hairColor
      skinColor
      films
      species
      vehicles
      starships
      url
    }
  }
`;

const Person = ({ match: { params } }) => {
  const personName = params.name;
  const { loading, error, data } = useQuery(PERSON_QUERY, {
    variables: { name: personName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error :( ${error}`}</p>;

  const {
    name,
    height,
    gender,
    homeworld,
    eyeColor,
    hairColor,
    skinColor,
    films,
    species,
    vehicles,
    starships,
    url,
  } = data.person;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Name: </span>
        {name}
      </h1>
      <h4 className="mb-3">Person Details</h4>
      <p>{height}</p>
      <p>{gender}</p>
      <p>{homeworld}</p>
      <ul className="list-group">
        <li className="list-group-item">
          Eye color:
          {eyeColor}
        </li>
        <li className="list-group-item">
          Hair color:
          {hairColor}
        </li>
        <li className="list-group-item">
          Skin color:
          {skinColor}
        </li>
      </ul>
      <h4 className="my-3">More details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Films:
          {films.map((film) => (
            <LinkItem key={`film-${uuid()}`} link={film} />
          ))}
        </li>
        <li className="list-group-item">
          Species:
          {species.map((thisSpecies) => (
            <LinkItem key={`species-${uuid()}`} link={thisSpecies} />
          ))}
        </li>
        <li className="list-group-item">
          Vehicles:
          {vehicles.map((vehicle) => (
            <LinkItem key={`vehicle-${uuid()}`} link={vehicle} />
          ))}
        </li>

        <li className="list-group-item">
          Starships:
          {starships.map((starship) => (
            <LinkItem key={`vehicle-${uuid()}`} link={starship} />
          ))}
        </li>
      </ul>
      <h4 className="mb-3">
        Person Url:
        <LinkItem link={url} />
      </h4>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
};

Person.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Person;
