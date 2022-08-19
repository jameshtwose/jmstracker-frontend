import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //     mode: "cors",
  //     // credentials: 'omit',
  //     headers: {
  //       "content-type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     }
  //   };
  //   fetch("https://4qcow4.deta.dev/all-foods", requestOptions).then(
  //     response => response.json()
  //     ).then(
  //       data => {
  //         setBackendData(data)
  //       }
  //     )
  // }, [])

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      mode: "cors",
      // credentials: 'omit',
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
        body: new URLSearchParams({food: "Chocolate", amount: "1.5"})
    };
    fetch("https://4qcow4.deta.dev/add", requestOptions).then(
      response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
  }, [])

  return (
    <div>

      {/* {
          React.Children.toArray(
              backendData.map(({ id, amount, food_type, created_at }) => 
              <li>{food_type}: {amount}, date: {created_at}</li>
              )
          )
      } */}
      Sup

    </div>
  )
}

export default App