import { DashBox } from "../boxes/DashBox";
import styles from "../../styles/Schedule.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import ScheduleEvent from "../ScheduleEvent";
import { format, formatDistanceToNow } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

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
        <h1>Schedule</h1>
        <a href="#" onClick={() => setState(() => [2, 1])}>
          open calendar
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
  const today = new Date();
  const persianDate = format(today, "dddd، d MMMM yyyy", { locale: faIR });
  const persianDateShort = format(today, "yyyy/MM/dd", { locale: faIR });
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
    return {
      persian: format(date, "d", { locale: faIR }),
      full: date,
      isToday: i + 1 === today.getDate(),
      dayName: format(date, "EEE", { locale: faIR }),
    };
  });

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.rowHead}>
        <h1>تقویم شمسی</h1>
        <a href="#" onClick={() => setState(() => [1, -1])}>
          مشاهده برنامه هفتگی
        </a>
      </div>
      <div className={styles.todayDisplay}>
        <h2>{persianDate}</h2>
        <p>{formatDistanceToNow(today, { locale: faIR, addSuffix: true })}</p>
      </div>
      <div className={styles.calendarGrid}>
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
          <div key={day} className={styles.weekdayHeader}>
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`${styles.calendarDay} ${day.isToday ? styles.isToday : ""}`}
          >
            <span className={styles.dayNumber}>{day.persian}</span>
            <span className={styles.dayName}>{day.dayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
