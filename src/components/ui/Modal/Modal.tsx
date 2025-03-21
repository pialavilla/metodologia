import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import { ITarea } from '../../../types/ITarea'
import styles from './Modal.module.css'
import { useTareas } from '../../../hooks/useTareas'


type IModal={
    handleCloseModal:VoidFunction
}

const initialState: ITarea ={
    titulo:"",
    descripcion:"",
    fechaLimite:"",
};

export const Modal: FC<IModal>=({ handleCloseModal }) =>{
    const tareaActiva = tareaStore((state) => state.tareaActiva)
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const{CrearTarea,putTareaEditar}=useTareas()
     //estado
    const[formValues,setFormValues]=useState<ITarea>(initialState)

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormValues((prev)=>({ ...prev, [`${name}`]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (tareaActiva) {
            putTareaEditar(formValues)
        } else {
            CrearTarea({ ...formValues, id: new Date().toDateString() })
        }
        setTareaActiva(null)
        handleCloseModal()
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div>
                    <h3>{tareaActiva ? "editar tarea" : "CrearTarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <input placeholder="Ingrese un titulo" type="text" required onChange={handleChange} value={formValues.titulo} autoComplete="off" name='titulo' />
                    <textarea placeholder="Ingrese una descripcion" required onChange={handleChange} value={formValues.descripcion} name="descripcion"></textarea>
                    <input type="date" required onChange={handleChange} value={formValues.fechaLimite} autoComplete="off" name='fechaLimite' />
                    <div>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type='submit'>
                            {tareaActiva ? "editar tarea" : "creartarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
