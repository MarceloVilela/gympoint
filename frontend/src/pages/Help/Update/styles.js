import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 420px;

  p,
  strong {
    color: #444;
    font-size: 16px;
    margin-bottom: 20px;
  }

  strong {
    font-weight: bold;
    color: #666;
    display: block;
    margin-bottom: 5px;
  }

  ::placeholder,
  textarea::placeholder {
    color: #999;
    font-size: 16px;
  }

  textarea {
    width: 100%;
    height: 100px;
    border: 2px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    color: #666;
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
  }
`;
