import { DashBox } from "../boxes/DashBox";
import styles from "../../styles/Schedule.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import ScheduleEvent from "../ScheduleEvent";
import { format, formatDistanceToNow, getDay, startOfMonth } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { useTranslation } from "react-i18next";

export default function Schedule() {
  const [[state, direction], setState] = useState([1, 0]);
  
  const states = [
    <ScheduleTable setState={setState} />,
    <Calendar setState={setState} />,
  ];

  return (
    <DashBox width={50}>
      <motion.div
        key={state}
        custom={direction}
        variants={{
          enter: (direction) => ({
            opacity: 0,
          }),
          center: {
            opacity: 1,
          },
          exit: (direction) => ({
            opacity: 0,
          }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {states[state - 1]}
      </motion.div>
    </DashBox>
  );
}

function ScheduleTable({ setState }) {
  const { t } = useTranslation();
  const date = new Date();
  const schedules = [
    {
      date,
      title: "Intraction design principles",
      time: "10 AM - 11:30 AM",
      color: "red",
    },
    {
      date,
      title: "Advanced web frameworks",
      time: "2 PM - 3:30 PM",
      color: "green",
    },
    {
      date,
      title: "Business ethics in tech",
      time: "8 PM - 9:30 PM",
      color: "blue",
    },
  ];
  return (
    <>
      <div className={styles.rowHead}>
        <h1>{t("schedule")}</h1>
        <a href="#" onClick={() => setState(() => [2, 1])}>
          {t("open_calendar")}
        </a>
      </div>
      <div className={styles.events}>
        {schedules?.map((schedule) => (
          <ScheduleEvent
            key={schedules.indexOf(schedule)}
            title={schedule.title}
            time={schedule.time}
            date={schedule.date}
            color={schedule.color}
          />
        ))}
      </div>
    </>
  );
}

function Calendar({ setState }) {
  const { t } = useTranslation();
  const today = new Date();
  const persianDate = format(today, "dddd، d MMMM yyyy", { locale: faIR });
  
  // Get the first day of the current Persian month
  const firstDayOfMonth = startOfMonth(today);
  // Get the weekday of the first day (0 = Saturday for Persian calendar in date-fns-jalali)
  const firstDayWeekday = getDay(firstDayOfMonth);
  
  // Create empty slots for days before the first day of the month
  const emptySlots = Array.from({ length: firstDayWeekday }, (_, i) => ({
    empty: true,
    key: `empty-${i}`,
  }));
  
  // Get days in the current Persian month (30 or 31 days)
  const year = parseInt(format(today, "yyyy", { locale: faIR }));
  const month = parseInt(format(today, "MM", { locale: faIR }));
  
  // Determine days in month (first 6 months have 31 days, rest have 30, last has 29/30)
  let daysInMonthCount;
  if (month <= 6) {
    daysInMonthCount = 31;
  } else if (month <= 11) {
    daysInMonthCount = 30;
  } else {
    // Check if it's a leap year
    daysInMonthCount = ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) ? 30 : 29;
  }
  
  const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    return {
      persian: format(date, "d", { locale: faIR }),
      full: date,
      isToday: i + 1 === parseInt(format(today, "d", { locale: faIR })),
      dayName: format(date, "EEE", { locale: faIR }),
      key: `day-${i}`,
    };
  });
  
  const allDays = [...emptySlots, ...daysInMonth];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.rowHead}>
        <h1>{t("persian_calendar")}</h1>
        <a href="#" onClick={() => setState(() => [1, -1])}>
          {t("view_weekly_schedule")}
        </a>
      </div>
      <div className={styles.todayDisplay}>
        <h2>{persianDate}</h2>
        <p>{formatDistanceToNow(today, { locale: faIR, addSuffix: true })}</p>
      </div>
      <div className={styles.calendarGrid}>
        {["sat", "sun", "mon", "tue", "wed", "thu", "fri"].map((day) => (
          <div key={day} className={styles.weekdayHeader}>
            {t(`weekdays.${day}`)}
          </div>
        ))}
        {allDays.map((day) => 
          day.empty ? (
            <div key={day.key} className={styles.calendarDayEmpty} />
          ) : (
            <div
              key={day.key}
              className={`${styles.calendarDay} ${day.isToday ? styles.isToday : ""}`}
            >
              <span className={styles.dayNumber}>{day.persian}</span>
              <span className={styles.dayName}>{day.dayName}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
