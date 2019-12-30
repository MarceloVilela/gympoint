import React from 'react';
import PropTypes from 'prop-types';

import { Wrap } from './styles';

export default function FormLayout({ children }) {
  return <Wrap>{children}</Wrap>;
}

FormLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
};
