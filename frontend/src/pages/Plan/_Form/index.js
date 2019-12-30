import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset } from '~/components';

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
    const priceTotalInitial =
      'price' in initialData && 'duration' in initialData
        ? initialData.price * initialData.duration
        : '';

    setPrice(initialData.price);
    setDuration(initialData.duration);
    setPriceTotal(priceTotalInitial);
  }, [initialData]);

  return (
    <Form initialData={initialData} onSubmit={handleSubmit}>
      <Fieldset title={title} back="/plan" loading={loadingSubmit} />

      <div>
        <section>
          <label htmlFor="title">
            TÍTULO DO PLANO <Input name="title" type="text" id="title" />
          </label>
        </section>
      </div>

      <div className="break-row">
        <section>
          <label htmlFor="duration">
            DURAÇÃO (em meses){' '}
            <Input
              name="duration"
              type="text"
              id="duration"
              onChange={e => {
                setDuration(e.target.value);
                setPriceTotal(price * e.target.value);
              }}
            />
          </label>
        </section>

        <section>
          <label htmlFor="price">
            PREÇO MENSAL{' '}
            <Input
              name="price"
              type="text"
              id="price"
              onChange={e => {
                setPrice(e.target.value);
                setPriceTotal(e.target.value * duration);
              }}
            />
          </label>
        </section>

        <section>
          <label htmlFor="price_total">
            PREÇO TOTAL{' '}
            <input
              name="price_total"
              id="price_total"
              type="text"
              readOnly
              value={priceTotal}
            />
          </label>
        </section>
      </div>
      <pre>{JSON.stringify({ price, duration })}</pre>
    </Form>
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
