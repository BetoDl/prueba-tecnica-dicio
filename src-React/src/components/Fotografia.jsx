import { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";
import guiaImagen from "../include/rostro.svg"
import EditorImagen from './EditorImagen';

/*
Componente: Fotografia
Props: gurdarFoto Función encragada de almacenar la fotografía en el state del padre
Descripción: Este componete se encarga de tomar la fotografía y editarla
*/

export default function Fotografia({ regresarImagen }) {
    //Declaración de estados
    const [ancho, setAncho] = useState(300);
    const [alto, setAlto] = useState(600);
    const [imagen, setImagen] = useState(false);
    const [finalizar, setFinalizar] = useState(false);
    //Declaracion de refs
    const webcamRef = useRef(null);
    //calculando tamaño de ventana de Video
    useEffect(() => {
        setTimeout(() => {
            setAncho(document.getElementById("contenedor_webcam").clientWidth - 10);
            setAlto(window.innerHeight * .6);
        }, 700);
    },
        [window.innerHeight, window.innerWidth]);
    //verificando que el proceso no haya terminado
    useEffect(() => {
        if (finalizar) {
            regresarImagen(imagen);
            setImagen(false);
        }
    },
        [finalizar]);
    //mostrar dispositivos en consola
    function handleDevices(mediaDevices) {
        console.log("Dispositivos: ", mediaDevices);
    }
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
        []);
    //Función que recupera la fotografia y la almacena
    function tomarFoto() {
        setImagen(webcamRef.current.getScreenshot());
    }
    //Función para recuperar archivo
    function obtenerArchivo(e) {
        let archivo = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = () => {
            setImagen(reader.result);
        };
    }


    return (
        <>
            {!imagen ?
                <div className='row'>
                    <div className="container" id="contenedor_webcam">
                        <Webcam height={alto} width={ancho} ref={webcamRef} />
                        <img style={{ height: alto * .6 }} id="imagen_guia_fotografia" src={guiaImagen}></img>
                    </div>
                    <div className='row m-2'>
                        <button className='btn btn-success' type='button' onClick={tomarFoto}>
                            Tomar Foto
                        </button>
                    </div>
                    <div className='row m-2'>
                        <label>Subir archivo: </label>
                        <input type='file' id="archivo" accept='image/png' onChange={obtenerArchivo} />
                    </div>
                </div>
                :
                <div className='row'>
                    <EditorImagen imagen={imagen} regresarImagen={setImagen} finalizar={setFinalizar} />
                </div>
            }
        </>
    );
}