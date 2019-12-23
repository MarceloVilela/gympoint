import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormStudent from '../_Form';
import api from '../../../services/api';
import Container from '../../../components/Container';

export default function StudentUpdate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ name, email, birth, weight, height }) => {
    setLoading(true);
    try {
      await api.post('students', { name, email, birth, weight, height });
      toast.success('Aluno cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar aluno');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormStudent
        title="Cadastro de aluno"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
