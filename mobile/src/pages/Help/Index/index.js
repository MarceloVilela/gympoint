import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Help from '~/components/Help';
import { List } from './styles';

function HelpIndex({ navigation }) {
  const { id } = useSelector(state => state.auth);

  // list help-order
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fineshed, setFineshed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (pageNumber = 1) => {
      if (fineshed) return;
      setLoading(true);
      try {
        const url = `/students/${id}/help-orders?page=${pageNumber}`;
        const response = await api.get(url);
        const { docs, pages } = response.data;
        setData(list => list.concat(docs));
        setPage(pageNumber);
        setRefreshing(false);
        if (pageNumber === pages) {
          setFineshed(true);
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
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

  const handleOnPress = () => navigation.navigate('HelpNew');

  return (
    <Container loading={loading}>
      <Button onPress={handleOnPress}>Novo pedido de auxílio</Button>

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

HelpIndex.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
    answer: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(HelpIndex);
