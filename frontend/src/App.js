import React, { useState } from 'react';
import Select from "react-select"
import Btn from "./Btn"


function App() {
  const [index, setIndex] = useState(0)
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      backgroundColor:state.isFocused ? "blue" : "red",
      // padding: 20,
     
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      // return { ...provided, opacity, transition };
    }
  }
  const changeIndex = () =>{
    setIndex(index+1)
  }
  return (
    <div className="App">
     <h1>hello</h1>
     <h2>{index}</h2>
     <Btn changeIndex={changeIndex} />
     <Select
      styles={customStyles}
      options={[{label:1,},{label:2}]}
      />
  
    </div>
  );
}

export default App;
