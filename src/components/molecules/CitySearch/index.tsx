import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

interface IProps {
  currentCity: string;
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
}

const CitySearch: React.FC<IProps> = (props: IProps) => {
  const [sityName, setCityName] = useState("");

  let history = useHistory();

  useEffect(() => {
    history.push({ pathname: "/days3/" + props.currentCity });
    // eslint-disable-next-line
  }, [props.currentCity]);

  console.log(props);

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
        />
        {/*<NavLink
          className={styles.searchLink}
          to={"/days3/" + props.currentCity}
        >*/}
        <button
          className={styles.searchButton}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            props.changeCity(event, sityName);
            setCityName("");
          }}
        >
          Find city
        </button>
        {/*</NavLink>*/}
      </div>
      <span className={styles.selectedCity}>
        Weather in <span className={styles.cityName}>{props.currentCity}</span>
      </span>
    </div>
  );
};

export default CitySearch;
