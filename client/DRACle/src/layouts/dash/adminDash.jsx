import { useTranslation } from "react-i18next";
import AccentButton from "../../components/AccentButton";
import WhiteButton from "../../components/WhiteButton";
import styles from "../../styles/Dashboard.module.scss";
import { useAuth } from "../../context/AuthContext";
import { DashBox } from "../../components/boxes/DashBox";
import ActiveBar from "../../components/dash/ActiveBar";
import Classes from "../../components/dash/Classes";
import Schedule from "../../components/dash/Schedule";
import Message from "../../components/dash/Messages";

export default function AdminDash() {
  const { t } = useTranslation();
  const { user, academy } = useAuth();

  return (
    <>
      <div className={styles.BigBannercontext}>
        <div className={styles.BigBanner}>
          <h1>
            {t("welcome_back")}, {user.username}!
          </h1>
          <p>
            The DRACLE is impressed to have an active academy named {academy} <br />
            some new join requests are looking to be accepted:
          </p>
          <div className={styles.buttonsRow}>
            <WhiteButton text="prizes" />
            <AccentButton text="view" />
          </div>
        </div>
      </div>
      <div className={styles.context}>
        <ActiveBar />
        <Classes />
      </div>
      <div className={styles.context}>
        <Schedule />
        <Message />
      </div>
    </>
  );
}
