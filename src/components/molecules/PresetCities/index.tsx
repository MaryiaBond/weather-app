import * as React from "react";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import City from "../../atoms/City";

interface ICity {
  city: string;
  id: string;
  isChecked: boolean;
}

interface IChangeCity {
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
  currentCity: string;
  daysAmount: string;
}

const PresetСities: React.FC<IChangeCity> = (props: IChangeCity) => {
  const [cities, setCities] = useState<ICity[]>([
    { city: "Minsk", id: "Minsk", isChecked: true },
    { city: "Moskva", id: "Moskva", isChecked: false },
    { city: "Bratislava", id: "Bratislava", isChecked: false },
  ]);

  const markCity = (event: React.MouseEvent<HTMLInputElement>, id: string) => {
    const arr: ICity[] = [...cities];
    // eslint-disable-next-line array-callback-return
    arr.map((element) => {
      if (element.id === id) {
        element.isChecked = true;
      } else {
        element.isChecked = false;
      }
    });
    setCities(arr);
  };

  const unMarkAllCities = () => {
    if (
      props.currentCity !== "Minsk" &&
      props.currentCity !== "Moskva" &&
      props.currentCity !== "Bratislava"
    ) {
      const arr: ICity[] = [...cities];
      // eslint-disable-next-line array-callback-return
      arr.map((element) => {
        element.isChecked = false;
      });
      setCities(arr);
    }
  };

  useEffect(() => {
    unMarkAllCities();
    // eslint-disable-next-line
  }, [props.currentCity]);

  return (
    <div className={styles.preset}>
      {cities.map((element) => (
        <City
          key={element.city}
          id={element.id}
          city={element.city}
          isChecked={element.isChecked}
          markCity={markCity}
          changeCity={props.changeCity}
          currentCity={props.currentCity}
          daysAmount={props.daysAmount}
        />
      ))}
    </div>
  );
}; // city="Minsk"  changeCity={changeCity}

export default PresetСities;
