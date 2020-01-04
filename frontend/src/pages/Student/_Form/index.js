import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { differenceInCalendarYears, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset, FormLayout } from '~/components';

export default function StudentForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
}) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleAge = birth => {
    if (birth) {
      setAge(differenceInCalendarYears(new Date(), parseISO(birth)));
    }
  };

  const handleWeight = val => {
    const unmasked = val.replace(/\D/g, '').slice(0, 4);
    setWeight(
      unmasked.length === 3
        ? unmasked.replace(/(\d)(\d)(\d)/, '$1$2.$3')
        : unmasked.replace(/(\d)(\d)(\d)(\d)/, '$1$2$3.$4')
    );
  };

  const handleHeight = val => {
    const unmasked = val.replace(/\D/g, '').slice(0, 3);
    setHeight(unmasked.replace(/(\d)(\d)(\d)/, '$1.$2$3'));
  };

  useEffect(() => {
    if (initialData.weight) {
      handleAge(initialData.birth);
      setWeight(`${initialData.weight}`);
      setHeight(`${initialData.height}`);
    }
  }, [initialData]);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(7, 'Nome precisa de ao menos 7 caracteres')
      .required('Preencha este campo'),
    email: Yup.string()
      .email('Email inválido')
      .required('Preencha este campo'),
    birth: Yup.date('Data de nascimento inválida').required(
      'Preencha este campo'
    ),
    weight: Yup.number()
      .min(40, 'Peso precisa estar entre 40 e 150')
      .max(150, 'Peso precisa estar entre 40 e 150')
      .required('Preencha este campo'),
    height: Yup.number()
      .min(1.2, 'Altura precisa estar entre 1.20 e 2.50')
      .max(2.5, 'Altura precisa estar entre 1.20 e 2.50')
      .required('Preencha este campo'),
  });

  return (
    <FormLayout>
      <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
        <Fieldset title={title} back="/student" loading={loadingSubmit} />

        <div>
          <section>
            <label htmlFor="name">
              NOME COMPLETO
              <Input name="name" type="text" id="name" required />
            </label>
          </section>
        </div>

        <div>
          <section>
            <label htmlFor="email">
              ENDEREÇO DE E-MAIL
              <Input name="email" type="text" id="email" required />
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
              <Input
                name="weight"
                type="text"
                id="weight"
                required
                value={weight || ''}
                onChange={e => handleWeight(e.target.value)}
              />
            </label>
          </section>

          <section>
            <label htmlFor="height">
              ALTURA
              <Input
                name="height"
                type="text"
                id="height"
                required
                value={height || ''}
                onChange={e => handleHeight(e.target.value)}
              />
            </label>
          </section>
        </div>
      </Form>
    </FormLayout>
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
