import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function MyModal({ open, reset, children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalIsOpen = useCallback(
    isOpen => {
      setModalIsOpen(isOpen);
      if (!isOpen) {
        reset();
      }
    },
    [reset]
  );

  useEffect(() => {
    handleModalIsOpen(open);
  }, [open, handleModalIsOpen]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => handleModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
}

MyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
