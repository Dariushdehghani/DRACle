import styles from "../styles/textbtn.module.scss"

export default function TextButton({
    content,
    ...props
}) {
    return <button {...props} className={styles.button} >{content}</button>
}