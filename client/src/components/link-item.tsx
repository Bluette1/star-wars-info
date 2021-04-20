import React from 'react';
import PropTypes from 'prop-types';

const LinkItem = ({ link }) => (
  <p>
    {`<${link}>`}
  </p>
);

LinkItem.propTypes = {
  link: PropTypes.string.isRequired,
};

export default LinkItem;
