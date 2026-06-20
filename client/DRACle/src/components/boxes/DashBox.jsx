import styles from "../../styles/dashBox.module.scss"

export function DashBox({
    children,
    width
}) {
    return (
        <div className={styles.box} style={{ width: width + "%" }} >
            { children }
        </div>
    )
}