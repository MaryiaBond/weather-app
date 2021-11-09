import * as React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

interface IProps {
  currentCity: string;
  changeCity(event: React.KeyboardEvent<HTMLInputElement>, city: string): void;
}

const CitySearch: React.FC<IProps> = (props: IProps) => {
  const [sityName, setCityName] = useState("");

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="text"
          name="search-city"
          placeholder="search city"
          value={sityName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCityName(event.target.value);
          }}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              props.changeCity(event, sityName);
              setCityName("");
            }
          }}
        />
      </div>
      <span className={styles.selectedCity}>
        Weather in {props.currentCity}
      </span>
    </div>
  );
};

export default CitySearch;
