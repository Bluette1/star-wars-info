import React from 'react';
import PropTypes from 'prop-types';

const LinkItem = ({ link }) => (
  <a href={link} target="_blank" rel="noreferrer">
    {`<${link}>`}
  </a>
);

LinkItem.propTypes = {
  link: PropTypes.string.isRequired,
};

export default LinkItem;
