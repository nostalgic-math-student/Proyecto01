import React, { useState } from 'react'
import List from './List.js'


const Flights = () => {

  const [queryInput, setQueryInput] = useState("");
  const IATA = ["Mexico", "Hello"]

let inputHandler = (event) => {
  //convert input text to lower case
  var lowerCase = event.target.value;
  setQueryInput(lowerCase);
};


  return (
<div className="md:container mx-auto">
<div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={queryInput.toLowerCase()} onChange={inputHandler}/>
      <List input={queryInput}></List>
    </div>
</div>
  )
}

export default Flights