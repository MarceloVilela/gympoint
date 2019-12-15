import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px 0 30px;
  background-color: #f3f3f3;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 80, paddingBottom: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled.TextInput.attrs(props => ({
  placeholdertextcolor: '#999',
  ...props,
}))`
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #999;
  font-size: 16px;
  background-color: #fff;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
