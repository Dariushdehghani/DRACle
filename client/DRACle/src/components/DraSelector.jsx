import { ChevronDown } from "lucide-react";
import styles from "../styles/selector.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function DraSelector({
  display,
  items,
  defaultItem,
  selected,
  setSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function handleSelect(name) {
    setSelected(name)
    setIsOpen(false)
  }
  return (
    <div style={{ position: "relative" }}>
      <motion.div
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        className={styles.input_box}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <label>{selected? selected : display}</label>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
            className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
          >
            {items?.map((i) => (
              <li key={items.indexOf(i)} onClick={() => handleSelect(i.name)}>
                {i.name}
              </li>
            ))}
            {!!items && <p style={{ color: "gray" }}>no items available</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
