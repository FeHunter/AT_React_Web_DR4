import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { Header } from "../components/Header/Header";
import { TaskCard } from "../components/TaskBoard/TaskCard/TaskCard";

export function Home() {
  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    
  }, []);

  const addTask = (title, description, step) => {
    const task = {
      id: (Math.random()*100).toFixed(0),
      title: title,
      description: description,
      step: step,
    };
    switch (step) {
      case "A Fazer":
        setToDo([...toDo, task]);
        break;
      case "Em Andamento":
        setDoing([...doing, task]);
        break;
      case "Pronto":
        setDone([...done, task]);
        break;
      default:
        break;
    }
  };

  const changeStepLeft = (task) => {
    let updatedTasks;
    switch (task.step) {
      case "Pronto":
        updatedTasks = done.filter((t) => t.id !== task.id);
        setDone(updatedTasks);
        setDoing([...doing, { ...task, step: "Em Andamento" }]);
        break;
      case "Em Andamento":
        updatedTasks = doing.filter((t) => t.id !== task.id);
        setDoing(updatedTasks);
        setToDo([...toDo, { ...task, step: "A Fazer" }]);
        break;
      default:
        break;
    }
    console.log('Movendo para Esquerda');
  };

  const changeStepRight = (task) => {
    let updatedTasks;
    switch (task.step) {
      case "A Fazer":
        updatedTasks = toDo.filter((t) => t.id !== task.id);
        setToDo(updatedTasks);
        setDoing([...doing, { ...task, step: "Em Andamento" }]);
        break;
      case "Em Andamento":
        updatedTasks = doing.filter((t) => t.id !== task.id);
        setDoing(updatedTasks);
        setDone([...done, { ...task, step: "Pronto" }]);
        break;
      default:
        break;
    }
    console.log('Movendo para Direita');
  };
  

  return (
    <div className={style.container}>
      <Header />
      <div className={style.taskBoard}>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>A fazer</span>
          {toDo.length > 0 ? (
            toDo.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                stepLeft={() => changeStepLeft(task)}
                stepRight={() => changeStepRight(task)}
              />
            ))
          ) : ''
          }
        </div>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>Em Andamento</span>
          {doing.length > 0 ? (
            doing.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                stepLeft={() => changeStepLeft(task)}
                stepRight={() => changeStepRight(task)}
              />
            ))
          ) : ''
          }
        </div>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>Pronto</span>
          {done.length > 0 ? (
            done.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                stepLeft={() => changeStepLeft(task)}
                stepRight={() => changeStepRight(task)}
              />
            ))
          ) : ''
          }
        </div>
      </div>
      <button
        onClick={() => {
          addTask(`Test`, `descrição${toDo.length}`, "A Fazer");
        }}
        style={{ padding: "10px", backgroundColor: "gray" }}
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}
