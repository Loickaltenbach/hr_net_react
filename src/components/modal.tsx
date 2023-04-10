import React, { useState, useEffect } from 'react';
import '../style/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [modalStyle, setModalStyle] = useState({ display: 'none' });

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setModalStyle({ display: 'block' });
      document.body.style.overflow = 'hidden'; // Prevents scrolling in the background
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      setModalStyle({ display: 'none' });
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen]);

  return (
    <div className="modal-overlay" style={modalStyle} onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <span onClick={onClose} className="modal-close-button">X</span>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
