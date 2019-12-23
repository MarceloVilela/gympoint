import styled from 'styled-components';

/*
export const Wrap = styled.SafeAreaView`
  flex: 1;
  padding: 80px 30px 0 30px;
  padding: ${props =>
    props.scrollEnabled ? '0px 30px 0 30px' : '80px 30px 0 30px'};
  background-color: #f3f3f3;
`;
*/
export const Wrap = styled.div`
  max-width: 100%;
  /*max-width: 315px;*/
  padding: 0 30px 30px 30px;
  text-align: center;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    .break-row {
      /*border: 1px solid black;*/
      flex-wrap: wrap;

      & > * {
        flex-basis: 100%;
        margin-left: 0;
      }
    }
  }
`;

export const WrapLoading = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Image = styled.img`
  width: 64px;
  height: 64px;
`;
