import { Field } from "formik"
import style from './TextField.module.css';

export function TextField ({type, name, placeholder}){
    return(
        <Field
            type={type}
            name={name}
            placeholder={placeholder}
            className={style.input}
        />
    )
}