import { DashBox } from "../boxes/DashBox";
import styles from "../../styles/clessesComponent.module.scss";

export default function Classes() {
  return (
    <DashBox width={45}>
      <div className={styles.rowHead}>
        <h1>Active classes</h1>
        <a href="#">Add classes</a>
      </div>
    </DashBox>
  );
}
