import "../App.css";
import { useEffect, useState } from "react";
import FoodDropdown from "./FoodDropdown.js"


function FoodAdder(props) {
  const [foodType, setFoodType] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://4qcow4.deta.dev/foods", {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${props.jwt}`, 
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ food_type: foodType, amount: amount }),
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

    <div className="FoodAdder">

      <form onSubmit={handleSubmit}>
        <h1>JmsTracker Frontend</h1>
        <br></br>
        {/* <input
          type="text"
          value={foodType}
          placeholder="Food Type"
          onChange={(e) => setFoodType(e.target.value)}
        /> */}
        <FoodDropdown
          value={foodType}
          onChange={(value) => setFoodType(value)}
          jwt={props.jwt}
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

export default FoodAdder;
