import React from 'react';
import PropTypes from 'prop-types';
import indicator from '~/assets/load.gif';

import { Wrap, WrapLoading, Image } from './styles';

export default function Container({ children, loading }) {
  return (
    <Wrap>
      <>{children}</>
      {loading && (
        <WrapLoading>
          <Image src={indicator} alt="Loading" />
        </WrapLoading>
      )}
    </Wrap>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  loading: PropTypes.bool,
};

Container.defaultProps = {
  loading: false,
};
