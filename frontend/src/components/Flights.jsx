import React, { useState } from 'react';
import List from './List.js';
import Search from './Search.jsx';

/**
 * Componente principal para la búsqueda de vuelos y consulta de temperatura.
 * 
 * Este componente contiene la funcionalidad principal de la aplicación.
 * Permite al usuario buscar vuelos y consultar la temperatura por ciudad.
 * 
 * @returns {JSX.Element} El componente de React que representa la página principal de la aplicación.
 */
const Flights = () => {

  // Estado local para almacenar la consulta de búsqueda.
  const [queryInput, setQueryInput] = useState("");

  /**
   * Manejador de eventos para la entrada de búsqueda.
   * 
   * Esta función se llama cuando el usuario ingresa texto en el campo de búsqueda.
   * Actualiza el estado con el valor en minúsculas del texto de búsqueda.
   * 
   * @param {object} event - El evento de cambio de entrada.
   */
  let inputHandler = (event) => {
    var lowerCase = event.target.value;
    setQueryInput(lowerCase);
  };

  
  return (
<<<<<<< HEAD
    <div className="md:container mx-auto space-y-16">
      <div className="form-control margi">
        {/* Componente de búsqueda */}
        <Search />
      </div>
      <div className='mockup-window border bg-base-300'>
        <h1>Alerta! Todavía en desarrollo</h1>
        <h1>Buscar temperatura por ciudad (¡busca tu ciudad!)</h1>
        {/* Campo de entrada de búsqueda */}
        <input type="text" placeholder="Buscar" className="input input-bordered w-24 md:w-auto" value={queryInput.toLowerCase()} onChange={inputHandler} />
        {/* Componente de lista para mostrar resultados */}
        <List input={queryInput}></List>
      </div>
=======
    <div className="md:container mx-auto space-y-16 ">
      <div className="form-control margi">
        <Search />
      </div>


      <div className='mockup-window border bg-base-300 space-y-4 mx-auto'>
        <h1>Search temperature by city (search your city!)</h1>
        <input id='climaIata' type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={queryInput.toLowerCase()} onChange={inputHandler} />
      </div>
        <List input={queryInput}></List>

>>>>>>> 546c38a6e253e8b6a6ebdef6de38c0dfed1b259d
    </div>
  )
}

export default Flights;
