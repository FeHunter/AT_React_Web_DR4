import React, { Component, useEffect, useState } from "react";
import style from "./Home.module.css";
import { Header } from "../components/Header/Header";
import { TaskCard } from "../components/TaskBoard/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import axios from "axios";

export function Home() {

  const navigate = useNavigate();

  // https://pacaro-tarefas.netlify.app/api/eduardo/tasks
  const user = "felipe-rodrigues"
  const api = `https://pacaro-tarefas.netlify.app/api/${user}/`;
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

  const changeStepLeft = async (task) => {
    let updatedTasks;
    switch (task.step) {
      case "Pronto":
        // Salvar estado da alteração
        try {
          await axios.put(`${api}${tasks}/${task.id}`, {... task, step: "Em andamento"});
        }catch(error){ console.log(error.message) }
        // Fazer alteração local
        updatedTasks = done.filter((t) => t.id !== task.id);
        setDone(updatedTasks);
        setDoing([...doing, { ...task, step: "Em andamento" }]);
        toast(`Tarefa #${task.id} movida para "Em andamento"`);
        break;
      case "Em andamento":
        // Salvar estado da alteração
        try {
          await axios.put(`${api}${tasks}/${task.id}`, {... task, step: "Para fazer"});
        }catch(error){ console.log(error.message) }
        // Fazer alteração local
        updatedTasks = doing.filter((t) => t.id !== task.id);
        setDoing(updatedTasks);
        setToDo([...toDo, { ...task, step: "Para fazer" }]);
        toast(`Tarefa #${task.id} movida para "Para fazer"`);
        break;
      default:
        break;
    }
    console.log('Movendo para Esquerda');
  };

  const changeStepRight = async (task) => {
    let updatedTasks;
    switch (task.step) {
      case "Para fazer":
        // Salvar estado da alteração
        try {
          await axios.put(`${api}${tasks}/${task.id}`, {... task, step: "Em andamento"});
        }catch(error){ console.log(error.message) }
        // Fazer alteração local
        updatedTasks = toDo.filter((t) => t.id !== task.id);
        setToDo(updatedTasks);
        setDoing([...doing, { ...task, step: "Em andamento" }]);
        toast(`Tarefa #${task.id} movida para "Em andamento"`);
        break;
      case "Em andamento":
        // Salvar estado da alteração
        try {
          await axios.put(`${api}${tasks}/${task.id}`, {... task, step: "Pronto"});
        }catch(error){ console.log(error.message) }
        // Fazer alteração local
        updatedTasks = doing.filter((t) => t.id !== task.id);
        setDoing(updatedTasks);
        setDone([...done, { ...task, step: "Pronto" }]);
        toast(`Tarefa #${task.id} movida para "Pronto"`);
        break;
      default:
        break;
    }
    console.log('Movendo para Direita');
  };

  const removerTask = async (task) => {
    let updatelist;
    await axios.delete(`${api}${tasks}/${task.id}`);
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
    toast(`A tarefa #${task.id} foi deletada com sucesso!`);
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
    </div>
  );
}
