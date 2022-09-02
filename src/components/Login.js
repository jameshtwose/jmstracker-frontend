import "../App.css";
import { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://4qcow4.deta.dev/login", {
            method: "POST",
            mode: "cors",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            body: new URLSearchParams({ username: email, password: password }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            props.handleJwt(resJson.access_token);
            setEmail("");
            setPassword("");
            setMessage("Login successful");
          } else {
            setPassword("");
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };
    
    return(<div className="Login">
    <form onSubmit={handleSubmit}>
    <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
    <input
          type="password"
          value={password}
          placeholder="Please input your password"
          onChange={(e) => setPassword(e.target.value)}
        />
    <button type="submit">Login</button>
    <div className="message">{message ? <p>{message}</p> : null}</div>
    </form>
    </div>);
}

export default Login;
