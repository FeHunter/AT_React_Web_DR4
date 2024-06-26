import style from "./Header.module.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className={style.header}>
      <Link to="/">
        <span style={{ display: "flex", alignItems: "center" }}>
          <i
            class="fa-solid fa-dove"
            style={{ color: "#F99417", fontSize: "2em", marginRight: "20px" }}
          ></i>
          <h1 className={style.title}>Paçaro Tarefas, Version FR</h1>
        </span>
      </Link>
      <Link to="/criar-tarefa" className={style.buttonArea}>
        <button className={style.btnAddTask}>Criar Tarefa </button>
      </Link>
    </header>
  );
}
