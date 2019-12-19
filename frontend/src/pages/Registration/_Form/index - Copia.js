import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import { addMonths, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Select from '../../../components/ReactSelect';
import api from '../../../services/api';

export default function RegistrationForm({ title, initialData, handleSubmit }) {
  const [planList, setPlanList] = useState([]);
  const [planSelected, setPlanSelected] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const promiseOptions = async inputValue => {
    try {
      const response = await api.get(`students?q=${inputValue}&page=1`);
      const options = response.data.map(item => ({
        value: item.id,
        label: `${item.name} - ${item.email}`,
      }));
      return options;
    } catch (error) {
      toast.error('Erro ao listar alunos');
    }
  };

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get(`plans?page=${1}`);
        setPlanList(response.data);
      } catch (error) {
        toast.error('Erro ao listar plano');
      }
    }
    loadPlans();
  }, []);

  useEffect(() => {
    const _planSelected = planList.filter(
      item => item.id === initialData.plan
    )[0];
    setPlanSelected(_planSelected);
  }, [initialData.plan, planList]);

  if ((!planList.length || !initialData.plan) && title.includes('Edição')) {
    return '';
  }

  const handleEndDate = (startDate, duration = null) => {
    console.log('handleEndDate');
    try {
      const added = addMonths(
        new Date(startDate),
        duration || planSelected.duration
      );
      const formatted = format(added, 'yyyy-MM-dd');
      setEndDate(formatted);
      setStartDate(startDate);
    } catch (error) {
      toast.error('Erro ao calcular data de término');
      setStartDate('');
      setEndDate('');
    }
  };

  const handlePlanSelected = data => {
    setPlanSelected(data);
    if (startDate) {
      handleEndDate(startDate, data.duration);
    }
  };

  return (
    <Form initialData={initialData} onSubmit={handleSubmit}>
      <header>
        <h1>{title}</h1>
        <Link to="/registration">
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
          <label htmlFor="student_id">ALUNO</label>
          <AsyncSelect
            name="student_id"
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            placeholder="Selecionar aluno"
          />
        </section>
      </div>

      <div>
        <section>
          <label htmlFor="plan">PLANO ({initialData.plan})</label>
          <Select
            name="plan"
            defaultId={initialData.plan}
            options={planList}
            onChange={e => {
              handlePlanSelected(e);
            }}
            placeholder="Selecionar plano"
          />
        </section>

        <section>
          <label htmlFor="start_date">DATA DE INÍCIO</label>
          <Input
            name="start_date"
            type="date"
            id="start_date"
            onChange={e => {
              handleEndDate(e.target.value);
            }}
          />
        </section>

        <section>
          <label htmlFor="end_date">DATA DE TÉRMINO</label>
          <input
            // name="end_date"
            type="date"
            id="end_date"
            readOnly
            value={endDate}
          />
        </section>

        <section>
          <label htmlFor="price_total">VALOR FINAL</label>
          <Input
            name="price_total"
            type="text"
            id="price"
            readOnly
            value={planSelected ? planSelected.price_total : ''}
          />
        </section>
      </div>

      <pre>
        {startDate}, {endDate}
      </pre>
      <hr />
      <pre>SELECTED:{JSON.stringify(planSelected, null, 2)}</pre>
    </Form>
  );
}
