import { t } from "i18next";
import styles from "../styles/Dashboard.module.scss"
import Menu from "../components/Menu";
import SearchField from "../components/SearchField";
import { Info } from "lucide-react";
import WhiteButton from "../components/WhiteButton";
import AccentButton from "../components/AccentButton";
import ProgressBar from "../components/ProgressBar";
import Achievments from "../components/Achievments";
import { useAuth } from "../context/AuthContext";

export default function Dashboard(){
  const { user } = useAuth()
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
          <div className={styles.BigBannercontext}>
            <div className={styles.BigBanner}>
              <h1>{t("welcome_back")}, Alex!</h1>
              <p>
                you've done all your homework and did send a good performance,
                lorem ipsum, my name is not alex
              </p>
              <div className={styles.buttonsRow}>
                <WhiteButton text="prizes" />
                <AccentButton text="view" />
              </div>
            </div>
          </div>
          <div className={styles.context} >
            <ProgressBar />
            <Achievments />
          </div>
        </div>
      </div>
    );
}