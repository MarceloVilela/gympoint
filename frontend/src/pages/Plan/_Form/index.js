import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

export default function FormPlan({ title, initialData, handleSubmit }) {
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
      <header>
        <h1>{title}</h1>
        <Link to="/plan">
          <button type="button" className="back">
            <MdChevronLeft style={{ marginRight: '10px' }} />
            VOLTAR
          </button>
        </Link>
        <button type="submit">
          <MdDone style={{ marginRight: '10px' }} />
          SALVAR
        </button>
      </header>

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
