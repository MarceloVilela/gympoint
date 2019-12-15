import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const { id } = useSelector(state => state.auth);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.post(`/students/${id}/help-orders`, {
        question,
      });

      if (response.data.id) {
        navigation.navigate('HelpIndex');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container>
      <Form>
        <FormInput
          autoCorrect={false}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          placeholder="Inclua seu pedido de auxílio"
          returnKeyType="next"
          value={question}
          onChangeText={setQuestion}
        />

        <SubmitButton loading={false} onPress={handleSubmit}>
          Enviar pedido
        </SubmitButton>
      </Form>
    </Container>
  );
}

SignIn.navigationOptions = ({ navigation }) => ({
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
