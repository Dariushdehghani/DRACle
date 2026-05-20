import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Router from "./router/Router";
import "./styles/globals.scss"
import "./styles/variables.scss"


export default function App() {
    const { i18n } = useTranslation()

    useEffect(() => {
        document.documentElement.dir = i18n.language === "fa"? "rtl" : "ltr"
    }, [i18n.language])

    return <Router />
}