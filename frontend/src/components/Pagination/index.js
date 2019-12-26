import React from 'react';
import PropTypes from 'prop-types';

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

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
