import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "../styles/roleSelection.module.scss";
import "../styles/globals.scss";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TextButton from "../components/TextButton.jsx";
import { Plus } from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { user, setRole, setAcademy, setAcademyId, loading } = useAuth();
  const from = location.state?.from || "/dash";

  if (loading) {
    return;
  }

  const availableRoles = user.memberships;
  const requests = user.requests;

  const selectRole = ({ role, academy, academyId }) => {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("academy", academy);
    sessionStorage.setItem("academyId", academyId);
    setRole(role);
    setAcademy(academy);
    setAcademyId(academyId)
    navigate(from);
  };

  console.log(availableRoles);

  return (
    <div className={styles.container}>
      <h1>{availableRoles.length ? `${t("signin")} ${t("as")}:` : ""}</h1>
      {availableRoles?.map((role) => (
        <motion.button
          className={styles.button}
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 1.05 }}
          key={availableRoles.indexOf(role)}
          onClick={() => selectRole(role)}
        >
          {t(role.role)} {t("in")} {role.academy}
        </motion.button>
      ))}
      <h1>{requests.length ? `${t("pending")} ${t("requests")}:` : ""}</h1>
      {requests?.map((role) => (
        <button
          disabled
          className={`${styles.button} ${styles.disabled}`}
          key={requests.indexOf(role)}
        >
          {t(role.requestedRole)} {t("in")} {role.academy}
        </button>
      ))}
      <TextButton
        content={
          <>
            <Plus />
            {t("add new academy")}
          </>
        }
      />
    </div>
  );
}
