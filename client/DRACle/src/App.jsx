import { useTranslation } from "react-i18next";
import Router from "./router/Router";
import "./styles/globals.scss"
import "./styles/variables.scss"
import { useEffect, useState } from "react"
import api from "./lib/api"
import { t } from "i18next";

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { i18n } = useTranslation()

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa"? "rtl" : "ltr"
  }, [i18n.language])

  if (loading) {
    return <div>{t("loading")}...</div>
  }

  return (
    <Router
      user={user}
      setUser={setUser}
    />
  )
}