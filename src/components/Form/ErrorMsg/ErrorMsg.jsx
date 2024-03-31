import { ErrorMessage } from "formik"
import style from './ErrorMsg.module.css';

export function ErrorMsg ({name}){
    return(
        <ErrorMessage
            name={name}
            component="p"
            className={style.error}
        />
    )
}