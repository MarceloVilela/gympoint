import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  backgroundColor: '#f3f3f3',
})`
  align-self: stretch;
`;

export const MessageList = styled.View`
  margin: 80px 30px 30px 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;
`;

export const ContainerMessage = styled.View`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  justify-content: space-between;
  align-items: baseline;
  flex-grow: 1;
`;

export const HeaderLabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Body = styled.Text`
  margin-top: 10px;
  color: #666;
  font-size: 14px;
`;
