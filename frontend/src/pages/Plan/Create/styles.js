import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  margin: 0 auto;

  h1 {
    text-align: left;
    margin: 50px 0 30px 0;
  }

  ul {
    background: #fff;
    min-width: 480px;
    padding: 20px 0 20px 0;

    li {
      display: flex;
      justify-content: space-between;
      color: #999;
      font-size: 16px;
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;

      strong {
        font-weight: bold;
        color: #666;
      }

      span {
        color: #0000ff;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#f64c75')};
    }
  }
`;
