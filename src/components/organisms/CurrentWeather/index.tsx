import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type MainDataType = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

interface IDataType {
  main: MainDataType;
}

interface IProps {
  currentCity: string;
}

const CurrentWeather: React.FC<IProps> = (props: IProps) => {
  const [currentWeather, setCurrentWeather] = useState<
    MainDataType | { temp: number; humidity: number }
  >({ temp: 0, humidity: 0 });
  const [currentTime, setcurrentTime] = useState("");

  const getCurrentWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${props.currentCity}&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((data: IDataType) => {
        setCurrentWeather(data.main);
      });
  };

  const getCurrentTime = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const now = new Date();
    const month = new Date().toLocaleString("en", { month: "long" });
    const date = now.getDate();
    const day = days[now.getDay()];
    const hour = now.getHours();
    const minute = new Date().toLocaleString("en", { minute: "2-digit" });
    const time = `${month}, ${date}th, ${day}, ${hour}.${minute}`;
    setcurrentTime(time);
  };

  useEffect(() => {
    getCurrentWeather();
    getCurrentTime();
    // eslint-disable-next-line
  }, [props.currentCity]);

  console.log(currentWeather);

  //console.log(props.currentCity);

  return (
    <div className={styles.current}>
      <span className={styles.currentTime}></span>
      <button>GET</button>
      <div>{currentTime}</div>
      <div>{Math.floor(currentWeather.temp * 10) / 10} &#8451;</div>
      <div>RH {currentWeather.humidity}%</div>
    </div>
  );
}; // onClick={(event: React.MouseEvent<HTMLElement>) => { 	getCurrentWeather(); }}
// , useContext  const currentCity: any = useContext(Context);

export default CurrentWeather;
