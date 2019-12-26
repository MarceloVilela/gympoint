import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { addMonths, format } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// import Select from 'react-select';
import AsyncSelect from 'react-select/async';
// import AsyncSelect from '../../../components/ReactSelectAsync';
import Select from '../../../components/ReactSelect';
import Fieldset from '../../../components/FieldGroupForm';
import api from '../../../services/api';

export default function RegistrationForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
}) {
  const [planList, setPlanList] = useState([]);

  const [studentId, setStudentId] = useState('');
  const [planSelected, setPlanSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const end_date =
    !endDate && initialData.end_date ? initialData.end_date : endDate;

  const defaultValueStudent = initialData.student_id
    ? { value: initialData.student_id, label: initialData.student_title }
    : null;
  console.log('default???', JSON.stringify(defaultValueStudent), initialData);

  const promiseOptions = async inputValue => {
    try {
      const {
        data: { docs },
      } = await api.get(`students?q=${inputValue}&page=1`);
      const options = docs.map(item => ({
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
        const {
          data: { docs },
        } = await api.get(`plans?page=${1}`);
        setPlanList(docs);
      } catch (error) {
        toast.error('Erro ao listar plano');
      }
    }
    loadPlans();
  }, []);

  useEffect(() => {
    const planFiltered = planList.filter(
      item => item.id === initialData.plan
    )[0];
    setPlanSelected(planFiltered);
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
      <Fieldset title={title} back="/registration" loading={loadingSubmit} />

      <div>
        <section>
          <label htmlFor="student_id">
            ALUNO{' '}
            {/* <AsyncSelect name="student_id" loadOptions={promiseOptions} /> */}
            <AsyncSelect
              name="student_selected"
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              placeholder="Selecionar aluno"
              onChange={selected => setStudentId(selected.value)}
              defaultValue={defaultValueStudent}
            />
            <Input name="student_id" type="hidden" readOnly value={studentId} />
          </label>
        </section>
      </div>

      <div className="break-row">
        <section>
          <label htmlFor="plan">
            PLANO ({initialData.plan})
            <Select
              name="plan_id"
              defaultId={initialData.plan}
              options={planList}
              onChange={e => {
                handlePlanSelected(e);
              }}
              placeholder="Selecionar plano"
            />
          </label>
        </section>

        <section>
          <label htmlFor="start_date">
            DATA DE INÍCIO
            <Input
              name="start_date"
              type="date"
              id="start_date"
              onChange={e => {
                handleEndDate(e.target.value);
              }}
            />
          </label>
        </section>

        <section>
          <label htmlFor="end_date">
            DATA DE TÉRMINO
            <input
              // name="end_date"
              type="date"
              id="end_date"
              readOnly
              value={end_date}
            />
          </label>
        </section>

        <section>
          <label htmlFor="price_total">
            VALOR FINAL
            <Input
              name="price_total"
              type="text"
              id="price"
              readOnly
              value={planSelected ? planSelected.price_total : ''}
            />
          </label>
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

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    plan: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    price: PropTypes.number,
    student_id: PropTypes.number,
    student_title: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
};

RegistrationForm.defaultProps = {
  initialData: {},
};
