import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';
import Checkin from '~/components/Checkin';
import Button from '~/components/Button';
import { Container, List } from './styles';

function CheckinIndex() {
  const { id } = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [fineshed, setFineshed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (page = 1) => {
      if (fineshed) return;
      try {
        const url = `/students/${id}/checkins?page=${page}`;
        const response = await api.get(url);
        const { docs, pages } = response.data;
        let { total } = response.data;
        setData(data =>
          data.concat(docs).map(item => ({ ...item, counter: total-- }))
        );
        setPage(page);
        setRefreshing(false);
        if (page === pages) {
          setFineshed(true);
        }
      } catch (error) {
        alert(error);
      }
    },
    [fineshed, id]
  );

  // when starting page
  useEffect(() => {
    load();
  }, [load]);

  // infinite scroll
  const loadMore = () => {
    const nextPage = page + 1;
    load(nextPage);
  };

  // pull to refresh
  const refreshList = () => {
    // reset
    setData([]);
    setPage(1);
    setFineshed(false);
    setRefreshing(true);

    // load again
    load();
  };

  return (
    <Container>
      <Button>Novo check-in</Button>

      <List
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Checkin data={item} />}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        onRefresh={refreshList}
        refreshing={refreshing}
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
