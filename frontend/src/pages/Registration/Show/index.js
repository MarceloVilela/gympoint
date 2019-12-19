import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { textualDate } from '../../../services/date';
import { Container } from '../../_layouts/default/styles';

export default function RegistrationShow() {
  const [registrations, setRegistrations] = useState([]);

  async function loadRegistrations() {
    try {
      const response = await api.get(`registrations?page=${1}`);
      const registrationsFormated = response.data.map(item => ({
        ...item,
        color: item.active ? '#00CC00' : '#CCC',
        start_date: textualDate(item.start_date),
        end_date: textualDate(item.end_date),
      }));
      setRegistrations(registrationsFormated);
    } catch (error) {
      toast.error('Erro ao listar matrículas');
    }
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja apagar matrícula?')) {
      try {
        await api.delete(`registrations/${id}`);
        toast.success('Matrícula apagada com sucesso');
        loadRegistrations();
      } catch (error) {
        toast.error('Erro ao apagar matrícula');
      }
    }
  };

  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>
        <Link to="registration.new">
          <button type="button">
            <MdAdd style={{ marginRight: '10px' }} />
            CADASTRAR
          </button>
        </Link>
      </header>

      <ul>
        <li>
          <div>
            <strong>ALUNO</strong>
          </div>
          <div>
            <strong>PLANO</strong>
          </div>
          <div>
            <strong>INÍCIO</strong>
          </div>
          <div>
            <strong>TÉRMINO</strong>
          </div>
          <div>
            <strong>ATIVA</strong>
          </div>
          <div>
            <strong />
          </div>
        </li>
        {registrations.map(item => (
          <li key={item.id}>
            <div>{item.student.name}</div>
            <div>{item.plan.title}</div>
            <div>{item.start_date}</div>
            <div>{item.end_date}</div>
            <div>
              <MdCheckCircle color={item.color} />
            </div>
            <div>
              <Link to={`registration.edit/${item.id}`} className="edit">
                <span className="edit">editar</span>
              </Link>

              <button
                type="button"
                className="warning"
                onClick={() => handleDelete(item.id)}
              >
                apagar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
