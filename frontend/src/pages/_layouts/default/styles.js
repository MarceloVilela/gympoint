import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #eee;
`;

export const Container = styled.div`
  max-width: 100%;
  /*max-width: 315px;*/
  padding: 0 30px 0 30px;
  text-align: center;
  margin: 0 auto;

  header {
    display: flex;
    align-items: baseline;
    margin: 50px 0 30px 0;

    h1 {
      flex: 1;
      text-align: left;
      align-self: center;
    }

    button {
      width: inherit;
      height: 34px;
      padding: 0 20px;
      margin: 0;

      display: flex;
      align-items: center;

      &.back {
        background-color: #ccc;
      }

      & + button {
        margin-left: 10px;
      }
    }

    div {
      align-self: start;

      input {
        padding-left: 20px;
        height: 34px;
        border-radius: 4px;
        border: 1px solid #999;
        color: #999;
        min-width: 240px;
      }
    }
  }

  button {
    width: 100%;
    height: 44px;
    margin: 10px 0 0;
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

    &.warning{
      width: inherit;
      height: inherit;
      margin: 0;
      background: #fff;
      font-weight: inherit;
      color: #f64c75;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
    }

    &.warning:hover {
      background: #fff;
    }
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
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  form {
    background: #fff;
    min-width: 480px;
    padding: 10px 20px;
    margin: 50px 0;

    & > div {
      display: flex;
      margin-bottom: 30px;

      & > section {
        flex: 1;
        display: flex;
        flex-direction: column;

        & + section {
          margin-left: 30px;
        }

        & > label {
          text-align: left;
        }

        & > input,
        & > select,
        & > textarea,
        & > label {
          font-size: 15px;
        }

        & > input,
        & > select,
        & > textarea {
          border: 2px solid #ccc;
          border-radius: 6px;
          color: #666;
        }

        & > input,
        & > select {
          height: 34px;
        }

        & > input[readOnly],
        & > select[readOnly] {
          background-color: #ddd;
        }
      }
    }
  }
`;
