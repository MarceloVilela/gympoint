import styled from 'styled-components';
import { darken } from 'polished';

export const Wrap = styled.ul`
  background: #fff;
  min-width: 480px;
  padding: 20px 0 20px 0;

  li {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 16px;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;

    div {
      flex: 1;

      &:nth-of-type(1) {
        text-align: left;
      }
    }

    strong {
      font-weight: bold;
      color: #666;
    }

    span,
    span.edit {
      color: #0000ff;
    }

    span.delete {
      margin-left: 10px;
    }

    a {
      margin-right: 10px;
    }
  }

  li:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media screen and (max-width: 1024px) {
    min-width: inherit;

    li {
      /*border: 1px solid black;*/
      flex-wrap: wrap;

      div {
        flex-basis: 100%;
        margin-left: 0;
      }
    }

    li div:nth-of-type(1) {
        text-align: center;
      }
    }
  }

  /*
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
  }*/

  a {
    color: #fff;
    /*margin-top: 15px;*/
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
