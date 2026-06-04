import styles from "../styles/input1.module.scss"

export default function Input1({
    icon: Icon,
    pretext: Pretext,
    error,
    ...props
}) {
    return (
      <>
        <div className={`${styles.wrapper} ${error===true? (styles.err) : ''}`}>
          {Icon && <Icon size={22} className={styles.icon} />}
          <input {...props} className={styles.input} />
        </div>
      </>
    );
}