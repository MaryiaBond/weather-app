/* eslint-disable no-unreachable */
import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
//import CurrentWeather from "../../organisms/CurrentWeather";

type MainDataType = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
};

interface IDataType {
  main: MainDataType;
  clouds: { all: number };
  dt: number;
  dt_txt: string;
}

interface IDataList {
  list: IDataType[];
  city: { timezone: number };
}

interface IProps {
  currentCity: string;
  propsStatus: string;
  match: any;
}

const Weather3Days: React.FC<IProps> = (props: IProps) => {
  const [weather3Days, setWeather3Days] = useState<IDataList | undefined>();
  //const [timezone, setTimezone] = useState(10800);

  console.log(props.match.params.city);
  console.log(props.propsStatus);
  console.log(props.currentCity);

  const getDays3Weather = (city: string) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=24&type=like&units=metric&appid=2767f783403ac9fedd6aa003a5194148`
    )
      .then((res) => res.json())
      .then((data: IDataList) => {
        if (data.list) {
          //console.log(data.list);
          setWeather3Days(data);
        }
      });
  };

  const getMomentTime = (dt: number, timezone: number, dt_txt: string) => {
    //console.log(+dt_txt.slice(10, 13) + timezone / 3600);
    const nd = new Date((dt - 21600) * 1000 + 1000 * timezone);
    const result = nd.toLocaleString().slice(0, 17);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const day = days[nd.getDay()];
    const time = result + ", " + day;
    return time;
  };

  const getStyle = (dt: number, tz: number) => {
    switch (dt + tz / 3600) {
      case 3:
        return true;

        break;
      case 4:
        return true;
        break;
      case 5:
        return true;
        break;
      case 27:
        return true;
        break;
      case 28:
        return true;
        break;
      case 29:
        return true;
      default:
        return false;
    }
  };

  console.log(props.match.params.city);
  console.log(props.propsStatus);
  console.log(props.currentCity);

  useEffect(() => {
    console.log(props.currentCity);
    console.log(props.match.params.city);
    if (
      props.currentCity !== "/" &&
      props.match.params.city &&
      props.propsStatus === ""
    )
      getDays3Weather(props.match.params.city);
    else if (props.currentCity === "/") getDays3Weather("Minsk");
    else getDays3Weather(props.currentCity);
    // eslint-disable-next-line
  }, [props.currentCity, props.match.params.city]);

  //console.log(weather3Days);

  //console.log(props.currentCity);

  return (
    <div className={styles.days3}>
      <ul>
        {weather3Days?.list.map((element, index) => (
          <li
            key={index}
            className={styles.partOfDay}
            style={
              getStyle(
                +element.dt_txt.slice(10, 13),
                weather3Days.city.timezone
              )
                ? { backgroundColor: "rgb(148, 109, 240)", color: "#fff" }
                : { backgroundColor: "rgb(238, 207, 236)" }
            }
          >
            <span className={styles.moment}>
              {getMomentTime(
                element.dt,
                weather3Days.city.timezone,
                element.dt_txt
              )}
            </span>
            <span className={styles.moment}>{element.main.temp}&#8451;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}; // onClick={(event: React.MouseEvent<HTMLElement>) => { 	getCurrentWeather(); }}
// , useContext  const currentCity: any = useContext(Context);
// {Math.floor(currentWeather.temp * 10) / 10} &#8451;   {currentWeather.humidity}%
// style={(+element.dt_txt.slice(11, 15) + weather3Days.city.timezone / 3600 === 24)
//	? { backgroundColor: "rgb(148, 109, 240)", color: "#fff" }
//	: { backgroundColor: "rgb(238, 207, 236)" }
//}
//  {getMomentTime(element.dt, weather3Days?.city.timezone)}

export default Weather3Days;
