import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { Header } from "../components/Header/Header";
import style from "./EditTask.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";

export function EditTask() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = "felipe-rodrigues";
  const api = `https://pacaro-tarefas.netlify.app/api/${user}/`;
  const tasks = "tasks";

  const [task, setTask] = useState({
    createdAt: "",
    title: "",
    description: "",
    step: "",
    id: ""
  });

  useEffect(() => {
    load();
  }, [task]);

  const load = async () => {
    const taskId = location.state.id;
    const request = await axios.get(`${api}${tasks}/${taskId}`);
    setTask(request.data);
  };

  const stepSchema = yup
    .string()
    .matches(
      /Para fazer|Em andamento|Pronto/,
      'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto"'
    );

  const validateSchema = yup.object({
    title: yup
      .string()
      .required("É necessário informar o título")
      .min(4, "O título precisa ter pelo menos 4 caracteres")
      .max(64, "O título pode ter no máximo 64 caracteres"),
    description: yup
      .string()
      .required("É necessário informar a descrição")
      .min(8, "A descrição precisa ter pelo menos 8 caracteres")
      .max(128, "A descrição pode ter no máximo 128 caracteres"),
    step: stepSchema
  });

  const sendData = async (values) => {
    try {
      await axios.put(`${api}${tasks}/${values.id}`, values);
      toast(`A tarefa #${values.id} foi editada com sucesso!`);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.container}>
      <Header />
      <Formik
        initialValues={task}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          values.createdAt = new Date().toISOString();
          sendData(values);
        }}
        enableReinitialize={true}
      >
        <Form className={style.form}>
            <h2 className={style.title}>Editar tarefa #{task.id}</h2>
            <div className={style.inputCard}>
                <Field
                    type="Text"
                    name="title"
                    placeholder="título..."
                    className={style.input}
                />
                <ErrorMessage
                    name="title"
                    component="p"
                    className={style.erroMsg}
                />
            </div>
            <div className={style.inputCard}>
                <Field
                    type="text"
                    name="description"
                    placeholder="descrição..."
                    className={style.input}
                />
                <ErrorMessage
                    name="description"
                    component="p"
                    className={style.erroMsg}
                />
            </div>
            <div className={style.inputCard}>
                <Field as="select" name="step" className={style.input}>
                <option value="Para fazer">Para fazer</option>
                <option value="Em andamento">Em Andamento</option>
                <option value="Pronto">Pronto</option>
                </Field>
                <ErrorMessage name="step" component="p" className={style.erroMsg} />
            </div>
            <button type="submit" className={style.addButton}>
                Atualizar
            </button>
        </Form>
      </Formik>
    </div>
  );
}
