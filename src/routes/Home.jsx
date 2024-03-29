import style from "./Home.module.css";
import { Header } from "../components/Header/Header";
import { useEffect, useState } from "react";
import { TaskCard } from "../components/TaskBoard/TaskCard/TaskCard";

export function Home() {
  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    addTask("Test 1", "This a test", "A Fazer");
    console.log(toDo);
  }, []);

  const addTask = (title, description, step) => {
    const task = {
      title: title,
      description: description,
      step: step,
      id: `${toDo.length}_${title}`,
    };
    switch (step) {
      case "A Fazer":
        setToDo(task);
        break;
      case "Em Andamento":
        setDoing(task);
        break;
      case "Pronto":
        setDone(task);
        break;
    }
  };

  return (
    <div className={style.container}>
      <Header />
      <div className={style.taskBoard}>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>A fazer</span>
          {toDo.map((item, index) => {
            return <TaskCard key={index} task={item} />
          })}
        </div>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>Em Andamento</span>
        </div>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>Pronto</span>
        </div>
      </div>
    </div>
  );
}
