import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Modal.module.css"
import { useTareas } from "../../../hooks/useTareas"
import { ITarea } from "../../../types/ITarea"

type IModal={
    handleCloseModal:VoidFunction
}
const initialState:ITarea={
    titulo:'',
    descripcion:'',
    fechaLimite:''

}
export const Modal:FC<IModal>=({handleCloseModal})=>{
    const tareaActiva=tareaStore((state)=>state.tareaActiva)
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)
    const{CrearTarea,putTareaEditar}=useTareas()
    //estado
    const[formValues,setFormValues]=useState<ITarea>(initialState)

    useEffect(()=>{
        if (tareaActiva) setFormValues(tareaActiva)
    },[])
    ///podemos manejar toodos los inputs, modificando el estado tanto de una tarea nueva o una ya hecha 
    //modificar tarea
    const handleChange=(e:ChangeEvent<HTMLInputElement |HTMLTextAreaElement>)=>{
        //desestructurar
        const{name,value}=e.target
        //nos permitira modificar el value
        setFormValues((prev)=>({...prev,[`${name}`]:value}))
    }
    //guardar el formulario
    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        if (tareaActiva) {
            putTareaEditar(formValues)
        }else{
            CrearTarea({...formValues,id: new Date().toDateString()})
        }
        setTareaActiva(null)
        handleCloseModal()

    }
    return <div className={styles.containerPrincipalModal}>
        <div className={styles.contendPopUp}>
        <div >
            <h3>{tareaActiva?"Editar Tarea":"Crear Tarea"} </h3>
        </div>
        {/*on submit envia el formulario*/}
        <form onSubmit={handleSubmit} className={styles.formContent}>
            <div >
            <input onChange={handleChange} value={formValues.titulo} type="text" required autoComplete="off" placeholder="Ingrese el Titulo" name="titulo"/>
            <textarea onChange={handleChange} value={formValues.descripcion} placeholder="Ingrese una descripcion" required name="descripcion" ></textarea>
            <input onChange={handleChange} value={formValues.fechaLimite} type="date" required autoComplete="off" name="fechaLimite"/>
            </div>
            <div className={styles.buttonCard}>
                <button onClick={handleCloseModal}>Cancelar</button>
                <button type="submit">{tareaActiva?"Editar Tarea":"Crear Tarea"}</button>
            </div>
        </form>
        </div>
    </div>
}