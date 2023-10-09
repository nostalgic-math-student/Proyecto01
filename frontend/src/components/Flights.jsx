import React, { useState } from 'react'
import List from './List.js'
import Search from './Search.jsx';

const Flights = () => {

  const [queryInput, setQueryInput] = useState("");

let inputHandler = (event) => {
  var lowerCase = event.target.value;
  setQueryInput(lowerCase);
};


  return (
    <div className="md:container mx-auto space-y-16 ">
      <div className="form-control margi">
        <Search />
      </div>


      <div className='mockup-window border bg-base-300 space-y-4 mx-auto'>
        <h1>Search temperature by city (search your city!)</h1>
        <input id='climaIata' type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={queryInput.toLowerCase()} onChange={inputHandler} />
      </div>
        <List input={queryInput}></List>

    </div>
  )
}

export default Flights