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
    align-items: center;

    article {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;

      section {
        display: flex;

        &:nth-of-type(1) {
          padding-right: 15px;
          margin-right: 15px;
          border-right: 2px solid #ccc;
        }
      }
    }

    aside {
      display: flex;
      flex-direction: column;
    }

    a {
      font-weight: bold;
      color: #999;
      margin-right: 20px;
    }

    a.chosen {
      color: #444;
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
