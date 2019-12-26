import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import FormRegistration from '../_Form';
import api from '../../../services/api';
import Container from '../../../components/Container';

export default function RegistrationUpdate({ match }) {
  const [registration, setRegistration] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function loadRegistration(id) {
    setLoading(true);
    try {
      const response = await api.get(`registrations/${id}`);

      const docs = {
        plan: response.data.plan.id,
        start_date: format(parseISO(response.data.start_date), 'yyyy-MM-dd'),
        end_date: format(parseISO(response.data.end_date), 'yyyy-MM-dd'),
        price: response.data.price,
        student_id: response.data.student.id,
        student_title: response.data.student.name,
      };

      setRegistration(docs);
    } catch (error) {
      toast.error('Erro ao listar matrícula');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadRegistration(match.params.id);
  }, [match.params.id]);

  const handleSubmit = async ({ student_id, plan, start_date }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`registrations/${match.params.id}`, {
        plan_id: plan,
        start_date,
        student_id,
      });

      toast.success('Matrícula editada com sucesso');
    } catch (error) {
      toast.error('Erro ao editar matrícula');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormRegistration
        title="Edição de matrícula"
        initialData={registration}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

RegistrationUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
