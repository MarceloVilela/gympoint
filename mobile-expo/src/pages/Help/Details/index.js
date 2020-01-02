import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Container from '~/components/Container';
import {
  MessageList,
  ContainerMessage,
  Header,
  HeaderLabel,
  Time,
  Body,
} from './styles';

export default function HelpDetails({ navigation }) {
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

HelpDetails.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
    answer: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
