import React from 'react';
import PropTypes from 'prop-types';

import { Wrap } from './styles';

export default function List({ children }) {
  return (
    <Wrap>
      <>{children}</>
    </Wrap>
  );
}

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
