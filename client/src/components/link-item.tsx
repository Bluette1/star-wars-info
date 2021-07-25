import React from 'react';
import PropTypes from 'prop-types';

export const getId = (url) => {
  const splitArray = url.split('/');
  return parseInt(splitArray[splitArray.length - 2], 10);
};

export const LinkItem = ({ link }) => (
  <a style={{ textDecoration: 'underline' }} href={link} target="_blank" rel="noreferrer">
    {`[${getId(link)}]`}
  </a>
);

LinkItem.propTypes = {
  link: PropTypes.string.isRequired,
};
