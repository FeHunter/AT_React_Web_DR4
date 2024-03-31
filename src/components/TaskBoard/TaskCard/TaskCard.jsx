import style from "./TaskCard.module.css";

export function TaskCard({ task, stepLeft, stepRight, deleteTask, editTask }) {

  const edit = () => {
    editTask(task);
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
        <button className={style.button} onClick={edit}>Editar</button>
        <button className={style.button} onClick={deleteTask}>Deletar</button>
      </span>
    </div>
  );
}
