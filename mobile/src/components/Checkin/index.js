import React, { useMemo } from 'react';
import { parseISO, formatRelative, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
    });
  }, [data.created_at]);

  return (
    <Container past={data.past}>
      <Left>
        <Name>Check-in #{data.counter}</Name>
      </Left>

      <Time>{dateParsed}</Time>
    </Container>
  );
}
