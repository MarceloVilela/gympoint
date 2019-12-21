import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, onPress, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Text>{children}</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  loading: false,
};
