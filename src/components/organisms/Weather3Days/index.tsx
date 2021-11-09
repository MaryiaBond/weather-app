import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

type MainDataType = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
};

interface IDataType {
  main: MainDataType;
  clouds: { all: number };
  dt_txt: string;
}

interface IDataList {
  list: IDataType[];
}

interface IProps {
  currentCity: string;
}

const Weather3Days: React.FC<IProps> = (props: IProps) => {
  const [weather3Days, setWeather3Days] = useState<IDataList | undefined>();

  const getDays3Weather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${props.currentCity}&cnt=24&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((data: IDataList) => {
        //console.log(data.list[0]);
        if (data.list) setWeather3Days(data);
      });
  };

  useEffect(() => {
    getDays3Weather();
    // eslint-disable-next-line
  }, [props.currentCity]);

  console.log(weather3Days);

  //console.log(props.currentCity);

  return (
    <div className={styles.days3}>
      <ul>
        {weather3Days?.list.map((element, index) => (
          <li
            key={index}
            className={styles.partOfDay}
            style={
              element.dt_txt.slice(11, 16) === "00:00"
                ? { backgroundColor: "rgb(148, 109, 240)", color: "#fff" }
                : { backgroundColor: "rgb(238, 207, 236)" }
            }
          >
            <span className={styles.moment}>{element.dt_txt.slice(5, 16)}</span>
            <span>{element.main.temp}&#8451;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}; // onClick={(event: React.MouseEvent<HTMLElement>) => { 	getCurrentWeather(); }}
// , useContext  const currentCity: any = useContext(Context);
// {Math.floor(currentWeather.temp * 10) / 10} &#8451;   {currentWeather.humidity}%

export default Weather3Days;
