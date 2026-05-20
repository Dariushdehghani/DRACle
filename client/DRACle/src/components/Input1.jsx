import styles from "../styles/input1.module.scss"

export default function Input1({
    icon: Icon,
    pretext: Pretext,
    ...props
}) {
    return (
      <>
        <div className={styles.wrapper}>
          {Icon && <Icon size={22} className={styles.icon} />}
          <input {...props} className={styles.input} />
        </div>
      </>
    );
}