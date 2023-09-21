import { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import {
    centerCrop,
    makeAspectCrop,
} from "react-image-crop";
/*
Componente: Editor imagen
Props:  -imagen: la imagen que se tomó con la camara en DATAURL
        -regresarImagen: función encargada de regresar la imagen al padre en formato base64
Descripción: Este componete recibe la imagen capturada y muestra el menú para recortarla
*/

export default function EditorImagen({ imagen, regresarImagen, finalizar }) {
    //Declaración State
    const [crop, setCrop] = useState(({
        unit: 'px',
        x: 50,
        y: 20,
        width: 300,
        height: 300,

    }));
    const [imagenBase64, setImagenBase64] = useState(false);
    //Declaración de ref's
    const aspect = useRef(9 / 9);;
    const imagenOriginal = useRef(false);
    const canvasFotorecortada = useRef(false);

    function centrarRecorte() {
        let aspecto = aspect.current;
        let mediaWidth = imagenOriginal.current.width;
        let mediaHeight = imagenOriginal.current.height;
        setCrop(centerCrop(
            makeAspectCrop(
                {
                    unit: 'px',
                    width: 300,
                    height: 300
                },
                aspecto,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        ));
    }
    //Está función crea un cavas y recorta con los paramtros de la propiedad Crop la imagen original
    //La convierte en Base64 y lo almacena en un state
    function recortar() {
        const pixelcrop = crop;
        const canvas = canvasFotorecortada.current;
        canvas.hidden = false;
        canvas.width = pixelcrop.width;
        canvas.height = pixelcrop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            imagenOriginal.current,
            pixelcrop.x,
            pixelcrop.y,
            pixelcrop.width,
            pixelcrop.height,
            0,
            0,
            pixelcrop.width,
            pixelcrop.height
        );
        const base64image = canvas.toDataURL('image/png');
        setImagenBase64(base64image);
    }
    //Está función reinicia el canvas para volver a recortar la imagen
    function reiniciar() {
        const canvas = canvasFotorecortada.current;
        canvas.hidden = true;
        setImagenBase64(false);
    }
    //Está función envía la imagen recortada en base 64 al padre y finaliza el proceso
    function finalizarFotos() {
        regresarImagen(imagenBase64);
        finalizar(true);
    }
    return (
        <>
            <canvas hidden ref={canvasFotorecortada} id='canvas_foto_recortda'>
            </canvas>
            {
                !imagenBase64 ?
                    <div className='row'>
                        <ReactCrop crop={crop} onChange={(crop, percentCrop) => setCrop(crop)} keepSelection locked >
                            <img ref={imagenOriginal} src={imagen} onLoad={centrarRecorte} />
                        </ReactCrop>
                        <button type='button' className='btn btn-danger m-2' onClick={recortar} >Recortar</button>
                        <button type='button' className='btn btn-danger m-2' onClick={() => { regresarImagen(false) }} >Volver a Tomar Foto</button>
                    </div>
                    :
                    <div className='row'>

                        <button type='button' className='btn btn-danger m-2' onClick={reiniciar} >Volver a Recortar</button>
                        <button type='button' className='btn btn-danger m-2' onClick={() => { regresarImagen(false) }} >Volver a Tomar Foto</button>
                        <button type='button' className='btn btn-success m-2' data-bs-dismiss="modal" onClick={finalizarFotos} >Finalizar</button>
                    </div>
            }
        </>
    );
}