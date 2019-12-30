import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, FieldGroupList, Pagination } from '~/components';

export default function Profile() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const formatPlan = plan => ({
    ...plan,
    durationDesc:
      plan.duration === 1 ? `${plan.duration} mês` : `${plan.duration} meses`,
  });

  const loadPlans = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`plans?page=${page}`);

      setPageTotal(pages);

      const plansFormatted = docs.map(plan => formatPlan(plan));
      setPlans(plansFormatted);
    } catch (error) {
      toast.error('Erro ao listar planos');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadPlans();
  }, [page, loadPlans]);

  const handleDelete = async id => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar plano?')) {
      setLoading(true);
      try {
        await api.delete(`plans/${id}`);
        toast.success('Plano apagado com sucesso');
        loadPlans();
      } catch (error) {
        toast.error('Erro ao apagar plano');
      }
      setLoading(false);
    }
  };

  return (
    <Container loading={loading}>
      <FieldGroupList title="Gerenciando planos" location="/plan.new" />

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
      <Pagination current={page} total={pageTotal} setPage={setPage} />
    </Container>
  );
}
