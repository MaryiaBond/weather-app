import * as React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import Header from "../../organisms/Header";
import CurrentWeather from "../../organisms/CurrentWeather";
//import { Context } from "../../../context";

//interface IChangeCity {
//	changeCity(city: string): void;
//}

function Weather() {
  const [currentCity, setcurrentCity] = useState("Minsk");

  const changeCity = (
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    city: string
  ) => {
    setcurrentCity(city);
    //console.log(currentCity);
  };

  return (
    <main className={styles.weather}>
      <Header currentCity={currentCity} changeCity={changeCity} />
      <CurrentWeather currentCity={currentCity} />
    </main>
  );
} //  , useContext  <Context.Provider value={{ currentCity }}>  </Context.Provider>
//import React from "react";
//export const Context = React.createContext();

export default Weather;
