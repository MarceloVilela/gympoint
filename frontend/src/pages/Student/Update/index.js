import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import FormStudent from '../_Form';
import api from '~/services/api';
import { Container } from '~/components';

export default function StudentUpdate({ match }) {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    async function loadStudent() {
      setLoading(true);
      try {
        const response = await api.get(`students/${match.params.id}`);
        const docs = {
          ...response.data,
          birth: format(parseISO(response.data.birth), 'yyyy-MM-dd'),
        };
        setStudent(docs);
      } catch (error) {
        toast.error('Erro ao listar aluno');
      }
      setLoading(false);
    }

    loadStudent();
  }, [match]);

  const handleSubmit = async ({ name, email, birth, weight, height }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`students/${match.params.id}`, {
        name,
        email,
        birth,
        weight,
        height,
      });
      toast.success('Aluno editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar aluno');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormStudent
        title="Edição de aluno"
        initialData={student}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

StudentUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
