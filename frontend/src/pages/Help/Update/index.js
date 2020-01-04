import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { FormLayout } from '~/components';
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

  const schema = Yup.object().shape({
    answer: Yup.string()
      .min(7, 'Resposta precisa de ao menos 7 caracteres')
      .required('Resposta inválida'),
  });

  return (
    <Container>
      <strong>PERGUNTA DO ALUNO</strong>
      <p>{help.question}</p>

      <FormLayout>
        <Form initialData={{}} onSubmit={handleSubmit} schema={schema}>
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
      </FormLayout>
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
