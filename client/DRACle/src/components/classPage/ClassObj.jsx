import { Link } from "lucide-react";
import styles from "../../styles/classObj.module.scss";
import TextButton from "../TextButton";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ClassObj({
  expanded,
  uid,
  name,
  description,
  online,
  attendLink,
  chatLink,
  showMembers,
  ...props
}) {
  const navigate = useNavigate();
  return (
    <motion.div className={styles.wrapper} {...props}>
      <div className={styles.head} onClick={() => showMembers(uid)}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <AnimatePresence>
        {!expanded && (
          <motion.div className={styles.foot}>
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
          </motion.div>
        )}
        {}
      </AnimatePresence>
    </motion.div>
  );
}
