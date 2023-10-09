import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputComponent from './InputComponent';
import Stats from './Stats';

/**
 * Componente "Search" que permite buscar temperaturas por número de ticket.
 * 
 * Este componente facilita la búsqueda de temperaturas para los destinos de un vuelo
 * utilizando el número de ticket como entrada.
 * 
 * @returns {JSX.Element} El componente de React que permite buscar temperaturas por número de ticket.
 */ 
function Search() {

    const [Ticket, setTicket] = useState({});
    const [ActiveTicket, setActiveTicket] = useState(false)
    const [Error, setError] = useState(false);
  

    /**
     * Función `handleExecute` que busca la temperatura de los destinos en el ticket mediante la API del proyecto.
     * 
     * @param {string} id_ticket - El número de ticket de vuelo.
     */
    const handleExecute = (id_ticket) => {
      const apiUrl = `http://127.0.0.1:5000/climaTicket?ticket=${id_ticket}`;
      
        fetch(apiUrl).then(
          response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then(
            data => {
              setTicket(data);
              console.log(Ticket)
              setError(false)
              setActiveTicket(true)
            }
          ).catch((error) => {
            console.error("Error fetching data:", error);
            setError(true);
            setActiveTicket(false);
          })
    }

  return (
    <div>
      <h2>Check your Flight Weather here! </h2>
      <InputComponent onExecute={handleExecute} />
      {Error && (<a> Please provide a valid ticket ID
      </a>)}
      {ActiveTicket && (<div className='carousel'>
      <Stats temperature={Ticket.o_weather} name={Ticket.origin} location={"Origin"} humidity={Ticket.o_humidity} pressure={Ticket.o_pression} weather={Ticket.o_nubosity} />
      <Stats temperature={Ticket.d_weather} name={Ticket.destination} location={"Destination"} humidity={Ticket.d_humidity} pressure={Ticket.d_pression} weather={Ticket.d_nubosity} />
      </div>
      )
      }
    </div>
  );
}

export default Search;
