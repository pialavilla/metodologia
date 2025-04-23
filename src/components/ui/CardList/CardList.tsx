import { FC } from "react" 
import styles from "./CardList.module.css"
import { useTareas } from "../../../hooks/useTareas";
import { ITarea } from "../../../types/ITarea";
type ICardlist={
    tarea:ITarea;
    handleOpenModalEdit:(tarea:ITarea)=>void;
}
export const CardList:FC<ICardlist>=({tarea,handleOpenModalEdit})=>{
    const{eliminarTareas}=useTareas()
    const eliminarTarea=()=>{
    eliminarTareas(tarea.id!)
        
    }
    const editarTarea=()=>{
        handleOpenModalEdit(tarea)
        
    }

    return <div className={styles.containerCard}>
    <div>
            <h3>Titulo: {tarea.titulo}</h3>
            <p>Descripcion: {tarea.descripcion}</p>
            <p>Fecha Limite: <b>{tarea.fechaLimite}</b></p>
    </div>
    <div className={styles.actionCard}>
        <button onClick={eliminarTarea}>Eliminar</button>
        <button onClick={editarTarea}>Editar</button>
    </div>
    </div>
}