import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 80px 30px 0 30px;
  background-color: #f3f3f3;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})`
  margin-top: 20px;
`;
