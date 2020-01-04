import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import FormRegistration from '../_Form';
import api from '~/services/api';
import history from '~/services/history';
import { Container } from '~/components';

export default function RegistrationUpdate({ match }) {
  const [registration, setRegistration] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function loadRegistration(id) {
    setLoading(true);
    try {
      const { data } = await api.get(`registrations/${id}`);

      const dataFormated = {
        ...data,
        start_date: format(parseISO(data.start_date), 'yyyy-MM-dd'),
        end_date: format(parseISO(data.end_date), 'yyyy-MM-dd'),
      };

      setRegistration(dataFormated);
    } catch (error) {
      toast.error('Erro ao listar matrícula');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadRegistration(match.params.id);
  }, [match.params.id]);

  const handleSubmit = async ({ student_id, plan_id, start_date }) => {
    setLoadingSubmit(true);
    try {
      const {
        data: { id },
      } = await api.put(`registrations/${match.params.id}`, {
        plan_id,
        start_date,
        student_id,
      });

      toast.success('Matrícula editada com sucesso');
      history.push(`/registration.edit/${id}`);
    } catch (error) {
      toast.error('Erro ao editar matrícula');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormRegistration
        title="Edição de matrícula"
        initialData={loading ? {} : registration}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
        registrationEdit
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
