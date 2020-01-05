import styled from 'styled-components';

export const Wrap = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    width: inherit;
    border-radius: 30px;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    span {
      display: none;
    }

    svg {
      font-size: 30px;
    }
  }
`;
