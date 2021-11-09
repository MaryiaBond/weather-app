import * as React from "react";
import styles from "./styles.module.scss";
import { useState } from "react";
import City from "../../atoms/City";

interface ICity {
  city: string;
  id: string;
  isChecked: boolean;
}

interface IChangeCity {
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
}

const PresetСities: React.FC<IChangeCity> = (props: IChangeCity) => {
  const [cities, setCities] = useState<ICity[]>([
    { city: "Minsk", id: "Minsk", isChecked: true },
    { city: "Moskva", id: "Moskva", isChecked: false },
    { city: "Bratislava", id: "Bratislava", isChecked: false },
  ]);

  const markCity = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const arr: ICity[] = [...cities];
    // eslint-disable-next-line array-callback-return
    arr.map((element) => {
      if (element.id === id) {
        element.isChecked = !element.isChecked;
      }
    });
    setCities(arr);
  };

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
        />
      ))}
    </div>
  );
}; // city="Minsk"  changeCity={changeCity}

export default PresetСities;
