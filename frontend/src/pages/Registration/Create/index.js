import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormRegistration from '../_Form';
import api from '../../../services/api';
import Container from '../../../components/Container';

export default function RegistrationUpdate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ plan_id, start_date, student_id }) => {
    setLoading(true);
    try {
      await api.post(`registrations`, {
        plan_id,
        start_date,
        student_id,
      });
      toast.success('Matrícula cadastrada com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar matrícula');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormRegistration
        title="Cadastro de matrícula"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
