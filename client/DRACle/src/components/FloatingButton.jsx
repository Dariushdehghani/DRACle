import styles from "../styles/roundButton.module.scss";
import { motion } from "framer-motion";

export default function FloatingButton({ content, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 1.05 }}
      className={styles.button}
      {...props}
    >
      {content}
    </motion.button>
  );
}
