import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { differenceInCalendarYears, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export default function StudentForm({ title, initialData, handleSubmit }) {
  const [age, setAge] = useState('');

  const handleAge = birth => {
    if (birth) {
      setAge(differenceInCalendarYears(new Date(), parseISO(birth)));
    }
  };

  useEffect(() => handleAge(initialData.birth), [initialData]);

  return (
    <Form initialData={initialData} onSubmit={handleSubmit}>
      <header>
        <h1>{title}</h1>
        <Link to="/student">
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
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" type="text" id="name" />
        </section>
      </div>

      <div>
        <section>
          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input name="email" type="text" id="email" />
        </section>
      </div>

      <div>
        <section>
          <label htmlFor="birth">NASCIMENTO</label>
          <Input
            name="birth"
            type="date"
            id="birth"
            onChange={e => handleAge(e.target.value)}
          />
        </section>

        <section>
          <label htmlFor="age">IDADE</label>
          <Input name="age" type="text" id="age" value={age} readOnly />
        </section>

        <section>
          <label htmlFor="weight">PESO (em kg)</label>
          <Input name="weight" type="text" id="weight" />
        </section>

        <section>
          <label htmlFor="height">ALTURA</label>
          <Input name="height" type="text" id="height" />
        </section>
      </div>
    </Form>
  );
}
