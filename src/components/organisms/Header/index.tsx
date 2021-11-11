import * as React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import Title from "../../atoms/Title";
import PresetСities from "../../molecules/PresetCities";
import CitySearch from "../../molecules/CitySearch";

interface IChangeCity {
  changeCity(
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    city: string
  ): void;
  currentCity: string;
}

const Header: React.FC<IChangeCity> = (props: IChangeCity) => {
  const [numberOfDays, setNumberOfDays] = React.useState("days3");
  return (
    <section className={styles.header}>
      <Title />
      <PresetСities
        currentCity={props.currentCity}
        changeCity={props.changeCity}
        numberOfDays={numberOfDays}
      />
      <CitySearch
        changeCity={props.changeCity}
        currentCity={props.currentCity.toUpperCase()}
      />
      <NavLink to={`/${numberOfDays}`} onClick={() => setNumberOfDays("days8")}>
        <button>To 8 days</button>
      </NavLink>
      <NavLink to={`/${numberOfDays}`} onClick={() => setNumberOfDays("days3")}>
        <button>To 3 days</button>
      </NavLink>
    </section>
  );
};

export default Header;
