import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  // Estados para almacenar datos, estado de carga, error y datos de los tickets, origenes y destinos.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [Origins, setOrigins] = useState([]);
  const [Destinations, setDestinations] = useState([]);
  
  // Efecto para cargar datos.
  useEffect(() => {
    fetch("http://127.0.0.1:5000/table2")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
        setOrigins(Object.values(data.origin));
        setDestinations(Object.values(data.destination));
        setTickets(Object.values(data.num_ticket));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);
    
  // Crear datos de la tabla combinando tickets, origenes y destinos.
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
              <th>Ticket</th>
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
