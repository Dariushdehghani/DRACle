import styles from "../../styles/tasks.module.scss";
import { DashBox } from "../boxes/DashBox";
import Task from "../Task";

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      done: true,
      duration: "until tomorrow",
      title: "Run a c++ code",
      color: "red",
    },
    {
      id: 2,
      done: false,
      duration: "until tonight",
      title: "buy your books",
      color: "orange",
    },
    {
      id: 3,
      done: true,
      duration: "until weekend",
      title: "Bring me your projects",
      color: "pink",
    },
    {
      id: 4,
      done: true,
      duration: "until next month",
      title: "watch chemmy vids",
      color: "green",
    },
    {
      id: 5,
      done: true,
      duration: "until tomorrow",
      title: "Run a c++ code",
      color: "red",
    },
  ];
  return (
    <DashBox width={50}>
      <div className={styles.rowHead}>
        <h2>Tasks</h2>
        <a href="#">open tasks</a>
      </div>
      <div className={styles.taskContext}>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            done={task.done}
            duration={task.duration}
            title={task.title}
            color={task.color}
          />
        ))}
      </div>
    </DashBox>
  );
}
