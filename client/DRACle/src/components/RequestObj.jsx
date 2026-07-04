import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/RequestObj.module.scss";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SButton from "./SButton";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import FitButton from "./FitButton";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function RequestObj({
  uid,
  name,
  message,
  role,
  updatededAt,
  onChange,
}) {
  const date = new Date(updatededAt);
  const dateText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const [isExpanded, setIsExpanded] = useState(false);
  const { academyId } = useAuth();

  const acceptReq = async () => {
    console.log(uid)
    const res = await api.post(
      `/fetch/classes/academy/${academyId}/requests/accept`,
      { userId: uid }
    );
    if (res.body.message === "done") {
      onChange({ name, role });
    }
  };
  return (
    <div
      className={styles.box}
      onClick={(e) => {
        setIsExpanded(!isExpanded);
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.row}>
        <ChevronDown
          style={{
            transform: isExpanded ? "rotate(-180deg)" : "none",
            transition: 0.2 + "s",
          }}
        />
        <h3>
          {name} as {role}
        </h3>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.div}
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
          >
            <p>
              Do you wanna add {name} to this academy as a {role}?
            </p>
            {message && <p>message: {message}</p>}
            <div className={styles.row}>
              <FitButton
                bg="green"
                content="Accept"
                onClick={() => acceptReq()}
              />
              <FitButton
                bg="red"
                content="Decline"
                onClick={() => declineReq()}
              />
            </div>
            <p>last update: {dateText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
