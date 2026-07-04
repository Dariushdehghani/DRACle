import { scale, motion } from "framer-motion";
import styles from "../styles/FitButton.module.scss";

export default function FitButton({ icon: Icon, bg, content, ...props }) {
  return (
    <motion.button
      style={{ background: bg || "var(--accent)" }}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 1.05 }}
      {...props}
      className={styles.button}
    >
      {Icon && <Icon size={22} className={styles.icon} />}
      {content}
    </motion.button>
  );
}
