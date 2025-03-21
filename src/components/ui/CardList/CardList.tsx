import {FC} from "react";
import { ITarea } from '../../../types/ITarea'
import styles from './CardList.module.css'
import { useTareas } from "../../../hooks/useTareas";

type ICardList={
    tarea:ITarea;
    handleOpenModalEdit:(tarea:ITarea)=> void;
};

export const CardList: FC <ICardList>=({tarea,handleOpenModalEdit,})=>{
    const{eliminarTareas}=useTareas()
    const eliminarTareaById = () => {
        eliminarTareas(tarea.id!)
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
    }


    return (
        <div className={styles.containerCard}>
            <div>
                <h3>Titulo:{tarea.titulo}</h3>
                <p>Descripcion:{tarea.descripcion}</p>
                <p>
                    <b>Fecha Limite{tarea.fechaLimite}</b>
                </p>
            </div>
            <div className={styles.actionCard}>
            <button onClick={eliminarTareaById}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
            </div>
        </div>
    )
}


