import React, { useState } from 'react';

const Modal = ({ isOpen, closeModal,children }) => {
    if (!isOpen) return null;
  return (
    <div className='modal-overlay top-0 left-0 fixed w-full h-full bg-slate-900/70 z-4 flex justify-center place-items-center' onClick={closeModal}>
       {children}
    </div>
  );
};

export default Modal;
