import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import api from '../../../services/api';
import { Container } from './styles';

export default function HelpUpdate({ help, reset, cbAnswer }) {
  const handleSubmit = async ({ answer }) => {
    try {
      await api.post(`help-orders/${help.id}/answer`, { answer });
      toast.success('Respondido com sucesso');
      cbAnswer();
    } catch (error) {
      toast.error('Erro ao responder');
    } finally {
      reset();
    }
  };

  return (
    <Container>
      <strong>PERGUNTA DO ALUNO</strong>
      <p>{help.question}</p>

      <Form initialData={{}} onSubmit={handleSubmit}>
        <label>
          <strong>SUA RESPOSTA</strong>
        </label>
        <Input
          multiline
          name="answer"
          type="text"
          id="answer"
          placeholder="Informe a resposta"
        />

        <button type="submit">Responder aluno</button>
      </Form>
    </Container>
  );
}
