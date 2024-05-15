// import React from 'react';

type ModalChangeProps = {
  callbackChange: () => void,
  callbackDelete: () => void
}

function ModalChange({callbackChange, callbackDelete}: ModalChangeProps) {
  return (
    <div className='modal'>
      <button className="modal__button modal__button_change" onClick={callbackChange}>Изменить</button>
      <button className="modal__button modal__button_delete" onClick={callbackDelete}>Удалить</button>
    </div>
  );
}

export default ModalChange;