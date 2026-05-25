import styles from "../styles/Login.module.scss"
import bg from "../assets/login-bg.jpg"
import { useTranslation } from "react-i18next"
import Input1 from "../components/Input1";
import { ArrowRight, Lock, User } from "lucide-react";
import SButton from "../components/SButton";
import LangSelect from "../components/LanguageSwitcher";
import { useState } from "react";

export default function Login(){
    const { t } = useTranslation()
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };


    return (
      <>
        <div className={styles.row}>
          <div className={styles.bg_img_con}>
            <img src={bg} alt="" className={styles.bg_img} />
          </div>
          <div className={styles.login_box}>
            <form className={styles.login_box_container}>
              <h1>{t("welcome_back")}</h1>
              <Input1
                name="username"
                onChange={handleInputChange}
                value={inputValues.username}
                icon={User}
                placeholder={t("username")}
              />
              <Input1
                name="pass"
                onChange={handleInputChange}
                value={inputValues.pass}
                icon={Lock}
                placeholder={t("password")}
                type="password"
              />
              <SButton icon={ArrowRight} type="submit" />
              <LangSelect />
              <a href="/signup">{t("dont_have_account")}</a>
            </form>
          </div>
        </div>
      </>
    );
}