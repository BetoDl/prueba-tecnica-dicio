import { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";
import guiaImagen from "../include/rostro.svg"
/*
Componente: Fotografia
Props: gurdarFoto Función encragada de almacenar la fotografía en el state del padre
Descripción: Este componete recibe una imagen y la permite editar, para luego regresar el dato en Base64
*/

export default function EditorImagen({ imagen, regresarImagen }) {

    function tomarFoto() {

    }

    return (
        <>
            <div className='row'>
                <img src={imagen}></img>
                <button type='button' className='btn btn-danger m-2' onClick={() => { regresarImagen(false) }}>Reintentar</button>
            </div>
        </>
    );
}