import { Link } from "lucide-react";
import styles from "../../styles/classObj.module.scss";
import TextButton from "../TextButton";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ClassObj({
  name,
  description,
  online,
  attendLink,
  chatLink,
}) {
  const [showMembers, setShowMembers] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {showMembers && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={setShowMembers(false)}
          />
        )}
      </AnimatePresence>

      <div className={styles.head} onClick={() => setShowMembers(true)}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.foot}>
        <TextButton
          content={
            <>
              <Link />
              attend
            </>
          }
        />
        <TextButton
          onClick={() => navigate("#")}
          content={
            <>
              <MessageCircle />
              open chat
            </>
          }
        />
      </div>
    </div>
  );
}
