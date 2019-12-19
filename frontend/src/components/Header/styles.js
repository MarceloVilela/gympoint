import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  /*max-width: 900px;*/
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    flex: 1;
    justify-content: space-between;

    img {
      border-right: 1px solid #eee;
    }

    /*p {
      font-weight: bold;
      color: #ef4d64;
      margin-left: 10px;
    }*/

    a {
      font-weight: bold;
      color: #999;
      margin-right: 20px;
    }

    a.chosen {
      color: #444;
    }

    & > div {
      display: flex;
      align-items: center;
    }

    & > aside {
      display: flex;
      flex-direction: column;
    }
  }

  aside {
    display: flex;
    align-items: flex-end;

    p + p {
      color: #ef4d64;
      cursor: pointer;
    }
  }
`;

export const Separator = styled.div`
  border-right: 2px solid #ccc;
  width: 2px;
  height: 20px;
  margin: 0 20px;
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #333;
    }
    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
