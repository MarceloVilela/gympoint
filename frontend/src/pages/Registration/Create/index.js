import React from 'react';
import { toast } from 'react-toastify';

import FormRegistration from '../_Form';
import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function RegistrationUpdate() {
  const handleSubmit = async ({ plan_id, start_date, student_id }) => {
    try {
      await api.post(`registrations`, {
        plan_id,
        start_date,
        student_id,
      });
      toast.success('Matrícula cadastrada com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar matrícula');
    }
  };

  return (
    <Container>
      <FormRegistration
        title="Cadastro de matrícula"
        initialData={{}}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
