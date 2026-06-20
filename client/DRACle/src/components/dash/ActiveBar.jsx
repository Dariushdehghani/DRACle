import styles from "../../styles/ActiveBar.module.scss"
import { DashBox } from "../boxes/DashBox"

export default function ActiveBar() {
    return(
        <DashBox width={55} >
            <h1>hola!hello!halo!salam!</h1>
            <div className={styles.row} ></div>
        </DashBox>
    )
}