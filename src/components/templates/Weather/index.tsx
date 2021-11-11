import * as React from "react";
import styles from "./styles.module.scss";
import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from "../../organisms/Header";
import CurrentWeather from "../../organisms/CurrentWeather";
import Weather3Days from "../../organisms/Weather3Days";
import Weather8Days from "../../organisms/Weather8Days";

import { Route, Switch } from "react-router-dom";
//import { Context } from "../../../context";

//interface IChangeCity {
//	changeCity(city: string): void;
//}

function Weather() {
  const [currentCity, setcurrentCity] = useState("Minsk");
  const [coord, setCoord] = useState([0, 0]);

  const changeCity = (
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    city: string
  ) => {
    setcurrentCity(city);
    //console.log(currentCity);
  };

  const changeCoordinates = (lat: number, lon: number) => {
    setCoord([lat, lon]);
    //console.log(currentCity);
  };

  return (
    <main className={styles.weather}>
      <Header currentCity={currentCity} changeCity={changeCity} />
      <CurrentWeather
        currentCity={currentCity}
        changeCoordinates={changeCoordinates}
      />
      <Switch>
        <Route exact path="/:city">
          {({ match }) => <Weather3Days currentCity={currentCity} />}
        </Route>
        <Route path="/:city">
          {({ match }) => (
            <Weather8Days
              currentCity={currentCity}
              lat={coord[0]}
              lon={coord[1]}
              match={match as any}
              setCoord={setCoord}
            />
          )}
        </Route>
      </Switch>
    </main>
  );
} //  , useContext  <Context.Provider value={{ currentCity }}>  </Context.Provider>
//import React from "react";
//export const Context = React.createContext();
// <BrowserRouter>  </BrowserRouter>
// <Routes>  </Routes>
//  <Route path="/">  </Route>

export default Weather;
