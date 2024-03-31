import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Header } from "../components/Header/Header";
import style from "./EditTask.module.css";
import axios from "axios";
import { Component, useState } from "react";
import toast from "react-simple-toasts";
import { TextField } from "../components/Form/Input/TextField";
import { SelectOption } from "../components/Form/Select/SelectOption";
import { Button } from "../components/Form/Button/Button";
import { ErrorMsg } from "../components/Form/ErrorMsg/ErrorMsg";

export function EditTask() {
  const navigate = useNavigate();
  const {id} = useParams();

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
  const load = async () => {
    const taskId = id;
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

  class LoadAPI extends Component {
    constructor(props){
      super(props);
      this.state = { task: props.task }
      this.api = props.api;
      this.apiSource = props.task;
      this.taskId = props.taskId;
    }
    api;
    apiSource;
    taskId;
    
    componentDidMount(){
      load();
    }

    load = async ()=> {
      try{
        const requset = await axios.get(`${this.api}${this.apiSource}/${this.taskId}`);
        this.setState({ task:  requset.data });
      }catch(error){
        console.log(error.message);
      }
    }

    render(){
      return null;
    }
  }

  return (
    <div className={style.container}>
      
      {/* Componente de classe usando o ( componentDidMount ) e ( setState ) */}
      <LoadAPI/>

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
                <TextField
                  type="Text"
                  name="title"
                  placeholder="título..."
                  className={style.input}
                />
                <ErrorMsg name="title" />
            </div>
            <div className={style.inputCard}>
                <TextField
                  type="text"
                  name="description"
                  placeholder="descrição..."
                  className={style.input}
                />
                <ErrorMsg name="description" />
            </div>
            <div className={style.inputCard}>
                <SelectOption name="step"/>
                <ErrorMsg name="step" />
            </div>
            <Button type="submit" color="#F4CCCC" label="Atualizar" />
        </Form>
      </Formik>
    </div>
  );
}
