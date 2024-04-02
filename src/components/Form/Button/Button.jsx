import style from './Button.module.css';

export function Button ({label, type}){
    return (
        <button
            type={type}
            className={style.button}
        >
            {label}
        </button>
    );
}