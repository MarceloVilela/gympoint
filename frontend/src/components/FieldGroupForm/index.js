import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import indicator from '~/assets/load.gif';

import { FieldGroup, Button } from './styles';

export default function FieldGroupForm({ title, back, loading }) {
  return (
    <FieldGroup>
      <h1>{title}</h1>
      <div>
        <Link to={back}>
          <button type="button" className="back">
            <MdChevronLeft style={{ marginRight: '10px' }} />
            VOLTAR
          </button>
        </Link>
        <Button type="submit" loading={loading ? 'true' : 'false'}>
          <MdDone style={{ marginRight: '10px' }} />
          {loading ? 'SALVANDO' : 'SALVAR'}
        </Button>
      </div>
    </FieldGroup>
  );
}

FieldGroupForm.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

FieldGroupForm.defaultProps = {
  loading: false,
};
