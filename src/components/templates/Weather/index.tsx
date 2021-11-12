import * as React from "react";
import styles from "./styles.module.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../organisms/Header";
import CurrentWeather from "../../organisms/CurrentWeather";
import Weather3Days from "../../organisms/Weather3Days";
import Weather8Days from "../../organisms/Weather8Days";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
//import { Context } from "../../../context";

//interface IChangeCity {
//	changeCity(city: string): void;
//}

function Weather() {
  const location = useLocation();
  const [daysAmount, setDaysAmount] = useState("days3");
  const [currentCity, setcurrentCity] = useState(
    location.pathname !== "/" ? location.pathname.replace(/.+\//g, "") : "Minsk"
  );
  const [propsStatus, setpropsStatus] = useState("");
  //const [coord, setCoord] = useState([0, 0]);

  const newDaysAmount = (arg: string) => {
    setDaysAmount(arg);
    console.log(location.pathname.slice(1, 6));
    console.log(daysAmount);
    console.log(currentCity);
  };

  const changeCity = (
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    city: string
  ) => {
    setcurrentCity(city);
    setpropsStatus(city);
    //console.log(currentCity);
  };

  //const changeCoordinates = (lat: number, lon: number) => {
  //  setCoord([lat, lon]);
  //  //console.log(currentCity);
  //};
  let history = useHistory();
  useEffect(() => {
    if (currentCity) {
      history.push({
        pathname: "/" + daysAmount + "/" + currentCity,
      });
    }

    // eslint-disable-next-line
  }, [currentCity, daysAmount]);
  return (
    <main className={styles.weather}>
      <Header
        changeCity={changeCity}
        currentCity={currentCity}
        propsStatus={propsStatus}
        newDaysAmount={newDaysAmount}
        daysAmount={daysAmount}
      />

      <CurrentWeather currentCity={currentCity} propsStatus={propsStatus} />

      <Switch>
        {/* <Route exact path="/">
          <Redirect to={`/days3/Minsk`} />
        </Route> */}
        <Route exact path={`/days3/:city`}>
          {({ match }) => (
            <Weather3Days
              currentCity={currentCity}
              propsStatus={propsStatus}
              match={match as any}
            />
          )}
        </Route>
        <Route exact path={`/days8/:city`}>
          {({ match }) => (
            <Weather8Days
              currentCity={currentCity}
              propsStatus={propsStatus}
              match={match as any}
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
// <Header currentCity={currentCity} changeCity={changeCity} />
// <CurrentWeather currentCity={currentCity} />

export default Weather;
