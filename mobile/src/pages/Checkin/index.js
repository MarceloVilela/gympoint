import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';
import Checkin from '~/components/Checkin';
import Button from '~/components/Button';
import { Container, List } from './styles';

function CheckinIndex({ isFocused }) {
  const { id } = useSelector(state => state.auth);
  const [records, setRecords] = useState([]);

  async function loadRecords() {
    const response = await api.get(`/students/${id}/checkins`);
    const _checkins = response.data.map((item, key) => ({
      ...item,
      number: key + 1,
    }));
    setRecords(_checkins);
  }

  useEffect(() => {
    if (isFocused) {
      loadRecords();
    }
  }, [isFocused, loadRecords]);

  return (
    <Container>
      <Button>Novo check-in</Button>

      <List
        data={records}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Checkin onCancel={() => handleCancel(item.id)} data={item} />
        )}
        inverted
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
      />
    </Container>
  );
}

CheckinIndex.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-pizza" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(CheckinIndex);
