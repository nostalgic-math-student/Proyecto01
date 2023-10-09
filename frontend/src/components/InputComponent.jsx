import React, { useState } from 'react';

/* 
Componente encargado de dar valor a la busqueda de tickets
*/
function InputComponent(props) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    props.onExecute(inputValue);
  };

  return (
    <div>
      <input id='climaTicket' className='input input-bordered w-24 md:w-auto'
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Ingresa tu ticket"
      />
      <button className='btn btn-active btn-accent' onClick={handleButtonClick}>Ejecutar</button>
    </div>
  );
}

export default InputComponent;
