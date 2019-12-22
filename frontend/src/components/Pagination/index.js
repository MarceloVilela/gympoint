import React from 'react';
import { Wrap } from './styles';

export default function Pagination({ current, total, setPage }) {
  return (
    <Wrap>
      <button
        type="button"
        disabled={current < 2}
        onClick={() => setPage(current - 1)}
      >
        Anterior
      </button>
      <span>Página {current}</span>
      <button
        type="button"
        disabled={current === total}
        onClick={() => setPage(current + 1)}
      >
        Próximo
      </button>
    </Wrap>
  );
}
