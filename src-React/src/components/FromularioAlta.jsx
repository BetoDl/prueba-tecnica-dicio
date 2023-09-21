import { useState } from 'react';
import "bootstrap";
import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import Fotografia from './Fotografia';
import axios from "axios";

/*
Componente: Formulario Alta
Descripción: Componente encargado de Capturar y dar de Alta los datos del Usuario, este componenete tiene un modo de edición que recibe los datos del usuario a edtiar y el modo como "Edicion"
*/

export default function FromularioAlta({ datosIniciales, modo }) {
    //Declaración de States
    const [id_usuario, setId_usuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [edad, setEdad] = useState(0);
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [colonia, setColonia] = useState('');
    const [del_mun, setDel_mun] = useState('');
    const [estado, setEstado] = useState('');
    const [cp, setCP] = useState('');
    const [camara, setCamara] = useState(false);
    const [selfie, setSelfie] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    //variables de Ref
    const modalSelfie = useRef(false);
    const modalMensaje = useRef(false);
    //Declaración de expresiones regulares para verificaciones
    const ReExpNombresNegado = "([^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ])+"; //Para eliminar Datos
    const ReExpNombres = "([a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ])+"; //En caso de que Falles se verifican directamente los datos en el Form
    const ReExpCallesNegado = "([^a-zA-z0-9áéíóúÁÉÍÓÚüÜñÑ ])+";
    const ReExpCalles = "([a-zA-z0-9áéíóúÁÉÍÓÚüÜñÑ ])+";
    const ReExpNumerosNegado = "([^0-9])+";
    const ReExpNumeros = "([0-9])+";
    const ReExpEmail = "(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)";
    //inicializar variables de datos
    useEffect(() => {
        if (datosIniciales && modo == "edicion") {
            setId_usuario(datosIniciales.id);
            setNombre(datosIniciales.nombre);
            setPaterno(datosIniciales.apellidoPaterno);
            setMaterno(datosIniciales.apellidoMaterno);
            setEdad(datosIniciales.edad);
            setEmail(datosIniciales.email);
            setFecha(datosIniciales.fechaNac);
            if (datosIniciales.datos) {
                setCalle(datosIniciales.datos.calle);
                setNumero(datosIniciales.datos.numero);
                setColonia(datosIniciales.datos.colonia);
                setDel_mun(datosIniciales.datos.delegacion);
                setEstado(datosIniciales.datos.estado);
                setCP(datosIniciales.datos.cp);
                setSelfie(datosIniciales.datos.imagen);
            }
        }
    },
        []);
    //Dar de alta los Modales equivalente Component Did mount
    useEffect(() => {
        modalSelfie.current = new Modal(document.getElementById('FotpgrafiaModal'));
        modalMensaje.current = new Modal(document.getElementById('ModalMensaje'));
    },
        []);
    //verifica que se ha terminado de tomar la fotografía.
    useEffect(() => {
        if (selfie) {
            setCamara(false);
        }
    },
        [selfie]);

    //Funciónes encargadas de almacenar y verificar las entradas
    function manejadorNombre(e) {
        let reg = new RegExp(ReExpNombresNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setNombre(cadenaProcesada);
    }
    function manejadorPaterno(e) {
        let reg = new RegExp(ReExpNombresNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setPaterno(cadenaProcesada);
    }
    function manejadorMaterno(e) {
        let reg = new RegExp(ReExpNombresNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setMaterno(cadenaProcesada);
    }
    function manejadorEmail(e) {
        let cadenaProcesada = e.target.value.toLowerCase();
        setEmail(cadenaProcesada);
    }
    function manejadorFecha(e) {
        let edad = new Date().getFullYear() - parseInt(e.target.value.split("-")[0]);
        setEdad(edad);
        setFecha(e.target.value);
    }
    function manejadorCalle(e) {
        let reg = new RegExp(ReExpCallesNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setCalle(cadenaProcesada);
    }
    function manejadorNumero(e) {
        let reg = new RegExp(ReExpNumerosNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setNumero(cadenaProcesada);
    }
    function manejadorColonia(e) {
        setColonia(e.target.value);
    }
    function manejadorDelegacionMunicipio(e) {
        setDel_mun(e.target.value);
    }
    function manejadorEstado(e) {
        let reg = new RegExp(ReExpNombresNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setEstado(cadenaProcesada);
    }
    function manejadorCP(e) {
        let reg = new RegExp(ReExpNumerosNegado);
        let cadenaProcesada = e.target.value.replace(reg, "");
        setCP(cadenaProcesada);
    }
    //Función que envía los datos al servidor
    function enviarDatos(e) {
        e.preventDefault();
        setEnviando(true); // Deshabilitando botones durante el envío
        let datos = { //Armando datos para la petición
            "nombre": nombre.trim(),
            "apellidoPaterno": paterno.trim(),
            "apellidoMaterno": materno.trim(),
            "edad": edad,
            "email": email.trim(),
            "fechaNac": fecha,
            "datos": JSON.stringify({ //Transformando en formato JSON Andidado
                "calle": calle.trim(),
                "numero": numero.trim(),
                "colonia": colonia.trim(),
                "delegacion": del_mun.trim(),
                "estado": estado.trim(),
                "cp": cp.trim(),
                "imagen": selfie
            })
        }
        let tipoPeticion = "POST";
        let url = "https://api.devdicio.net:8444/v1/sec_dev_interview/";
        if (modo == "edicion") { //cambio de URL en caso de edición
            url = "https://api.devdicio.net:8444/v1/sec_dev_interview/" + id_usuario;
            tipoPeticion = "PUT";
        }
        axios({
            url: url,
            method: tipoPeticion,
            data: (datos),
            responseType: "text",
            contentType: "application/json",
            headers: {
                "host": "api.devdicio.net",
                "xc-token": "J38b4XQNLErVatKIh4oP1jw9e_wYWkS86Y04TMNP"
            }
        }).then((response) => {

            try {
                if (response.status == 200) {
                    modalMensaje.current.show();
                    setMensaje("Datos Guardados Correctamente");
                    limpiar();
                }
                else {
                    modalMensaje.current.show();
                    setMensaje("Error");
                }
            } catch (err) {
                console.error('Error:', err);
                modalMensaje.current.show();
                setMensaje("Error");
            }
        }).catch((response) => {
            console.error('Error:', response);
            modalMensaje.current.show();
            setMensaje("Error");
        });
    }
    //Funcion encargada de limpiar el formulario
    function limpiar() {
        setNombre("");
        setPaterno("");
        setMaterno("");
        setEdad("");
        setEmail("");
        setFecha("");
        setCalle("");
        setColonia("");
        setNumero("");
        setDel_mun("");
        setNumero("");
        setEstado("");
        setCP("");
        setCamara(false);
        setSelfie(false);
        setEnviando(false);
    }

    return (
        <div className='FromularioAlta_general col-8'>
            <div className='container'>
                <form className='needs-validation' onSubmit={enviarDatos}>
                    <label className="form-label" htmlFor="nombre">Nombre: </label>
                    <div className="input-group input-group-sm mb-3">
                        <input onChange={manejadorNombre} value={nombre} type="text" id="nombre" className="form-control" placeholder="Nombre" required pattern={ReExpNombres} />
                    </div>
                    <label className="form-label col-6" htmlFor="nombre">Paterno: </label>
                    <label className="form-label col-6" htmlFor="nombre">Materno: </label>
                    <div className="input-group input-group-sm mb-3">
                        <input onChange={manejadorPaterno} value={paterno} type="text" id="apellidoPaterno" className="form-control" placeholder="Paterno" pattern={ReExpNombres} required />
                        <input onChange={manejadorMaterno} value={materno} type="text" id="apellidoMaterno" className="form-control" placeholder="Materno" pattern={ReExpNombres} required />
                    </div>
                    <label className="form-label" htmlFor="nombre">Email: </label>
                    <div className="input-group input-group-sm mb-3">
                        <input onChange={manejadorEmail} value={email} type="email" id="email" className="form-control" placeholder="ejemplo@ejemplo.com" pattern={ReExpEmail} required />
                    </div>
                    <label className="form-label" htmlFor="nombre">Fecha Nacimiento: </label>
                    <div className="input-group input-group-sm mb-3">
                        <input onChange={manejadorFecha} value={fecha} type="date" id="email" className="form-control" placeholder="20/09/2023" required />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Calle</span>
                        <input onChange={manejadorCalle} value={calle} type="text" className="form-control" placeholder="Calle" pattern={ReExpCalles} required />
                        <span className="input-group-text">Número</span>
                        <input onChange={manejadorNumero} value={numero} type="number" maxLength="5" className="form-control" placeholder="Número" pattern={ReExpNumeros} required />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Colonia</span>
                        <input onChange={manejadorColonia} value={colonia} type="text" className="form-control" placeholder="Colonia" required />
                        <span className="input-group-text">Delegación/Municipio</span>
                        <input onChange={manejadorDelegacionMunicipio} value={del_mun} type="text" className="form-control" placeholder="Delegación/Municipio" required />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Estado</span>
                        <input onChange={manejadorEstado} value={estado} type="text" className="form-control" placeholder="Estado" pattern={ReExpCalles} required />
                        <span className="input-group-text">CP</span>
                        <input onChange={manejadorCP} value={cp} type="number" className="form-control" placeholder="CP" pattern={ReExpNumeros} required />
                    </div>
                    <button disabled={enviando} className='btn btn-primary m-2' type='button' onClick={() => { modalSelfie.current.show(); setCamara(true); }}> Tomar Selfie</button>
                    <button disabled={enviando | !selfie} className="btn btn-success" type="submit">Dar de Alta</button>
                </form>
            </div>
            {/*<!-- Modal Fotografía -->*/}
            <div className="modal fade" id="FotpgrafiaModal" tabIndex="-1" role="dialog" aria-labelledby="FotpgrafiaModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content justify-content-center">
                        <div className="modal-header">
                            <h5 className="modal-title" id="FotpgrafiaModalLabel">Selfie</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setCamara(false); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {camara ?
                                <Fotografia regresarImagen={setSelfie} />
                                :
                                <label>Cargando</label>
                            }
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => { setCamara(false); }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- Modal Mensaje -->*/}
            <div className="modal fade" id="ModalMensaje" tabIndex="-1" role="dialog" aria-labelledby="ModalMensajeLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content justify-content-center">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalMensajeLabel">Aviso</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h1>
                                {mensaje}
                            </h1>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}