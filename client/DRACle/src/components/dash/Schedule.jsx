import { DashBox } from "../boxes/DashBox";
import styles from "../../styles/Schedule.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import ScheduleEvent from "../ScheduleEvent";
import { format, formatDistanceToNow, getDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, subMonths, addMonths } from "date-fns-jalali";
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
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Get the first day of the current Persian month
  // In Jalali calendar: Saturday=0, Sunday=1, ..., Friday=6
  const firstDayOfMonth = startOfMonth(currentDate);
  const firstDayWeekday = getDay(firstDayOfMonth);
  
  // Calculate the start of the grid (Saturday before or on the 1st)
  const gridStartDate = startOfWeek(monthStart, { weekStartsOn: 6 });
  const gridEndDate = endOfWeek(monthEnd, { weekStartsOn: 6 });

  const calendarDays = eachDayOfInterval({
    start: gridStartDate,
    end: gridEndDate
  });

  const today = new Date();
  const persianDate = format(today, "dddd، d MMMM yyyy", { locale: faIR });

  const weekdays = [
    t('schedule.weekdays.sat'),
    t('schedule.weekdays.sun'),
    t('schedule.weekdays.mon'),
    t('schedule.weekdays.tue'),
    t('schedule.weekdays.wed'),
    t('schedule.weekdays.thu'),
    t('schedule.weekdays.fri')
  ];

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

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
      <div className={styles.navControls}>
        <button onClick={handlePrevMonth} className={styles.navBtn}>&#8249;</button>
        <span className={styles.monthLabel}>
          {format(currentDate, 'LLLL yyyy', { locale: faIR })}
        </span>
        <button onClick={handleNextMonth} className={styles.navBtn}>&#8250;</button>
      </div>
      <div className={styles.calendarGrid}>
        {weekdays.map((day, idx) => (
          <div key={idx} className={styles.weekdayHeader}>{day}</div>
        ))}
        
        {calendarDays.map((day, idx) => {
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = day.getMonth() === monthStart.getMonth() && day.getFullYear() === monthStart.getFullYear();
          
          return (
            <div 
              key={idx} 
              className={`${styles.calendarDay} ${isToday ? styles.isToday : ''} ${!isCurrentMonth ? styles.otherMonth : ''}`}
            >
              <span className={styles.dayNumber}>{format(day, 'd')}</span>
              {!isToday && <span className={styles.dayName}>{format(day, 'EEEEEE', { locale: faIR })}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
