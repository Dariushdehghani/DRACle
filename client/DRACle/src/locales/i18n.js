import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./en/translation.json"
import fa from "./fa/translation.json"

const savedLng = localStorage.getItem("lang") || "en"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            fa: {
                translation: fa
            }
        },
        
        lng:savedLng,
        fallbacklng:"en",
        interpolation: {
            escapeValue: false
        }
    })

export default i18n