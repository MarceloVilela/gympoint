import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormPlan from '../_Form';
import api from '../../../services/api';
import Container from '../../../components/Container';

export default function PlanCreate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ title, price, duration }) => {
    setLoading(true);
    try {
      await api.post('plans', { title, price, duration });
      toast.success('Plano cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar plano');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormPlan
        title="Cadastro de plano"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
