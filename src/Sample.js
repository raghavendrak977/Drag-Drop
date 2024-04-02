import React, { useState } from "react";

function Sample() {
  let [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>{counter}</h1>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          if(e.target.value<=10)
          {
            let one=e.target.value++
            setCounter(one);
            if(one ===10)
            {
                alert("this is the maximum value")
            }
          }
          else{
            return counter
          }
        }}
      >
        increment
      </button>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          if( counter<=10   && counter>=0 )
          {
           let one= --counter

            setCounter(one);
            if(counter===0)
            {
                alert("this is the minimum value")
            }
          }
          else{
            return counter
          } 
        }}>
        decrement
      </button>
    </div>
  );
}
export default Sample;
