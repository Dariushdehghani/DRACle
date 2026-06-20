import { useTranslation } from "react-i18next";
import styles from "../../styles/Dashboard.module.scss";
import WhiteButton from "../../components/WhiteButton";
import AccentButton from "../../components/AccentButton";
import ActiveBar from "../../components/dash/ActiveBar";
import Achievments from "../../components/dash/Achievments";
import Schedule from "../../components/dash/Schedule";
import Tasks from "../../components/dash/Tasks";
import { useAuth } from "../../context/AuthContext";

export default function StudentDash() {
  const { t } = useTranslation();

  const { user } = useAuth();

  return (
    <>
      <div className={styles.BigBannercontext}>
        <div className={styles.BigBanner}>
          <h1>
            {t("welcome_back")}, {user.username}!
          </h1>
          <p>
            you've done all your homework and did send a good performance, lorem
            ipsum, my name is not alex
          </p>
          <div className={styles.buttonsRow}>
            <WhiteButton text="prizes" />
            <AccentButton text="view" />
          </div>
        </div>
      </div>
      <div className={styles.context}>
        <ActiveBar />
        <Achievments />
      </div>
      <div className={styles.context}>
        <Schedule />
        <Tasks />
      </div>
    </>
  );
}
