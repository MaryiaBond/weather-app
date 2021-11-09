import * as React from "react";
import styles from "./styles.module.scss";
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
  return (
    <section className={styles.header}>
      <Title />
      <PresetСities changeCity={props.changeCity} />
      <CitySearch
        changeCity={props.changeCity}
        currentCity={props.currentCity}
      />
    </section>
  );
};

export default Header;
