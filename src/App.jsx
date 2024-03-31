import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { history } from "./history";
import { Home } from "./routes/Home";
import { CreateTask } from "./routes/CreateTask";
import { EditTask } from "./routes/EditTask";

export default function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-tarefa" element={<CreateTask />} />
        <Route path="/editar-tarefa/:id" element={<EditTask />} />
      </Routes>
    </HistoryRouter>
  );
}
