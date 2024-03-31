import style from './Button.module.css';

export function Button ({label, color, type}){
    return (
        <button
            type={type}
            style={{backgroundColor: color}}
            className={style.button}
        >
            {label}
        </button>
    );
}