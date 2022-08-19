import "./App.css";
import { useState } from "react";

function App() {
  const [foodType, setFoodType] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://4qcow4.deta.dev/add", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        body: new URLSearchParams({food: foodType, amount: amount}),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFoodType("");
        setAmount("");
        setMessage("Food Type and Amount Sent successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div className="App">

      <form onSubmit={handleSubmit}>
      <h1>JmsTracker Frontend</h1>
      <br></br>
        <input
          type="text"
          value={foodType}
          placeholder="Food Type"
          onChange={(e) => setFoodType(e.target.value)}
        />
        <input
          type="text"
          value={amount}
          placeholder="Amount (per 100 grams)"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
