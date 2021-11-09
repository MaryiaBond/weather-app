import * as React from "react";
import styles from "./styles.module.scss";

interface IProps {
  city: string;
  id: string;
  isChecked: boolean;
  markCity(event: React.ChangeEvent<HTMLInputElement>, id: string): void;
  changeCity(event: React.MouseEvent<HTMLElement>, city: string): void;
}

const City: React.FC<IProps> = (props: IProps) => {
  return (
    <label className={styles.cityLabel}>
      <input
        id={props.id}
        className={styles.cityInput}
        type="radio"
        name="tasks"
        checked={props.isChecked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.markCity(event, props.id);
        }}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          props.changeCity(event, props.id);
        }}
      />
      <span className={styles.cityName}>{props.city}</span>
    </label>
  );
}; // onChange={}

export default City;
