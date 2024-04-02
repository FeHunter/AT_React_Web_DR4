import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Header } from "../components/Header/Header";
import style from "./CreateTask.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { TextField } from "../components/Form/Input/TextField";
import { SelectOption } from "../components/Form/Select/SelectOption";
import { Button } from "../components/Form/Button/Button";
import { ErrorMsg } from "../components/Form/ErrorMsg/ErrorMsg";

export function CreateTask() {

  const navigate = useNavigate();

  // https://pacaro-tarefas.netlify.app/api/eduardo/tasks
  const user = "felipe-rodrigues"
  const api = `https://pacaro-tarefas.netlify.app/api/${user}/`;
  const tasks = "tasks";

  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const request = await axios.get(`${api}${tasks}`);
    console.log(request.data);
    setTasksList(request.data);
  };

  const stepSchema = yup
    .string()
    .matches(
      /Para fazer|Em andamento|Pronto/,
      'Os passos devem ser "ParPara fazer", "Em andamento" ou "Pronto"',
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
    step: stepSchema,
  });

  const sendData = async (values) => {
    const task = {
      title: values.title,
      description: values.description,
      step: values.step,
    };
    try {
      await axios.post(`${api}${tasks}`, task);
      toast("Tarefa criada com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.container}>
      <Header />
      <Formik
        initialValues={{ createdAt: "", title: "", description: "", step: "Para fazer", user: user, id: "" }}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          values.createdAt = new Date().toISOString();
          values.id = (Math.random()*1000).toFixed(1);
          sendData(values);
        }}
      >
        <Form className={style.form}>
          <div className={style.inputCard}>
            <TextField
              type="Text"
              name="title"
              placeholder="título..."
            />
            <ErrorMsg name="title" />
          </div>
          <div className={style.inputCard}>
            <TextField
              type="text"
              name="description"
              placeholder="descrição..."
            />
            <ErrorMsg name="description" />
          </div>
          <div className={style.inputCard}>
            <SelectOption name="step"/>
            <ErrorMsg name="step" />
          </div>
          <Button type="submit" label="Adicionar" />
        </Form>
      </Formik>
    </div>
  );
}
