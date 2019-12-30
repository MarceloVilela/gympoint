import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, FieldGroupList, Modal, Pagination } from '~/components';
import HelpUpdate from '../Update';

export default function HelpShow() {
  const [helps, setHelps] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentHelp, setCurrentHelp] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const loadHelps = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`help-orders?page=${page}`);
      setPageTotal(pages);
      setHelps(docs);
    } catch (error) {
      toast.error('Erro ao listar matrículas');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadHelps();
  }, [page, loadHelps]);

  const handleAnswer = help => {
    setCurrentHelp(help);
    setOpenModal(true);
  };

  const handlePropagatesClose = () => {
    setOpenModal(false);
  };

  return (
    <Container loading={loading}>
      <FieldGroupList title="Pedidos de auxílio" />

      <ul>
        <li>
          <div>
            <strong>ALUNO</strong>
          </div>
        </li>
        {helps.map(help => (
          <li key={help.id}>
            <div>{help.student.name}</div>
            <div>
              <button
                type="button"
                className="info"
                onClick={() => handleAnswer(help)}
              >
                responder
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination current={page} total={pageTotal} setPage={setPage} />

      <Modal open={openModal} reset={handlePropagatesClose}>
        <HelpUpdate
          help={currentHelp}
          reset={handlePropagatesClose}
          cbAnswer={loadHelps}
        />
      </Modal>
    </Container>
  );
}
