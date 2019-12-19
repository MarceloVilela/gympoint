import React from 'react';
import { toast } from 'react-toastify';

import FormPlan from '../_Form';
import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function PlanCreate() {
  const handleSubmit = async ({ title, price, duration }) => {
    try {
      await api.post('plans', { title, price, duration });
      toast.success('Plano cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar plano');
    }
  };

  return (
    <Container>
      <FormPlan
        title="Cadastro de plano"
        initialData={{}}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
