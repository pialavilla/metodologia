import { useEffect } from "react";
import { Header } from "../Header/Header";
import { useTareas } from "../../../hooks/useTareas";
import { CardList } from "../CardList/CardList";

export const TareasScreen = () => {
    const { tareas, getTareas } = useTareas();

    useEffect(() => {
        getTareas(); // Carga las tareas al montar el componente
    }, []);
    console.log("Tareas en estado:", tareas)

    return (
        <div>
            <Header />
            <h2>Lista de Tareas</h2>
            {tareas.length > 0 ? (
                tareas.map((tarea) => (
                    <CardList key={tarea.id} tarea={tarea} handleOpenModalEdit={() => {}} />
                ))
            ) : (
                <p>No hay tareas disponibles</p>
            )}
        </div>
    );
};
