import React, { useState, useEffect, useCallback } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { textualDate } from '../../../services/date';
import Pagination from '../../../components/Pagination';
import Container from '../../../components/Container';
import Fieldset from '../../../components/FieldGroupList';

export default function RegistrationShow() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`registrations?page=${page}`);

      setPageTotal(pages);

      const registrationsFormated = docs.map(item => ({
        ...item,
        color: item.active ? '#00CC00' : '#CCC',
        start_date: textualDate(item.start_date),
        end_date: textualDate(item.end_date),
      }));
      setRegistrations(registrationsFormated);
    } catch (error) {
      toast.error('Erro ao listar matrículas');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadRegistrations();
  }, [page, loadRegistrations]);

  const handleDelete = async id => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar matrícula?')) {
      setLoading(true);
      try {
        await api.delete(`registrations/${id}`);
        toast.success('Matrícula apagada com sucesso');
        loadRegistrations();
      } catch (error) {
        toast.error('Erro ao apagar matrícula');
      }
      setLoading(false);
    }
  };

  return (
    <Container loading={loading}>
      <Fieldset title="Gerenciando matrículas" location="/registration.new" />

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
      <Pagination current={page} total={pageTotal} setPage={setPage} />
    </Container>
  );
}
