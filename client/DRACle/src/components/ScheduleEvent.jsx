import styles from "../styles/scheduleEvent.module.scss";

export default function ScheduleEvent({ title, time, date, color }) {
  const monthNames = ["jan", "feb", "ma", "apr", "may", "jun"];
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return (
    <div className={styles.event}>
      <div className={styles.wrapper}>
        <div className={styles.date}>
          <p>{monthNames[date.getMonth()]}</p>
          <h2>{date.getDate()}</h2>
        </div>
        <div>
          <h3>{title}</h3>
          <p>{time}</p>
        </div>
      </div>
      <span style={{ backgroundColor: `var(--${color})` }}>
        {weekdays[date.getDay()]}
      </span>
    </div>
  );
}
