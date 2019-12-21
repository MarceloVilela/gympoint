import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';
import Container from '~/components/Container';
import api from '~/services/api';
import { Form, FormInput } from './styles';

export default function SignIn({ navigation }) {
  const { id } = useSelector(state => state.auth);
  const [question, setQuestion] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
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
    setLoadingSubmit(false);
  };

  return (
    <Container scrollEnabled>
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

        <Button onPress={handleSubmit} loading={loadingSubmit}>
          Enviar pedido
        </Button>
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
