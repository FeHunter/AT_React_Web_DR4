import style from "./TaskCard.module.css";

export function TaskCard({ task }) {
  return (
    <div className={style.card}>
      <span className={style.infos}>
        <p className={style.id}>#12</p>
        <h2>{task?.title}</h2>
        <p>{task?.discription}</p>
      </span>
      <span className={style.buttons}>
        <span className={style.button}>
          <i class="fa-solid fa-left-long"></i>
        </span>
        <span className={style.button}>
          <i class="fa-solid fa-right-long"></i>
        </span>
        <button className={style.button}>Editar</button>
        <button className={style.button}>Deletar</button>
      </span>
    </div>
  );
}
