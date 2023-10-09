import React, { useState, useEffect } from 'react'

/* 
Navbar principal. 

Se buscó generar una navbar donde el componente adicional al proyecto sería Integración Web3 + Boletos de avión.
El usuario es capaz de conectar su cartera de criptomonedas mediante un botón localizado en la parte superior derecha
La funcionalidad deseada sería conectar un ticket que el tenga a su cartera mediante algún contrato futuro, por ejemplo un NFT representativo.
*/

const Navbar = () => {

  const localUrl = process.env.REACT_APP_URL;
  
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl" href={localUrl}> Weather Scanner </a>
      </div>
      <div className="navbar-center">

          <div className="dropdown">
            <button className="btn btn-ghost bg-primary">Actions</button>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li> <a href="/"> My flights </a></li>
              <li> <a href="/"> Past Flights </a></li>
            </ul>
          </div>

      </div>
      </div>
  )
}

export default Navbar