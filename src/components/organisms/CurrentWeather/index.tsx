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
  timezone: number;
}

interface IProps {
  currentCity: string;
}

const CurrentWeather: React.FC<IProps> = (props: IProps) => {
  const [currentWeather, setCurrentWeather] = useState<
    MainDataType | { temp: number; humidity: number }
  >({ temp: 0, humidity: 0 });
  const [currentTime, setCurrentTime] = useState("");
  const [notFound, setNotFound] = useState("");
  const [offset, setoffset] = useState(10800);

  const getCurrentWeather = () => {
    setNotFound("");
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${props.currentCity}&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((data: IDataType) => {
        console.log(data);
        if (data.main) {
          setoffset(data.timezone);
          setCurrentWeather(data.main);
        } else setNotFound("City not found!");
      });
  };

  //const getCurrentTime = () => {
  //  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  //  const now = new Date();
  //  const month = new Date().toLocaleString("en", { month: "long" });
  //  const date = now.getDate();
  //  const day = days[now.getDay()];
  //  const hour = new Date().toLocaleString("en", {
  //    hour12: false,
  //    hour: "2-digit",
  //  });
  //  const minute = new Date().toLocaleString("en", { minute: "2-digit" });
  //  const time = `${month}, ${date}th, ${day}, ${hour}.${minute}`;
  //  setCurrentTime(time);
  //};

  const getCurrentTime = (offset: number) => {
    const d = new Date();
    console.log(d);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    console.log(utc);
    const nd = new Date(utc + 1000 * offset);
    console.log(nd);
    const result = nd.toLocaleString().slice(0, 17);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const day = days[nd.getDay()];
    const time = result + ", " + day;
    setCurrentTime(time);
  };

  useEffect(() => {
    getCurrentWeather();
    getCurrentTime(offset);
    // eslint-disable-next-line
  }, [props.currentCity, offset]);

  //console.log(currentWeather);

  //console.log(props.currentCity);

  return (
    <div className={styles.current}>
      <div className={styles.notFound}>{notFound}</div>
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
