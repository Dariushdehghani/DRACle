import styles from "../styles/SButton.module.scss"

export default function SButton({
    icon: Icon,
    ...props
}) {
    return (
      <button {...props} className={styles.button}>
        {Icon && <Icon size={22} className={styles.icon} />}
      </button>
    );
}