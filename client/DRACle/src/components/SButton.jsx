import { scale, motion } from "framer-motion";
import styles from "../styles/SButton.module.scss"

export default function SButton({
    icon: Icon,
    ...props
}) {
    return (
      <motion.button whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.05 }} {...props} className={styles.button}>
        {Icon && <Icon size={22} className={styles.icon} />}
      </motion.button>
    );
}