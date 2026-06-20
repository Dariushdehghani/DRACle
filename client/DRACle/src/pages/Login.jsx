import styles from "../styles/Login.module.scss";
import bg from "../assets/login-bg.jpg";
import { useTranslation } from "react-i18next";
import Input1 from "../components/Input1";
import { ArrowRight, Loader, Lock, User } from "lucide-react";
import SButton from "../components/SButton";
import LangSelect from "../components/LanguageSwitcher";
import { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { t } = useTranslation();
  const [submitIcon, setSubmitIcon] = useState(ArrowRight);
  let navigate = useNavigate();
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    setSubmitIcon(Loader);

    try {
      const formData = new FormData(event.currentTarget);

      const email = formData.get("username");
      const password = formData.get("password");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.message === "user_not_found") {
        setErrors((prev) => ({
          ...prev,
          username: true,
        }));
        setSubmitIcon(ArrowRight);
        return;
      }

      if (res.data.message === "invalin_password") {
        setErrors((prev) => ({
          ...prev,
          password: true,
        }));
        setSubmitIcon(ArrowRight);
        return;
      }

      const me = await api.get("/auth/me");
      setUser(me.data);
      navigate("/dash");
      console.log(res.data);
    } catch (err) {
      setSubmitIcon(ArrowRight);
      alert("server Error! try again later");
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
              error={errors.username}
              onChange={() =>
                setErrors((prev) => ({
                  ...prev,
                  username: false,
                }))
              }
            />
            <Input1
              name="password"
              icon={Lock}
              placeholder={t("password")}
              error={errors.password}
              onChange={() =>
                setErrors((prev) => ({
                  ...prev,
                  password: false,
                }))
              }
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
