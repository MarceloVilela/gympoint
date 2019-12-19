import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';

export default function Profile() {
  const [plans, setplans] = useState([]);

  async function loadPlans() {
    try {
      const response = await api.get(`plans?page=${1}`);

      const plansFormatted = response.data.map(plan => ({
        ...plan,
        durationDesc:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
      }));

      setplans(plansFormatted);
    } catch (error) {
      toast.error('Erro ao listar planos');
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja apagar plano?')) {
      try {
        await api.delete(`plans/${id}`);
        toast.success('Plano apagado com sucesso');
        loadPlans();
      } catch (error) {
        toast.error('Erro ao apagar plano');
      }
    }
  };

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <Link to="plan.new">
          <button type="button">
            <MdAdd style={{ marginRight: '10px' }} />
            CADASTRAR
          </button>
        </Link>
      </header>

      <ul>
        <li>
          <div>
            <strong>TÍTULO</strong>
          </div>
          <div>
            <strong>DURAÇÂO</strong>
          </div>
          <div>
            <strong>VALOR p/ MÊS</strong>
          </div>
          <div>
            <strong />
          </div>
        </li>
        {plans.map(item => (
          <li key={item.id}>
            <div>{item.title}</div>
            <div>{item.durationDesc}</div>
            <div>{item.price}</div>
            <div>
              <Link to={`plan.edit/${item.id}`} className="edit">
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
