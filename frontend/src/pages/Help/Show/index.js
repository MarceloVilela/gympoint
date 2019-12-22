import React, { useState, useEffect, useCallback } from 'react';

import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import { Container } from '../../_layouts/default/styles';
import Modal from '../../../components/Modal';
import HelpUpdate from '../Update';

export default function HelpShow() {
  const [helps, setHelps] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);

  const [currentHelp, setCurrentHelp] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const loadHelps = useCallback(async () => {
    const {
      data: { docs, pages },
    } = await api.get(`help-orders?page=${page}`);

    setPageTotal(pages);
    setHelps(docs);
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
    <Container>
      <p>{JSON.stringify(openModal)}</p>
      <header>
        <h1>Pedidos de auxílio</h1>
      </header>

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
              <span onClick={() => handleAnswer(help)}>responder</span>
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
