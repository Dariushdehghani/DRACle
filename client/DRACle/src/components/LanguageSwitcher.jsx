import { useState } from "react"
import styles from "../styles/langSelect.module.scss"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function LangSelect() {
    let saved = localStorage.getItem("lang")
    const [selected, setSelected] = useState(saved)
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation()

    function changeLang(lang) {
        i18n.changeLanguage(lang)
        setSelected(lang)
        localStorage.setItem("lang", lang)
        setIsOpen(false)
    }
    
    return (
      <div style={{ position: "relative" }}>
        <div className={styles.input_box} onClick={() => isOpen? setIsOpen(false) : setIsOpen(true)}>
          <ChevronDown size={15} />
          <p>{selected === "en" ? "English" : "فارسی"}</p>
        </div>
        <div className={`${styles.dropdown} ${isOpen? styles.open : ''}`}>
          <li onClick={() => changeLang("en")}>English</li>
          <li onClick={() => changeLang("fa")}>فارسی</li>
        </div>
      </div>
    );
}