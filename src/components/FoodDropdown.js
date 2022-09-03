import React, { Component } from 'react';
import { useEffect, useState } from "react";

import CreatableSelect from 'react-select/creatable';

const FoodDropdown = (props) => {
    const handleChange = (options) => {
        const selection = options.value
        props.onChange(selection)
    } 

    const [foodType, setFoodType] = useState("");

    const getFood = async () => {
        try {
          let res = await fetch("https://4qcow4.deta.dev/foods/", {
            method: "GET",
            mode: "cors",
            headers: {
              "Authorization": `Bearer ${props.jwt}`, 
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          let resJson = await res.json();
          if (res.status === 200) {
            const foodTypeList = new Set(resJson.map(foodEntry => foodEntry.food_type));
            setFoodType(Array.from(foodTypeList).map(food => ({value: food, label: food})));
            console.log(foodTypeList);
          } else {
            console.log();
          }
        } catch (err) {
          console.log(err);
        }
      }
    
      useEffect(() => {
        if (!props.jwt){
          return () => {};
        }
        getFood();
      }, [props.jwt]);
    
    return (
      <CreatableSelect
        isClearable
        value={{"value": props.value, "label": props.value}}
        onChange={handleChange}
        options={foodType}
      />
    );
}

export default FoodDropdown;