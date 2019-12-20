import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';
import Help from '~/components/Help';
import Button from '~/components/Button';
import { Container, List } from './styles';

function HelpIndex({ navigation }) {
  const { id } = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [fineshed, setFineshed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (page = 1) => {
      if (fineshed) return;
      try {
        const url = `/students/${id}/help-orders?page=${page}`;
        const response = await api.get(url);
        const { docs, pages } = response.data;
        setData(data => data.concat(docs));
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HelpNew');
        }}
      >
        <Button>Novo pedido de auxílio{data.length}</Button>
      </TouchableOpacity>
      <List
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Help data={item} navigation={navigation} />}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        onRefresh={refreshList}
        refreshing={refreshing}
      />
    </Container>
  );
}

export default withNavigationFocus(HelpIndex);
