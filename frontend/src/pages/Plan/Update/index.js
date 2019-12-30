import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormStudent from '../_Form';
import api from '~/services/api';
import { Container } from '~/components';

export default function PlanUpdate({ match }) {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    async function loadPlan() {
      setLoading(true);
      try {
        const response = await api.get(`plans/${match.params.id}`);
        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao listar plano');
      }
      setLoading(false);
    }

    loadPlan();
  }, [match.params.id]);

  const handleSubmit = async ({ title, duration, price }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`plans/${match.params.id}`, { title, duration, price });
      toast.success('Plano editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar plano');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormStudent
        title="Edição de plano"
        initialData={plan}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

PlanUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
