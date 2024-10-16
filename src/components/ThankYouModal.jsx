import React from 'react';

const ThankYouModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Thank You!</h2>
        <p>Your responses have been submitted.</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ThankYouModal;
