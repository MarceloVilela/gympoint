import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import Fieldset from '../../../components/FieldGroupForm';

export default function FormPlan({
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
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input name="title" type="text" id="title" />
        </section>
      </div>

      <div className="break-row">
        <section>
          <label htmlFor="duration">DURAÇÃO (em meses)</label>
          <Input
            name="duration"
            type="text"
            id="duration"
            onChange={e => {
              setDuration(e.target.value);
              setPriceTotal(price * e.target.value);
            }}
          />
        </section>

        <section>
          <label htmlFor="price">PREÇO MENSAL</label>
          <Input
            name="price"
            type="text"
            id="price"
            onChange={e => {
              setPrice(e.target.value);
              setPriceTotal(e.target.value * duration);
            }}
          />
        </section>

        <section>
          <label htmlFor="price_total">PREÇO TOTAL</label>
          <input
            name="price_total"
            id="price_total"
            type="text"
            readOnly
            value={priceTotal}
          />
        </section>
      </div>
      <pre>{JSON.stringify({ price, duration })}</pre>
    </Form>
  );
}
