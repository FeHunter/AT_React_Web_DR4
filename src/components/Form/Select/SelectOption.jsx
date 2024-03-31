import { Field } from "formik"
import style from './SelectOption.module.css';

export function SelectOption ({type, name, placeholder}){
    return(
        <Field
            as="select"
            name={name}
            className={style.select}
        >
            <option value="Para fazer">Para fazer</option>
            <option value="Em andamento">Em Andamento</option>
            <option value="Pronto">Pronto</option>
        </Field>
    )
}