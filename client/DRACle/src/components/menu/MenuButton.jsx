import styles from "../../styles/menuButton.module.scss"

export default function MenuButton({
    text: Text,
    icon: Icon,
    active: Active,
    color: Color,
    ...props
}) {
    return (
      <button
        className={`${styles.button} ${Active ? styles.active : ""}`}
        {...props}
      >
        {Icon && <Icon {...(Color && { color:Color })} size="25" />}
        {Text}
      </button>
    );
}