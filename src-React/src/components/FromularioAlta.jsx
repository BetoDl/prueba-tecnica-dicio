import { useState } from 'react';
import "bootstrap";
import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import Fotografia from './Fotografia';
//import { Modal } from 'bootstrap';
/*
Componente: Formulario Alta
Descripción: Componente encargado de Capturar y dar de Alta los datos del Usuario
*/

export default function FromularioAlta() {
    //Declaración de States
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [colonia, setColonia] = useState('');
    const [del_mun, setDel_mun] = useState('');
    const [estado, setEstado] = useState('');
    const [cp, setCP] = useState('');
    const [camara, setCamara] = useState(false);
    //variables de Ref
    const modalSelfie = useRef(false);
    //Declaración de expresiones regulares para verificaciones
    const ReExpNombresNegado = "([^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ])+"; //Para eliminar Datos
    const ReExpNombres = "([a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ])+"; //En caso de que Falles se verifican directamente los datos en el Form
    const ReExpCallesNegado = "([^a-zA-z0-9áéíóúÁÉÍÓÚüÜñÑ ])+";
    const ReExpCalles = "([a-zA-z0-9áéíóúÁÉÍÓÚüÜñÑ ])+";
    const ReExpNumerosNegado = "([^0-9])+";
    const ReExpNumeros = "([0-9])+";
    const ReExpEmail = "(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)";
    //Dar de alta los Modales equivalente Component Did mount
    useEffect(() => {
        modalSelfie.current = new Modal(document.getElementById('FotpgrafiaModal'));
    },
        []);

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

    return (
        <div className='FromularioAlta_general col-8'>
            <div className='container'>
                <form className='needs-validation'>
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
                    <button className='btn btn-primary m-2' type='button' onClick={() => { modalSelfie.current.show(); setCamara(true); }}> Tomar Selfie</button>
                    <button className="btn btn-primary" type="submit">Dar de Alta</button>
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
                                <Fotografia />
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
        </div>

    );
}