import styles from "../styles/AccentButton.module.scss"

export default function AccentButton({
    text: Text,
    ...props
}) {
    return <button className={styles.button} {...props} >{Text}</button>
}