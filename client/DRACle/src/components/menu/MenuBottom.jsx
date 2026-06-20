import { User } from "lucide-react"
import styles from "../../styles/MenuBottom.module.scss"
import { useAuth } from "../../context/AuthContext"

export default function MenuBottom(props) {
    return (
        <button className={styles.button} {...props} >
            <User size={20} />
            <h2>{props.user.username}</h2>
        </button>
    )
}