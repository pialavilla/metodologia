import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorId, getAllTareas, postNuevaTarea } from "../http/tarea"
import { ITarea } from "../types/ITarea"
import Swal from "sweetalert2"


export const useTareas = () => {
    
    const{tareas,setArrayTareas,agregarNuevaTarea, eliminarUnaTarea,editarUnaTarea}= tareaStore(useShallow((state)=>({
        tareas : state.tareas,
        setArrayTareas:state.setArrayTareas,
        agregarNuevaTarea:state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea:state.editarUnaTarea
    })))

    const getTareas = async () => {
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    };
    
    
    const CrearTarea =async (nuevaTarea:ITarea)=>{
        agregarNuevaTarea(nuevaTarea)
        try{
            await postNuevaTarea(nuevaTarea);
            Swal.fire("exito","tarea creada correctamente","success")
        }catch(error){
            eliminarUnaTarea(nuevaTarea.id!)
            console.log("algo salio mal al crear la tarea")
        }
    };
    
    const putTareaEditar =async (tareaEditada:ITarea)=>{
        const estadoPevio = tareas.find((el)=>el.id === tareaEditada.id)
        editarUnaTarea(tareaEditada)
        try{
            await editarTarea(tareaEditada);
            Swal.fire("exito","tarea actualizada correctamente","success")
        }catch (error){
            if (estadoPevio) editarUnaTarea(estadoPevio);
            console.log('algo salio mal al editar')
        }
    };
    
    const eliminarTareas =async(idTarea:string)=>{
        const estadoPevio = tareas.find((el)=>el.id==idTarea);
        const confirm =await Swal.fire({
            title: "estas seguro?",
            text:"esta accion no se puede deshacer",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText:"cancelar",
    });
        if(!confirm.isConfirmed)return;
        eliminarUnaTarea(idTarea);
        try{
            await eliminarTareaPorId(idTarea)
            Swal.fire("eliminado", " la tarea se elimino correctamente","success")
        }catch(error){
            if(estadoPevio) agregarNuevaTarea(estadoPevio);
            console.log('algo salio mal al editar');
        }
    };
    
    return {
        getTareas,
        CrearTarea,
        putTareaEditar,
        eliminarTareas,
        tareas,
    };
};
