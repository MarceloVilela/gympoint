import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px 30px 0 30px;
  background-color: #f3f3f3;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})`
  margin-top: 30px;
`;
