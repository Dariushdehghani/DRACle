import { Search } from "lucide-react"
import styles from "../styles/searchField.module.scss"

export default function SearchField({
    ...props
}) {
    return(
        <div className={styles.inputBox} >
            <Search size="25" color="gray" />
            <input type="search" name="" {...props} />
        </div>
    )
}