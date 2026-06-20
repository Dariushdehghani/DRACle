import styles from "../styles/DefaultInput.module.scss";

export default function DefaultInput({
  icon: Icon,
  pretext: Pretext,
  error,
  ...props
}) {
  return (
    <>
      <div className={`${styles.wrapper} ${error === true ? styles.err : ""}`}>
        {Icon && <Icon size={22} className={styles.icon} />}
        <input {...props} className={styles.input} />
      </div>
    </>
  );
}
