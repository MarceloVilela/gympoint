import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import FormStudent from '../_Form';
import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function PlanUpdate({ match }) {
  const [plan, setPlan] = useState({});

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`plans/${match.params.id}`);
        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao listar plano');
      }
    }

    loadPlan();
  }, [match.params.id]);

  const handleSubmit = async ({ title, duration, price }) => {
    try {
      await api.put(`plans/${match.params.id}`, { title, duration, price });
      toast.success('Plano editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar plano');
    }
  };

  return (
    <Container>
      <FormStudent
        title="Edição de plano"
        initialData={plan}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
