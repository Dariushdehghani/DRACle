import { Check, Loader } from "lucide-react";
import DefaultInput from "../DefaultInput";
import Modal from "../Modal";
import SButton from "../SButton";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import DraSelector from "../DraSelector";
import styles from "../../styles/createClass.module.scss";

export default function CreateClassModal({ open, onClose }) {
  const { user, academy, role, academyId } = useAuth();
  const [error, setError] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const Facademy = user.memberships.find((m) => m.academy === academy);
    await api
      .post(`/academies/${Facademy.academyId}/${name}/create`)
      .then((res) => {
        if (res.data.message === "successfull") {
          onClose();
        } else if (res.data.message === "exists") {
          setError(true);
        } else if (res.data.message === "permission") {
          alert("you're not an admin");
        } else {
          alert("server err! please try again later");
        }
      });
  }

  async function getTeachers() {
    await api
      .get(
        `http://localhost:5000/api/fetch/classes/academy/${academyId}/teachers`,
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      });
  }

  getTeachers();

  return (
    <Modal open={open} onClose={onClose}>
      <h2>create class</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <DefaultInput error={error} name="name" placeholder="Class name" />
        <DraSelector
          display="teacher"
          items={teachers}
          selected={selectedTeacher}
          setSelected={setSelectedTeacher}
        />
        <SButton type="submit" icon={Check} />
      </form>
      {loading && (
        <div className={styles.loading}>
          <Loader size={30} className={styles.loader} />
        </div>
      )}
    </Modal>
  );
}
