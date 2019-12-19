import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import { Container } from '../../_layouts/default/styles';

export default function StudentShow() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);

  const loadStudents = useCallback(async () => {
    try {
      const response = await api.get(`students?q=${q}&page=${page}`);
      const { docs, pages } = response.data;
      setPageTotal(pages);
      setStudents(docs);
    } catch (error) {
      toast.error('Erro ao listar alunos');
    }
  }, [page, q]);

  useEffect(() => {
    loadStudents();
  }, [q, loadStudents]);

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja apagar aluno?')) {
      try {
        await api.delete(`students/${id}`);
        toast.success('Aluno apagado com sucesso');
        loadStudents();
      } catch (error) {
        toast.error('Erro ao apagar aluno');
      }
    }
  };

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <Link to="student.new">
          <button type="button">
            <MdAdd style={{ marginRight: '10px' }} />
            CADASTRAR
          </button>
        </Link>
        <div>
          <MdSearch
            style={{ left: '20px', top: '3px', position: 'relative' }}
          />
          <input
            type="text"
            name="search"
            placeholder="Buscar aluno"
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </header>

      <ul>
        <li>
          <div>
            <strong>NOME</strong>
          </div>
          <div>
            <strong>EMAIL</strong>
          </div>
          <div>
            <strong>IDADE</strong>
          </div>
          <div>
            <strong />
          </div>
        </li>
        {students.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.age}</div>
            <div>
              <Link to={`student.edit/${item.id}`} className="edit">
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
