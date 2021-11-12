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
  propsStatus: string;
  newDaysAmount(arg: string): void;
}

const Header: React.FC<IChangeCity> = (props: IChangeCity) => {
  console.log(props);
  return (
    <section className={styles.header}>
      <Title />
      <PresetСities
        currentCity={props.currentCity}
        changeCity={props.changeCity}
      />
      <CitySearch
        changeCity={props.changeCity}
        currentCity={props.currentCity.toUpperCase()}
      />
      {/*<NavLink to={"/days8/" + props.currentCity}>*/}
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          props.newDaysAmount("days8");
        }}
      >
        To 8 days
      </button>
      {/*</NavLink>*/}
      {/*<NavLink to={"/days3/" + props.currentCity}>*/}
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          props.newDaysAmount("days3");
        }}
      >
        To 3 days
      </button>
      {/*</NavLink>*/}
    </section>
  );
};

export default Header;
