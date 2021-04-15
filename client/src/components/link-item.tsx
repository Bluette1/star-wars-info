import React from 'react';
import PropTypes from 'prop-types';

const LinkItem = ({ link }) => (
  <h6>
    {`<${link}>`}
  </h6>
);

LinkItem.propTypes = {
  link: PropTypes.string.isRequired,
};

export default LinkItem;
