import { Link } from "react-router-dom";
import style from "./TaskCard.module.css";
import { Component } from "react";

export function TaskCard({ task, stepLeft, stepRight, deleteTask, editTask }) {

  const edit = () => {
    editTask(task);
  }

  // Botão - Componente de classe
  class DeleteButton extends Component {
    constructor(props) {
      super(props);
      this.callFunction = props.callFunction;
    }
    callFunction;

    activeFunction = ()=>{
      this.callFunction();
    }
    
    render(){
      return(
        <button className={style.button} onClick={this.activeFunction}>Deletar</button>
      );
    }
  }

  return (
    <div className={style.card}>
      <span className={style.infos}>
        <p className={style.id}>#{task.id}</p>
        <h2>{task?.title}</h2>
        <p>{task?.description}</p>
      </span>
      <span className={style.buttons}>
        {task.step === "Para fazer" && (
          // Move para direita
          <span className={style.button} onClick={stepRight}>
            <i class="fa-solid fa-right-long"></i>
          </span>
        )}
        {task.step === "Em andamento" && (
          // Move dereita e esquerda
          <>
            <span className={style.button} onClick={stepLeft}>
              <i class="fa-solid fa-left-long"></i>
            </span>
              <span className={style.button} onClick={stepRight}>
              <i class="fa-solid fa-right-long"></i>
            </span>
          </>
        )}
        {task.step === "Pronto" && (
          // Move para esquerda
          <span className={style.button} onClick={stepLeft}>
            <i class="fa-solid fa-left-long"></i>
          </span>
          
        )}
        <Link to={`/editar-tarefa/${task.id}`}>
          <button className={style.button}>Editar</button> 
        </Link>
        <DeleteButton  callFunction={deleteTask} />
      </span>
    </div>
  );
}
