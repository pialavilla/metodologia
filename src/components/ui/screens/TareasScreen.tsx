import { useEffect } from "react";
import { Header } from "../Header/Header";
import { useTareas } from "../../../hooks/useTareas";
import { CardList } from "../CardList/CardList";
import { ListTareas } from "../ListTareas/ListTareas";

export const TareasScreen = () => {
    const { tareas, getTareas } = useTareas();

    useEffect(() => {
        getTareas(); // Carga las tareas al montar el componente
    }, []);
    console.log("Tareas en estado:", tareas)

    return (
        <div>
            <Header />
            <ListTareas/>
        </div>
    );
};
