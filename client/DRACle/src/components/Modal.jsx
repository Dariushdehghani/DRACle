import styles from "../styles/modal.module.scss";
import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.overlay}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
}
