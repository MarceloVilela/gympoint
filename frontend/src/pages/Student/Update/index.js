import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import FormStudent from '../_Form';
import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function StudentUpdate({ match }) {
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`students/${match.params.id}`);
        const student = {
          ...response.data,
          birth: format(parseISO(response.data.birth), 'yyyy-MM-dd'),
        };
        setStudent(student);
      } catch (error) {
        toast.error('Erro ao listar aluno');
      }
    }

    loadStudent();
  }, [match]);

  const handleSubmit = async ({ name, email, birth, weight, height }) => {
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
  };

  return (
    <Container>
      <FormStudent
        title="Edição de aluno"
        initialData={student}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
