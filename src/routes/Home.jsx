import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { Header } from "../components/Header/Header";
import { TaskCard } from "../components/TaskBoard/TaskCard/TaskCard";
import axios from "axios";

export function Home() {

  // https://pacaro-tarefas.netlify.app/api/eduardo/tasks
  const api = "https://pacaro-tarefas.netlify.app/api/eduardo/";
  const tasks = "tasks";

  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${api}${tasks}`);
      const toDoList = [], doingList = [], doneList = [];

      if (res.data.length > 0) {
        res.data.forEach((task) => {
          switch (task.step) {
            case "Para fazer":
              toDoList.push(task);
              break;
            case "Em andamento":
              doingList.push(task);
              break;
            case "Pronto":
              doneList.push(task);
              break;
            default:
              break;
          }
        });
      }

      setToDo(toDoList);
      setDoing(doingList);
      setDone(doneList);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTask = (title, description, step) => {
    const task = {
      id: (Math.random()*100).toFixed(0),
      title: title,
      description: description,
      step: step,
    };
    switch (step) {
      case "Para fazer":
        setToDo([...toDo, task]);
        break;
      case "Em andamento":
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
        setDoing([...doing, { ...task, step: "Em andamento" }]);
        break;
      case "Em andamento":
        updatedTasks = doing.filter((t) => t.id !== task.id);
        setDoing(updatedTasks);
        setToDo([...toDo, { ...task, step: "Para fazer" }]);
        break;
      default:
        break;
    }
    console.log('Movendo para Esquerda');
  };

  const changeStepRight = (task) => {
    let updatedTasks;
    switch (task.step) {
      case "Para fazer":
        updatedTasks = toDo.filter((t) => t.id !== task.id);
        setToDo(updatedTasks);
        setDoing([...doing, { ...task, step: "Em andamento" }]);
        break;
      case "Em andamento":
        updatedTasks = doing.filter((t) => t.id !== task.id);
        setDoing(updatedTasks);
        setDone([...done, { ...task, step: "Pronto" }]);
        break;
      default:
        break;
    }
    console.log('Movendo para Direita');
  };

  const removerTask = (task) => {
    let updatelist;
    switch(task.step){
      case "Para fazer":
        updatelist = toDo.filter((t) => t.id !== task.id);
        setToDo(updatelist);
      case "Em andamento":
        updatelist = doing.filter((t) => t.id !== task.id);
        setDoing(updatelist);
      case "Pronto":
        updatelist = done.filter((t) => t.id !== task.id);
        setDone(updatelist);
    }
  };
  

  return (
    <div className={style.container}>
      <Header />
      <div className={style.taskBoard}>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>Para fazer</span>
          {toDo.length > 0 ? (
            toDo.map((task) => (
              <TaskCard
                key={task.createdAt}
                task={task}
                stepLeft={() => changeStepLeft(task)}
                stepRight={() => changeStepRight(task)}
                deleteTask={()=> removerTask(task)}
              />
            ))
          ) : ''
          }
        </div>
        <div className={style.taskCard}>
          <span className={style.taskTitle}>Em andamento</span>
          {doing.length > 0 ? (
            doing.map((task) => (
              <TaskCard
                key={task.createdAt}
                task={task}
                stepLeft={() => changeStepLeft(task)}
                stepRight={() => changeStepRight(task)}
                deleteTask={()=> removerTask(task)}
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
                key={task.createdAt}
                task={task}
                stepLeft={() => changeStepLeft(task)}
                stepRight={() => changeStepRight(task)}
                deleteTask={()=> removerTask(task)}
              />
            ))
          ) : ''
          }
        </div>
      </div>
      <button
        onClick={() => {
          addTask(`Test`, `descrição${toDo.length}`, "Para fazer");
        }}
        style={{ padding: "10px", backgroundColor: "gray" }}
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}
