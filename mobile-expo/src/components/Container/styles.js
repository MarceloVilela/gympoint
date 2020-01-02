import styled from 'styled-components/native';

export const Wrap = styled.SafeAreaView`
  flex: 1;
  padding: 80px 30px 0 30px;
  padding: ${props =>
    props.scrollEnabled ? '0px 30px 0 30px' : '80px 30px 0 30px'};
  background-color: #f3f3f3;
`;

export const WrapLoading = styled.SafeAreaView`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 80, paddingBottom: 30 },
})`
  align-self: stretch;
`;
