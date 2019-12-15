import React, { useMemo } from 'react';
import { parseISO, formatRelative, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Answered,
  Check,
  AnsweredLabel,
  Time,
  Body,
  Question,
} from './styles';

export default function Appointment({ data, navigation }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
    });
  }, [data.created_at]);

  const textLabel = useMemo(() => {
    return data.answer ? 'Respondido' : 'Sem resposta';
  }, [data.answer]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpDetails', { helpOrderData: data });
      }}
    >
      <Container>
        <Header>
          <Answered>
            <Check answered={!!data.answer} />
            <AnsweredLabel answered={!!data.answer}>{textLabel}</AnsweredLabel>
          </Answered>
          <Time>{dateParsed}</Time>
        </Header>
        <Body>
          <Question>{data.question}</Question>
        </Body>
      </Container>
    </TouchableOpacity>
  );
}
