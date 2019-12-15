import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';
import Help from '~/components/Help';
import Button from '~/components/Button';
import { Container, List } from './styles';

function HelpIndex({ navigation, isFocused }) {
  const { id } = useSelector(state => state.auth);
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    try {
      const response = await api.get(`/students/${id}/help-orders?page=1`);
      // .reverse();
      setAppointments(response.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused, loadAppointments]);

  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HelpNew');
        }}
      >
        <Button>Novo pedido de auxílio</Button>
      </TouchableOpacity>
      <List
        data={appointments}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Help data={item} navigation={navigation} />}
        inverted
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
      />
    </Container>
  );
}

export default withNavigationFocus(HelpIndex);
