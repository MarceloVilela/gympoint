import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';

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

export default function App({ open, reset, children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalIsOpen = useCallback(
    open => {
      setModalIsOpen(open);
      if (!open) {
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
        {/*
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
          */}
      </Modal>
    </div>
  );
}
