import { useState } from "react"
import styles from "../styles/langSelect.module.scss"
import { ChevronDown } from "lucide-react"

export default function LangSelect() {
    let saved = localStorage.getItem("lang")
    const [selected, setSelected] = useState(saved === "en" ? "english" : "فارسی")
    
    return(
        <>
            <div className={styles.input_box} >
                <ChevronDown size={15} />
                <p>{selected}</p>
            </div>
        </>
    )
}