import styles from "../styles/menu.module.scss"
import MenuButton from "./MenuButton";
import { Home, School2, Paperclip, AlignEndHorizontal, Settings } from "lucide-react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

export default function Menu({
    active: Active,
    ...props
}) {
  const navigate = useNavigate();

  function checkActive(page) {
    return page === Active
  }

  return (
    <div className={styles.menu}>
      <div className={styles.top}>
        <div className={styles.menuHeader}>
          <h1>DRACLE</h1>
          <p>student panel</p>
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
            active={checkActive("assign")}
            color={checkActive("assign") ? "white" : ""}
            icon={Paperclip}
            text={t("assignment")}
            onClick={() => navigate("/assign")}
          />
          <MenuButton
            active={checkActive("perf")}
            color={checkActive("pref") ? "white" : ""}
            icon={AlignEndHorizontal}
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
      <div className={styles.bottom}>
        <MenuButton text={t("username")} />
      </div>
    </div>
  );
}