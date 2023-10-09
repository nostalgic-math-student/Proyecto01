import React, { useState } from 'react';

/**
 * Componente encargado de gestionar la entrada de búsqueda de tickets.
 * 
 * Este componente proporciona un campo de entrada de texto y un botón para
 * ejecutar una acción con el valor ingresado por el usuario.
 * 
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onExecute - Función a ejecutar cuando se hace clic en el botón.
 * 
 * @returns {JSX.Element} El componente de React que representa la entrada de búsqueda de tickets.
 */
function InputComponent(props) {
  const [inputValue, setInputValue] = useState('');

  /**
   * Manejador de eventos para el cambio en el campo de entrada.
   * Actualiza el estado con el valor ingresado por el usuario.
   * 
   * @param {object} e - El evento de cambio en la entrada de texto.
   */
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  /**
   * Manejador de eventos para el clic en el botón "Execute".
   * Ejecuta la función proporcionada en las propiedades con el valor ingresado.
   */
  const handleButtonClick = () => {
    props.onExecute(inputValue);
  };

  return (
    <div>
      <input id='climaTicket' className='input input-bordered w-24 md:w-auto'
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your Ticket ID"
      />
      <button className='btn btn-active btn-accent' onClick={handleButtonClick}>Execute</button>
    </div>
  );
}

export default InputComponent;
