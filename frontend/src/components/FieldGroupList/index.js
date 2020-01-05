import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import indicator from '~/assets/load.gif';

import { FieldGroup } from './styles';

export default function FieldGroupForm({
  title,
  location,
  handleInput,
  inputPlaceholder,
}) {
  return (
    <FieldGroup>
      <h1>{title}</h1>

      <div>
        {location && (
          <Link to={location}>
            <button type="button">
              <MdAdd style={{ marginRight: '10px' }} />
              CADASTRAR
            </button>
          </Link>
        )}

        {inputPlaceholder && (
          <div>
            <MdSearch
              style={{ left: '20px', top: '10px', position: 'relative' }}
            />
            <input
              type="text"
              name="search"
              placeholder={inputPlaceholder}
              onChange={e => handleInput(e.target.value)}
            />
          </div>
        )}
      </div>
    </FieldGroup>
  );
}

FieldGroupForm.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
  handleInput: PropTypes.func,
  inputPlaceholder: PropTypes.string,
};

FieldGroupForm.defaultProps = {
  location: '',
  handleInput: () => {},
  inputPlaceholder: '',
};
