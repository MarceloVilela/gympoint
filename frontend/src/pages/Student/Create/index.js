import React from 'react';
import { toast } from 'react-toastify';

import FormStudent from '../_Form';
import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function StudentUpdate() {
  const handleSubmit = async ({ name, email, birth, weight, height }) => {
    try {
      await api.post('students', { name, email, birth, weight, height });
      toast.success('Aluno cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar aluno');
    }
  };

  return (
    <Container>
      <FormStudent
        title="Cadastro de aluno"
        initialData={{}}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
