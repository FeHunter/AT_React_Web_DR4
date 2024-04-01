import { Form, Formik } from "formik";
import { Component } from "react";
import { TextField } from "./Form/Input/TextField";
import { ErrorMsg } from "./Form/ErrorMsg/ErrorMsg";
import { Button } from "./Form/Button/Button";
import style from '../routes/EditTask.module.css';
import { SelectOption } from "./Form/Select/SelectOption";
import axios from "axios";
import toast from "react-simple-toasts";

class EditTaskClass extends Component {
    constructor(props){
        super(props);
        
        this.api = `https://pacaro-tarefas.netlify.app/api/felipe-rodrigues/tasks`
        this.id = props.id;

        this.navigate = props.navigate;
        this.task = props.task;

        this.state = {
            initialValues: '',
            form: {
                createdAt: '',
                description: '',
                id: '',
                step: '',
                title: '',
                user: '',
            }
        };
    }
    id;
    navigate;
    task;

    componentDidMount(){
        // this.load();
        this.setState({ form: this.task });
    }

    async load () {
        try {
            const request = await axios.get(`${this.api}/${this.id}`);
            this.setState({ form: request.data });
            console.log(request.data);
        }catch(error) {
            console.log(error.message)
        }
    }

    async save (){
        try {
            await axios.put(`${this.api}/${this.id}`, this.form);
            toast(`A tarefa #${values.id} foi editada com sucesso!`);
            // navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidUpdate(prev, next){
        console.log("Prev: ", prev);
        if (prev.form !== this.form){
            this.setState({ form: next });
        }
    }


    render(){
        return null;
        // return (
        //     <Formik
        //         initialValues={{ title: this.state.form.title, description: this.state.form.description, step: this.state.form.step }}
        //         // validationSchema={validateSchema}
        //         onSubmit={(values) => {
        //             values.createdAt = new Date().toISOString();
        //             this.setState = ({title: values.title });
        //             this.setState = ({title: values.description });
        //             this.setState = ({title: values.step });
        //             this.setState = ({title: values.createdAt });
        //             this.save();
        //         }}
        //         enableReinitialize={true}
        //     >
        //         <Form className={style.form}>
        //             {/* <h2 className={style.title}>Editar tarefa #{this.formValues.id}</h2> */}
        //             <div className={style.inputCard}>
        //                 <TextField
        //                     type="Text"
        //                     name="title"
        //                     placeholder="título..."
        //                     className={style.input}
        //                 />
        //                 <ErrorMsg name="title" />
        //             </div>
        //             <div className={style.inputCard}>
        //                 <TextField
        //                 type="text"
        //                 name="description"
        //                 placeholder="descrição..."
        //                 className={style.input}
        //                 />
        //                 <ErrorMsg name="description" />
        //             </div>
        //             <div className={style.inputCard}>
        //                 <SelectOption name="step"/>
        //                 <ErrorMsg name="step" />
        //             </div>
        //             <Button type="submit" color="#F4CCCC" label="Atualizar" />
        //         </Form>
        //     </Formik>
        // );
    }
}

export default EditTaskClass;