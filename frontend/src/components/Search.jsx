import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputComponent from './InputComponent';
import Stats from './Stats';

/* 
Componente "Search" donde generamos la busqueda de temperaturas por ticket
*/
function Search() {

    const [Ticket, setTicket] = useState({});
    const [ActiveTicket, setActiveTicket] = useState(false)
    const [Error, setError] = useState(false);
  

    /* 
    Arrow Function que nos ayuda a localizar la temperatura de los destinos en el ticket mediante la API del proyecto
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
      <h2>¡Consulta el clima de tu vuelo aquí!</h2>
      <InputComponent onExecute={handleExecute} />
      {Error && (<a> Porfavor intruduce un ticket valido
      </a>)}
      {ActiveTicket && (<div className='carousel'>
      <Stats weather={Ticket.o_weather} name={Ticket.origin} where={"Origin"}/>
      <Stats weather={Ticket.d_weather} name={Ticket.destination} where={"Destination"}/>
      </div>
      )
      }
    </div>
  );
}

export default Search;
