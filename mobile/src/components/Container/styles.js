import styled from 'styled-components/native';

export const Wrap = styled.View`
  flex: 1;
  padding: 80px 30px 0 30px;
  padding: ${props =>
    props.scrollEnabled ? '0px 30px 0 30px' : `120px 30px 0 30px`};
  background-color: #f3f3f3;
`;

export const WrapLoading = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 120, paddingBottom: 30 },
})`
  align-self: stretch;
`;
