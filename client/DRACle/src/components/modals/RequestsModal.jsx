import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import Modal from "../Modal";
import RequestObj from "../RequestObj";
import styles from "../../styles/RequestsModal.module.scss"
import { AnimatePresence } from "framer-motion";

export default function RequestsModal({ open, onClose }) {
  const { academyId } = useAuth();
  const [requests, setRequests] = useState([]);

  const get_requests = async () => {
    try {
      const res = await api.get(
        `fetch/classes/academy/${academyId}/fetchRequests`,
      );

      setRequests(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  const delete_happened = ({name, role}) => {
    const index = requests.filter(req => req.username === name && req.role === role)
    setRequests(index)
  }

  useEffect(() => {
    if (open && academyId) {
      get_requests();
    }
  }, [open, academyId]);

  return (
    <Modal open={open} onClose={onClose}>
      <h2>Join requests</h2>
      <div className={styles.requestsBox}>
        <AnimatePresence>
          {requests.length > 0 &&
            requests.map((req) => (
              <RequestObj
                key={requests.indexOf(req)}
                uid={req.userId}
                name={req.username}
                message={req.message}
                role={req.role}
                updatededAt={req.updatededAt}
                onChange={delete_happened}
              />
            ))}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
