import * as React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

interface IProps {
  currentCity: string;
  city: string;
  id: string;
  isChecked: boolean;
  markCity(event: React.MouseEvent<HTMLInputElement>, id: string): void;
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
}

const City: React.FC<IProps> = (props: IProps) => {
  return (
    <NavLink to={"/days3/" + props.currentCity} className={styles.cityLabel}>
      <div
        id={props.id}
        className={styles.cityInput}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          props.changeCity(event, props.id);
          props.markCity(event, props.id);
        }}
      >
        <span
          className={styles.cityName}
          style={
            props.isChecked
              ? { border: "0.5px solid rgb(139, 21, 21)" }
              : { border: "0" }
          }
        >
          {props.city}
        </span>
      </div>
    </NavLink>
  );
}; // onChange={}

export default City;

//onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//	props.markCity(event, props.id);
//}}
//
