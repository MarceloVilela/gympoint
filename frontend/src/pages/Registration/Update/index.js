import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import FormRegistration from '../_Form';
import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function RegistrationUpdate({ match }) {
  const [registration, setRegistration] = useState([]);

  async function loadRegistration(id) {
    try {
      const response = await api.get(`registrations/${id}`);
      const _registration = {
        plan: response.data.plan.id,
        start_date: format(parseISO(response.data.start_date), 'yyyy-MM-dd'),
        end_date: format(parseISO(response.data.end_date), 'yyyy-MM-dd'),
        price: response.data.price,
        student_id: response.data.student.id,
        student_title: response.data.student.name,
      };
      console.log(_registration);
      setRegistration(_registration);
    } catch (error) {
      toast.error('Erro ao listar matrícula');
    }
  }

  useEffect(() => {
    loadRegistration(match.params.id);
  }, [match.params.id]);

  const handleSubmit = async ({ student_id, plan, start_date }) => {
    try {
      console.log(student_id, plan, start_date);
      await api.put(`registrations/${match.params.id}`, {
        plan_id: plan,
        start_date,
        student_id,
      });
      toast.success('Matrícula editada com sucesso');
    } catch (error) {
      toast.error('Erro ao editar matrícula');
    }
  };

  return (
    <Container>
      <FormRegistration
        title="Edição de matrícula"
        initialData={registration}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
