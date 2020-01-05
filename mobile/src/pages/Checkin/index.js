import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigationFocus } from "react-navigation";

import api from "~/services/api";
import Checkin from "~/components/Checkin";
import Button from "~/components/Button";
import Container from "~/components/Container";
import { List } from "./styles";

function CheckinIndex() {
  const { id } = useSelector(state => state.auth);
  const [loadingNew, setLoadingNew] = useState(false);

  // list checkins
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
        const url = `/students/${id}/checkins?page=${pageNumber}`;
        const response = await api.get(url);
        const { docs, pages } = response.data;
        let { total } = response.data;
        setData(list =>
          // eslint-disable-next-line no-plusplus
          list.concat(docs).map(item => ({ ...item, counter: total-- }))
        );
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

  const handleOnPress = async () => {
    try {
      setLoadingNew(true);
      const url = `/students/${id}/checkins`;
      await api.post(url);
      refreshList();
    } catch (error) {
      alert(error);
    }
    setLoadingNew(false);
  };

  return (
    <Container loading={loading}>
      <Button loading={loadingNew} onPress={handleOnPress}>
        Novo check-in
      </Button>

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
  tabBarLabel: "Check-ins",
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-pizza" size={20} color={tintColor} />
  )
};

export default withNavigationFocus(CheckinIndex);
