import { t } from "i18next";
import styles from "../styles/Dashboard.module.scss"
import Menu from "../components/Menu";
import SearchField from "../components/SearchField";
import { Info } from "lucide-react";
import StudentDash from "../layouts/dash/studentDash";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminDash from "../layouts/dash/adminDash";

export default function Dashboard(){
  const { user, role } = useAuth()
  const select_layout = () => {
    switch (role) {
      case "student":
        return <StudentDash />
      case "owner" || "admin":
        return <AdminDash />
      default:
        return <Navigate to="/select-role" />
    }
  }
    return (
      <div className={styles.row}>
        <Menu active="home" user={user} />
        <div className={styles.main}>
          <div className={styles.header}>
            <SearchField />
            <div className={styles.userDetails}>
              <Info size={22} />
            </div>
          </div>
          {select_layout()}
        </div>
      </div>
    );
}