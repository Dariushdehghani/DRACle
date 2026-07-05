import { DashBox } from "../boxes/DashBox";
import styles from "../../styles/Schedule.module.scss";
import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import ScheduleEvent from "../ScheduleEvent";
import { format, getDay, getMonth, startOfMonth, endOfMonth, addDays, addMonths, isSameDay } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { useTranslation } from "react-i18next";

// date-fns-jalali's getDay follows the JS convention (0 = Sunday ... 6 = Saturday),
// but the Persian week starts on Saturday. Convert to a Saturday-first column
// index so days line up under the ["sat".."fri"] weekday headers.
const persianCol = (date) => (getDay(date) + 1) % 7;

// Shared sample schedule data. Each entry carries a real Date so both the
// weekly list and the calendar can match events to days with isSameDay.
function makeSchedules() {
  const now = new Date();
  const at = (dayOffset, h, m) => {
    const d = new Date(now);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(h, m, 0, 0);
    return d;
  };
  return [
    { date: at(0, 10, 0), title: "Intraction design principles", time: "10 AM - 11:30 AM", color: "red" },
    { date: at(0, 14, 0), title: "Advanced web frameworks", time: "2 PM - 3:30 PM", color: "green" },
    { date: at(0, 20, 0), title: "Business ethics in tech", time: "8 PM - 9:30 PM", color: "blue" },
    { date: at(2, 9, 0), title: "Database systems", time: "9 AM - 10:30 AM", color: "blue" },
    { date: at(2, 16, 0), title: "Human-computer interaction", time: "4 PM - 5:30 PM", color: "red" },
    { date: at(5, 11, 0), title: "Algorithms workshop", time: "11 AM - 12:30 PM", color: "green" },
  ];
}

const schedules = makeSchedules();

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
        style={{ flex: 1, minHeight: 0, overflow: "hidden" }}
      >
        {states[state - 1]}
      </motion.div>
    </DashBox>
  );
}

function ScheduleTable({ setState }) {
  const { t } = useTranslation();
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
  const today = useMemo(() => new Date(), []);
  const monthStart = useMemo(() => startOfMonth(today), [today]);

  // monthOffset shifts the view away from the current month.
  const [monthOffset, setMonthOffset] = useState(0);
  const viewStart = useMemo(() => addMonths(monthStart, monthOffset), [monthStart, monthOffset]);
  const viewEnd = useMemo(() => endOfMonth(viewStart), [viewStart]);

  // Build the grid from the Saturday on/before the 1st of the month, so every
  // day's column index matches its position in the Saturday-first weekday
  // header. Leading days from the previous month are rendered as empty cells.
  const daysInMonthCount = parseInt(format(viewEnd, "d", { locale: faIR }), 10);
  const leadingEmpties = persianCol(viewStart);

  const emptySlots = Array.from({ length: leadingEmpties }, (_, i) => ({
    empty: true,
    key: `empty-${i}`,
  }));

  const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => {
    const date = addDays(viewStart, i);
    const events = schedules.filter((e) => isSameDay(e.date, date));
    return {
      empty: false,
      persian: format(date, "d", { locale: faIR }),
      dayName: format(date, "EEE", { locale: faIR }),
      full: date,
      isToday: isSameDay(date, today),
      hasEvents: events.length > 0,
      events,
      key: `day-${i}`,
    };
  });

  const allDays = [...emptySlots, ...daysInMonth];

  // Hover tooltip: track the mouse and the day under it, then clamp the box
  // to the viewport so it never overflows the bottom/right edges.
  const [hover, setHover] = useState(null);
  const tooltipRef = useRef(null);
  const [ttStyle, setTtStyle] = useState({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!hover) return;
    const el = tooltipRef.current;
    if (!el) return;
    const margin = 12;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    let x = hover.x + margin;
    let y = hover.y + margin;
    if (x + w > window.innerWidth - margin) x = hover.x - w - margin;
    if (y + h > window.innerHeight - margin) y = hover.y - h - margin;
    x = Math.max(margin, Math.min(x, window.innerWidth - w - margin));
    y = Math.max(margin, Math.min(y, window.innerHeight - h - margin));
    setTtStyle({ left: x, top: y });
  }, [hover]);

  const handleMouseMove = (e, day) => {
    setHover({ x: e.clientX, y: e.clientY, day });
  };

  const monthLabel = `${t(`months.month${getMonth(viewStart) + 1}`)} ${format(viewStart, "yyyy", { locale: faIR })}`;

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.rowHead}>
        <h1>{t("persian_calendar")}</h1>
        <a href="#" onClick={() => setState(() => [1, -1])}>
          {t("view_weekly_schedule")}
        </a>
      </div>
      <div className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.navArrow}
          aria-label={t("previous_month")}
          onClick={() => setMonthOffset((o) => o - 1)}
        >
          ‹
        </button>
        <span className={styles.monthLabel}>{monthLabel}</span>
        <button
          type="button"
          className={styles.navArrow}
          aria-label={t("next_month")}
          onClick={() => setMonthOffset((o) => o + 1)}
        >
          ›
        </button>
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
              className={`${styles.calendarDay} ${day.isToday ? styles.isToday : ""} ${day.hasEvents ? styles.hasEvents : ""}`}
              onMouseEnter={(e) => handleMouseMove(e, day)}
              onMouseMove={(e) => handleMouseMove(e, day)}
              onMouseLeave={() => setHover(null)}
            >
              <span className={styles.dayNumber}>{day.persian}</span>
              <span className={styles.dayName}>{day.dayName}</span>
            </div>
          )
        )}
      </div>
      {hover && (
        <div
          ref={tooltipRef}
          className={styles.tooltip}
          style={{ left: ttStyle.left, top: ttStyle.top, "--tt-x": "0px", "--tt-y": "0px" }}
          role="tooltip"
        >
          <div className={styles.tooltipDate}>
            {format(hover.day.full, "EEEE d MMMM yyyy", { locale: faIR })}
          </div>
          {hover.day.events.length > 0 ? (
            hover.day.events.map((e, idx) => (
              <div key={idx} className={styles.tooltipEvent}>
                <span
                  className={styles.tooltipDot}
                  style={{ backgroundColor: `var(--${e.color})` }}
                />
                <span className={styles.tooltipEventInfo}>
                  <span>{e.title}</span>
                  <small>{e.time}</small>
                </span>
              </div>
            ))
          ) : (
            <div className={styles.tooltipEmpty}>{t("no_events")}</div>
          )}
        </div>
      )}
    </div>
  );
}
