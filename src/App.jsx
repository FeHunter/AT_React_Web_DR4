import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { history } from "./history";
import { Home } from "./routes/Home";
import { CreateTask } from "./routes/CreateTask";

export default function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateTask" element={<CreateTask />} />
      </Routes>
    </HistoryRouter>
  );
}
