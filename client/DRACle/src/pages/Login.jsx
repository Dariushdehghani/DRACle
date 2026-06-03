import styles from "../styles/Login.module.scss"
import bg from "../assets/login-bg.jpg"
import { useTranslation } from "react-i18next"
import Input1 from "../components/Input1";
import { ArrowRight, Loader, Lock, User } from "lucide-react";
import SButton from "../components/SButton";
import LangSelect from "../components/LanguageSwitcher";
import { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const { t } = useTranslation()
    const [submitIcon, setSubmitIcon] = useState(ArrowRight)
    let navigate = useNavigate()

    async function handleSubmit(event) {
      event.preventDefault()
      console.log(event)

      try {
        const res = await api.post(
          "/auth/login",
          {
            email: event.target[0].value,
            password: event.target[1].value
          }
        )
        setSubmitIcon(Loader)
        navigate("/dash")
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <>
        <div className={styles.row}>
          <div className={styles.bg_img_con}>
            <img src={bg} alt="" className={styles.bg_img} />
          </div>
          <div className={styles.login_box}>
            <form className={styles.login_box_container} onSubmit={handleSubmit}>
              <h1>{t("welcome_back")}</h1>
              <Input1
                name="username"
                icon={User}
                placeholder={t("username")}
              />
              <Input1
                name="password"
                icon={Lock}
                placeholder={t("password")}
                type="password"
              />
              <SButton icon={submitIcon} type="submit" />
              <LangSelect />
              <a href="/signup">{t("dont_have_account")}</a>
            </form>
          </div>
        </div>
      </>
    );
}