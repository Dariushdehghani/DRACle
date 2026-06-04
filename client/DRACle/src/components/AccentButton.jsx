import styles from "../styles/AccentButton.module.scss"
import { motion } from "framer-motion"

export default function AccentButton({
    text: Text,
    ...props
}) {
    return <motion.button whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.05 }} className={styles.button} {...props} >{Text}</motion.button>
}