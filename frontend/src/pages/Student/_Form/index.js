import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { differenceInCalendarYears, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import Fieldset from '../../../components/FieldGroupForm';

export default function StudentForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
}) {
  const [age, setAge] = useState('');
  const [weightMask, setWeightMask] = useState('');

  const handleAge = birth => {
    if (birth) {
      setAge(differenceInCalendarYears(new Date(), parseISO(birth)));
    }
  };

  useEffect(() => handleAge(initialData.birth), [initialData]);

  return (
    <Form initialData={initialData} onSubmit={handleSubmit}>
      <Fieldset title={title} back="/student" loading={loadingSubmit} />

      <div>
        <section>
          <label htmlFor="name">
            NOME COMPLETO
            <Input name="name" type="text" id="name" />
          </label>
        </section>
      </div>

      <div>
        <section>
          <label htmlFor="email">
            ENDEREÇO DE E-MAIL
            <Input name="email" type="text" id="email" />
          </label>
        </section>
      </div>

      <div className="break-row">
        <section>
          <label htmlFor="birth">
            NASCIMENTO
            <Input
              name="birth"
              type="date"
              id="birth"
              onChange={e => handleAge(e.target.value)}
            />
          </label>
        </section>

        <section>
          <label htmlFor="age">
            IDADE
            <Input name="age" type="text" id="age" value={age} readOnly />
          </label>
        </section>

        <section>
          <label htmlFor="weight">
            PESO (em kg)
            <InputMask
              mask={weightMask.charAt(2) !== '.' ? '99?.9' : '99?9'}
              formatChars={{ 9: '[0-9]', '?': '[0-9.]' }}
              onChange={e => setWeightMask(e.target.value)}
              value={weightMask}
              maskChar={null}
            >
              {() => <Input name="weight" type="text" id="weight" required />}
            </InputMask>
          </label>
        </section>

        <section>
          <label htmlFor="height">
            ALTURA
            <InputMask mask="9.99" maskChar={null}>
              {() => <Input name="height" type="text" id="height" required />}
            </InputMask>
          </label>
        </section>
      </div>
    </Form>
  );
}

StudentForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    birth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
};

StudentForm.defaultProps = {
  initialData: {},
};
