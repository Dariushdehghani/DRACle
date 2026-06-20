import styles from "../styles/menu.module.scss";
import MenuButton from "./menu/MenuButton";
import {
  Home,
  School2,
  Paperclip,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import MenuBottom from "./menu/MenuBottom";
import { motion } from "framer-motion";
import TextButton from "./TextButton";
import { useAuth } from "../context/AuthContext";
import { MessageSquare } from "lucide-react";

export default function Menu({ active: Active, ...props }) {
  const navigate = useNavigate();

  const { user, role, setRole, academy, setAcademy } = useAuth();

  function checkActive(page) {
    return page === Active;
  }

  const changeUser = () => {
    setRole(null);
    setAcademy(null);
    navigate("/select-role");
  };

  return (
    <div className={styles.menu}>
      <div className={styles.top}>
        <div className={styles.menuHeader}>
          <div style={{ display: "flex", alignItems: "baseLine", gap: "2px" }}>
            <h1>DRACLE</h1>
            <p>{`> ${academy}`}</p>
          </div>
          <TextButton
            content={
              <>
                <ChevronLeft />
                <p>{role} panel</p>
              </>
            }
            onClick={() => changeUser()}
          />
        </div>
        <div className={styles.buttons}>
          <MenuButton
            active={checkActive("home")}
            color={checkActive("home") ? "white" : ""}
            icon={Home}
            text={t("home")}
            onClick={() => navigate(`/dash`)}
          />
          <MenuButton
            active={checkActive("classes")}
            color={checkActive("classes") ? "white" : ""}
            icon={School2}
            text={t("my_classes")}
            onClick={() => navigate("/classes")}
          />
          <MenuButton
            active={checkActive("perf")}
            color={checkActive("pref") ? "white" : ""}
            icon={MessageSquare}
            text={t("messages")}
            onClick={() => navigate("/messages")}
          />
          <MenuButton
            active={checkActive("settings")}
            color={checkActive("settings") ? "white" : "black"}
            icon={Settings}
            text={t("settings")}
            onClick={() => navigate("/settings")}
          />
        </div>
      </div>
      <MenuBottom user={user} />
    </div>
  );
}
