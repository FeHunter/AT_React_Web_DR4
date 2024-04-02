import { Form, Formik } from "formik";
import { Component } from "react";
import { TextField } from "./Form/Input/TextField";
import { ErrorMsg } from "./Form/ErrorMsg/ErrorMsg";
import { Button } from "./Form/Button/Button";
import { SelectOption } from "./Form/Select/SelectOption";
import axios from "axios";
import toast from "react-simple-toasts";
import style from '../routes/EditTask.module.css';

class EditTaskClass extends Component {
    constructor(props) {
        super(props);
        this.api = `https://pacaro-tarefas.netlify.app/api/felipe-rodrigues/tasks`;
        this.id = props.id;
        this.navigate = props.navigate;
        this.task = props.task;
        this.state = {
            initialValues: { 
                title: "",
                description: "",
                step: "",
            },
            form: { 
                createdAt: "",
                description: "",
                id: "",
                step: "",
                title: "",
                user: "",
            },
        };
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        try {
            const request = await axios.get(`${this.api}/${this.id}`);
            this.setState({ form: request.data });
        } catch (error) {
            console.log(error.message);
        }
    }

    async save(values) {
        try {
            await axios.put(`${this.api}/${this.id}`, values);
            toast(`A tarefa #${values.id} foi editada com sucesso!`);
            this.navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.task !== this.props.task) {
            this.setState({ form: this.props.task });
        }
    }

    render() {
        return (
            <Formik
                initialValues={this.state.form}
                onSubmit={(values) => {
                    values.createdAt = new Date().toISOString();
                    this.save(values);
                }}
                enableReinitialize={true}
            >
                <Form className={style.form}>
                    <div className={style.inputCard}>
                        <TextField
                            type="text"
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
        );
    }
}

export default EditTaskClass;
