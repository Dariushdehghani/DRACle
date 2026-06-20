import { DashBox } from "../boxes/DashBox";
import styles from "../../styles/Schedule.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import ScheduleEvent from "../ScheduleEvent";

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
  return (
    <div className={styles.rowHead}>
      <h1>Calendar</h1>
      <a href="#" onClick={() => setState(() => [1, -1])}>
        open schedule table
      </a>
    </div>
  );
}
