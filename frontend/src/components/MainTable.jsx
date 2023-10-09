import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Componente `Table` que muestra una tabla de datos de vuelos.
 * 
 * @returns {JSX.Element} El componente de React que representa la tabla de datos.
 */
const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [Origins, setOrigins] = useState([]);
  const [Destinations, setDestinations] = useState([]);
  
  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos de la tabla.
    fetch("http://127.0.0.1:5000/table2")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log(data)
        setLoading(false)
        setOrigins(Object.values(data.origin));
        setDestinations(Object.values(data.destination));
        setTickets(Object.values(data.num_ticket));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
    }, []);
    
    
    // Mapea los datos de la tabla para su representación.
    const tableData = tickets.map((value, index) => {
      return {
        ticket: value,
        origin: Origins[index],
        destination: Destinations[index],
      };
    });
    
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th><table>Ticket</table></th>
              <th>Origin</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.ticket}</td>
              <td>{row.origin}</td>
              <td>{row.destination}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
