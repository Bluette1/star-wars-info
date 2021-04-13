import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import QueryString from 'query-string';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import LinkItem from './link-item';
import authLink from '../auth-link';

const PERSON_QUERY = gql`
  query PersonDetails($name: String!) {
    personDetails(name: $name) {
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

const Person = ({ location: searchParams }) => {
  const parsedParams = QueryString.parse(searchParams.search);
  const {
    search,
  } = parsedParams;

  const { loading, error, data } = useQuery(PERSON_QUERY, {
    variables: { name: search }, context: authLink,
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
  } = data.personDetails;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Name: </span>
        {name}
      </h1>
      <h4 className="mb-3">Person Details</h4>
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
      <ul className="list-group">
        <li className="list-group-item">
          Eye color:&nbsp;
          {eyeColor}
        </li>
        <li className="list-group-item">
          Hair color:&nbsp;
          {hairColor}
        </li>
        <li className="list-group-item">
          Skin color:&nbsp;
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
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Person;
