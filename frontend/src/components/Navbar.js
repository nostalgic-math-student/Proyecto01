import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar bg-primary -100">
  <div className="flex-1">
    <h1 className="btn btn-ghost normal-case text-xl">Weather Scanner </h1>
  </div>

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>All flights</a></li>
      <li tabIndex={0}>
        <details>
          <summary> My Flights</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>

  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
  )
}

export default Navbar