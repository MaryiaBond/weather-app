import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type Days8DataType = {
  dt: number;
  clouds: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: { day: number; night: number };
};

interface IDataType {
  daily: Days8DataType[];
  timezone_offset: number;
}

interface IProps {
  currentCity: string;
  propsStatus: string;
  match: any;
}

const Weather8Days: React.FC<IProps> = (props: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weather8Days, setWeather8Days] = useState<IDataType | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [currentTime, setCurrentTime] = useState("");

  const getWeather8Days = (city: string) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((firstData) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${firstData.coord.lat}&lon=${firstData.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
        )
      )
      .then((res) => res.json())
      .then((data: IDataType) => {
        //console.log(data);
        if (data) {
          setWeather8Days(data);
        }
      });
  };

  const getMomentTime = (dt: number, timezone: number) => {
    //console.log(dt);
    //console.log(timezone);
    const nd = new Date((dt - 21600) * 1000 + 1000 * timezone);
    const result = nd.toLocaleString().slice(0, 10);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const day = days[nd.getDay()];
    const time = result + ", " + day;
    return time;
  };

  useEffect(() => {
    if (props.match.params.city && props.propsStatus === "")
      getWeather8Days(props.match.params.city);
    else getWeather8Days(props.currentCity);
    //getCurrentTime(offset);
    // eslint-disable-next-line
  }, [props.currentCity]);

  //console.log(currentWeather);

  //console.log(props.match.params.city);

  return (
    <div className={styles.days8}>
      <ul>
        {weather8Days?.daily.map((element, index) => (
          <li
            key={index}
            className={styles.day}
            style={
              index % 2
                ? { backgroundColor: "#def8f6" }
                : { backgroundColor: "rgb(228, 238, 207)" }
            }
          >
            <span className={styles.moment}>
              {getMomentTime(element.dt, weather8Days.timezone_offset)}
            </span>
            <span className={styles.moment}>
              night t: {element.temp.night}&#8451;
            </span>
            <span className={styles.moment}>
              day t: {element.temp.day}&#8451;
            </span>
          </li>
        ))}
      </ul>
      <button className={styles.toCurrent}>Forecast for 3 days</button>
    </div>
  );
};

export default Weather8Days;
