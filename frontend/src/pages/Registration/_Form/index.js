import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
import { addMonths, format } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset, FormLayout, Select } from '~/components';

import api from '~/services/api';
import history from '~/services/history';

export default function RegistrationForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
  registrationEdit,
}) {
  const [stateStudentId, setStateStudentId] = useState('');
  const [stateStudentDefault, setStateStudentDefault] = useState('');

  // Plans must be fetched from the API as soon as the page loads and must have no filter.
  const [statePlanList, setStatePlanList] = useState([]);
  const [statePlanSelected, setStatePlanSelected] = useState('');

  // stateEndDate automatically calculated based on the stateStartDate
  const [stateStartDate, setStateStartDate] = useState();
  const [stateEndDate, setStateEndDate] = useState();

  /*
   * Requests
   */

  // Fetch for the student by name using the async method of the React Select library.
  const loadStudentByName = async inputValue => {
    try {
      const {
        data: { docs },
      } = await api.get(`students?q=${inputValue}&page=1`);
      const options = docs.map(item => ({
        value: item.id,
        label: `${item.name} - ${item.email}`,
        registration_id:
          item.registration === null ? null : item.registration.id,
      }));
      return options;
    } catch (error) {
      toast.error(`Erro ao listar alunos`);
    }
  };

  // Fetch plan
  useEffect(() => {
    async function loadPlans() {
      try {
        const {
          data: { docs },
        } = await api.get(`plans`);
        setStatePlanList(docs);
      } catch (error) {
        toast.error('Erro ao listar plano');
      }
    }
    loadPlans();
  }, []);

  /*
   * Defines states based on initial data
   */

  useEffect(() => {
    const { student, plan, start_date, end_date } = initialData;
    const valStudent = student ? student.id : '';
    setStateStudentId(valStudent);
    //
    const valStudentDefault = student
      ? { value: initialData.student.id, label: initialData.student.name }
      : null;
    setStateStudentDefault(valStudentDefault);
    //
    const id = plan ? plan.id : '';
    const [planFiltered] = statePlanList.filter(item => item.id === id);
    setStatePlanSelected(planFiltered);
    //
    setStateStartDate(start_date);
    setStateEndDate(end_date);
  }, [initialData, statePlanList]);

  /*
   * Handle field actions
   */

  const handleStateEndDate = (valstateStartDate, duration = null) => {
    try {
      const added = addMonths(
        new Date(valstateStartDate),
        duration || statePlanSelected.duration
      );
      const formatted = format(added, 'yyyy-MM-dd');
      setStateEndDate(formatted);
      setStateStartDate(valstateStartDate);
    } catch (error) {
      setStateStartDate('');
      setStateEndDate('');
    }
  };

  const handleStatePlanSelected = ({ id }) => {
    const [data] = statePlanList.filter(item => item.id === id);
    setStatePlanSelected(data);
    if (stateStartDate) {
      handleStateEndDate(stateStartDate, data.duration);
    }
  };

  const handleStudent = selectedData => {
    if (selectedData.registration_id) {
      toast.info(
        `Redirecionando para a matrícula do aluno ${selectedData.label}.`
      );
      history.push(`/registration.edit/${selectedData.registration_id}`);
    } else if (registrationEdit) {
      toast.info(`Aluno ${selectedData.label} sem matrícula ativa.`);
      history.push(`/registration.new`);
    }
    setStateStudentId(selectedData.value);
  };

  const schema = Yup.object().shape({
    student_id: Yup.number().required('Aluno inválido'),
    plan_id: Yup.number().required('Plano inválido'),
    start_date: Yup.date('Data de início inválida').required(
      'Data de início inválida'
    ),
  });

  return (
    <FormLayout>
      <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
        <Fieldset title={title} back="/registration" loading={loadingSubmit} />

        <div>
          <section>
            <label htmlFor="student_id">
              ALUNO({stateStudentId})
              {(stateStudentDefault || !registrationEdit) && (
                <AsyncSelect
                  name="student_selected"
                  cacheOptions
                  defaultOptions
                  loadOptions={loadStudentByName}
                  placeholder="Selecionar aluno"
                  onChange={selected => handleStudent(selected)}
                  defaultValue={stateStudentDefault}
                />
              )}
              <Input
                name="student_id"
                type="hidden"
                readOnly
                value={stateStudentId}
              />
            </label>
          </section>
        </div>

        <div className="break-row">
          <section>
            <label htmlFor="plan">
              PLANO
              {(statePlanSelected || !registrationEdit) && (
                <Select
                  name="plan_id"
                  defaultId={statePlanSelected ? statePlanSelected.id : ''}
                  options={statePlanList}
                  onChange={e => {
                    handleStatePlanSelected(e);
                  }}
                  placeholder="Selecionar plano"
                />
              )}
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
                  handleStateEndDate(e.target.value);
                }}
                required
              />
            </label>
          </section>

          <section>
            <label htmlFor="end_date">
              DATA DE TÉRMINO
              <input
                type="date"
                id="end_date"
                defaultValue={stateEndDate}
                readOnly
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
                value={statePlanSelected ? statePlanSelected.price_total : ''}
                readOnly
              />
            </label>
          </section>
        </div>
      </Form>
    </FormLayout>
  );
}

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    student: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    plan: PropTypes.shape({
      id: PropTypes.number,
    }),
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
  registrationEdit: PropTypes.bool,
};

RegistrationForm.defaultProps = {
  initialData: {},
  registrationEdit: false,
};
