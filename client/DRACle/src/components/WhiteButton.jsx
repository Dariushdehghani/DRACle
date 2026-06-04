import styles from "../styles/WhiteButton.module.scss"
import { motion } from "framer-motion"

export default function WhiteButton({
    text: Text,
    ...props
}) {
    return(<motion.button whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.05 }} className={styles.button} {...props} >{Text}</motion.button>)
}