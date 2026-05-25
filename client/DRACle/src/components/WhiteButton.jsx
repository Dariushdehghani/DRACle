import styles from "../styles/WhiteButton.module.scss"

export default function WhiteButton({
    text: Text,
    ...props
}) {
    return(<button className={styles.button} {...props} >{Text}</button>)
}