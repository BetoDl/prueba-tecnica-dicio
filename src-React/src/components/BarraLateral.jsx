import { useState } from 'react';
/*
Componente: Barra Lateral
Props: cambioPantalla(pantalla) función encargada de modificar el state del padre
Descripción: Este componete muestra el Menu Lateral.
*/

//Declaración Variables Globales Sincronas
var anteriorActivo = "barra_Altas"; //variable para saber cual es el ultimo botóin seleccionado

export default function BarraLateral({ cambioPantalla }) {
    //función encargada de modificar el state de la pantalla en la que se encuentra actualmente el usuario
    function manejadorCambioPantalla(pantalla, evento) {
        cambioPantalla(pantalla);                           //Cambia la pantalla en el state del componente padre
        //Remueve y Agrega la clase active, encargada de resaltar el botón de la pantalla actual
        document.getElementById(anteriorActivo).classList.remove("active");
        evento.target.classList.add("active");
        anteriorActivo = evento.target.id;
    }

    return (
        <>
            <div className='col-3 BarraLateral_barra'>
                <h1 className='card-title'>Prueba Dicio</h1>
                <div className="list-group">
                    <button type="button" id="barra_Altas" className="list-group-item list-group-item-action active"
                        onClick={(e) => { manejadorCambioPantalla("Altas", e) }}
                    >
                        Altas
                    </button>
                    <button type="button" id="barra_Visualizacion" className="list-group-item list-group-item-action"
                        onClick={(e) => { manejadorCambioPantalla("Visualizacion", e) }}
                    >Visualización</button>
                    <button type="button" id="barra_Edicion" className="list-group-item list-group-item-action"
                        onClick={(e) => { manejadorCambioPantalla("Edicion", e) }}
                    >Edición</button>
                </div>
            </div>
        </>
    );
}