import styled from 'styled-components/native';

export const Form = styled.View``;

export const FormInput = styled.TextInput.attrs(props => ({
  placeholdertextcolor: '#999',
  ...props,
}))`
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #999;
  font-size: 16px;
  background-color: #fff;
  margin-bottom: 10px;
  min-height: 100px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
