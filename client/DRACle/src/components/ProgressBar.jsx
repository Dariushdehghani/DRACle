import styles from "../styles/ProgressBar.module.scss"

export default function ProgressBar() {
    return(
        <div className={styles.con} >
            <h1>Your weekly progress</h1>
            <div className={styles.row} ></div>
        </div>
    )
}