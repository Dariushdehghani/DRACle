import { Check } from "lucide-react";
import styles from "../styles/task.module.scss";

export default function Task({ title, done, duration, color, ...props }) {
  return (
    <div className={`${styles.task} ${done ? styles.done : ""}`}>
      <label className={styles.wrapper}>
        <input type="checkbox" checked={done} disabled />
        <span className={styles.span}>
          <Check color="gray" />
        </span>
        <div>
          <h3>{title}</h3>
          <p>{duration}</p>
        </div>
      </label>
      <span
        className={styles.color}
        style={{ backgroundColor: `var(--${color})` }}
      ></span>
    </div>
  );
}
