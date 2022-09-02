import "./App.css";
import FoodAdder from "./components/FoodAdder.js"
import Login from "./components/Login.js"

import { useEffect, useState } from "react";

function App() {
  useEffect(() => {setJwt(localStorage.getItem("jwt"))}, [])
  const [jwt, setJwt] = useState("");
  const handleJwt = (jwt) => {
    setJwt(jwt); 
    localStorage.setItem("jwt", jwt);
  };
  return (<div>{jwt ? <FoodAdder jwt={jwt}/> : <Login handleJwt={handleJwt}/>}</div>
          /* <div></div> */
  );
}

export default App;
