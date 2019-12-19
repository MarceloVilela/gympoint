import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import { Container } from '../../_layouts/default/styles';
import Modal from '../../../components/Modal';
import HelpUpdate from '../Update';

export default function HelpShow() {
  const [helps, setHelps] = useState([]);
  const [currentHelp, setCurrentHelp] = useState({});
  const [openModal, setOpenModal] = useState(false);

  async function loadHelps() {
    const response = await api.get(`help-orders?page=${1}`);
    setHelps(response.data);
  }

  useEffect(() => {
    loadHelps();
  }, []);

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
