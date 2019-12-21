import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Container from '~/components/Container';
import {
  Scroll,
  MessageList,
  ContainerMessage,
  Header,
  HeaderLabel,
  Time,
  Body,
} from './styles';

export default function HelpDetails({ navigation, isFocused }) {
  const helpOrder = navigation.getParam('helpOrderData');

  return (
    <Container scrollEnabled>
      <MessageList>
        <ContainerMessage>
          <Header>
            <HeaderLabel>PERGUNTA</HeaderLabel>
            <Time>{helpOrder.created_at_parsed}</Time>
          </Header>
          <Body>{helpOrder.question}</Body>
        </ContainerMessage>

        {helpOrder.answer && (
          <ContainerMessage>
            <Header>
              <HeaderLabel>RESPOSTA</HeaderLabel>
            </Header>
            <Body>{helpOrder.answer}</Body>
          </ContainerMessage>
        )}
      </MessageList>
    </Container>
  );
}

HelpDetails.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpIndex');
      }}
    >
      <Icon name="chevron-left" size={20} color="#444" />
    </TouchableOpacity>
  ),
});
