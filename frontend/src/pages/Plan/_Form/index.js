import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset, FormLayout } from '~/components';

export default function PlanForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
}) {
  const [priceTotal, setPriceTotal] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    setPrice(initialData.price);
    setDuration(initialData.duration);
  }, [initialData]);

  useEffect(() => {
    if (!isNaN(duration) && !isNaN(price)) setPriceTotal(duration * price);
  }, [duration, price]);

  const schema = Yup.object().shape({
    title: Yup.string().required('Preencha este campo'),
    duration: Yup.number()
      .min(1, 'Duração precisa estar entre 1 e 48')
      .max(48, 'Duração precisa estar entre 1 e 48')
      .required('Preencha este campo'),
    price: Yup.number()
      .min(1, 'Preço precisa estar entre 1 e 1000')
      .max(1000, 'Preço precisa estar entre 1 e 1000')
      .required('Preencha este campo'),
  });

  return (
    <FormLayout>
      <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
        <Fieldset title={title} back="/plan" loading={loadingSubmit} />

        <div>
          <section>
            <label htmlFor="title">
              TÍTULO DO PLANO{' '}
              <Input name="title" type="text" id="title" required />
            </label>
          </section>
        </div>

        <div className="break-row">
          <section>
            <label htmlFor="duration">
              DURAÇÃO (em meses)
              <Input
                name="duration"
                type="text"
                id="duration"
                onChange={e => {
                  setDuration(e.target.value);
                }}
                required
              />
            </label>
          </section>

          <section>
            <label htmlFor="price">
              PREÇO MENSAL
              <Input
                name="price"
                type="text"
                id="price"
                onChange={e => {
                  setPrice(e.target.value);
                }}
                required
              />
            </label>
          </section>

          <section>
            <label htmlFor="price_total">
              PREÇO TOTAL
              <input
                name="price_total"
                id="price_total"
                type="text"
                value={priceTotal}
                readOnly
              />
            </label>
          </section>
        </div>
      </Form>
    </FormLayout>
  );
}

PlanForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
};

PlanForm.defaultProps = {
  initialData: {},
};
