import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Left, Name, Time } from './styles';

export default function Checkin({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
    });
  }, [data.created_at]);

  return (
    <Container>
      <Left>
        <Name>Check-in #{data.counter}</Name>
      </Left>

      <Time>{dateParsed}</Time>
    </Container>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
    counter: PropTypes.number,
  }).isRequired,
};
