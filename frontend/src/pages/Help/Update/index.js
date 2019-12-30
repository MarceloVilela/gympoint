import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '~/services/api';
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
        <label htmlFor="answer">
          <strong>SUA RESPOSTA</strong>
          <Input
            multiline
            name="answer"
            type="text"
            id="answer"
            placeholder="Informe a resposta"
            required
          />
        </label>

        <button type="submit">Responder aluno</button>
      </Form>
    </Container>
  );
}

HelpUpdate.propTypes = {
  help: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
  }).isRequired,
  reset: PropTypes.func.isRequired,
  cbAnswer: PropTypes.func.isRequired,
};
