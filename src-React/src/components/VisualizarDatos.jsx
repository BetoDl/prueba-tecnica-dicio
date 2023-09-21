import { useState, useEffect, useRef } from 'react';
import "bootstrap";
import axios from 'axios';
import { Modal } from "bootstrap";
import FromularioAlta from './FromularioAlta';
/*
Componente: VisualizarDatos

Descripción: Este componete muestra el los datos de los usuarios registrados
*/

export default function VisualizarDatos() {
    const [busquedaNombre, setBusquedaNombre] = useState("");
    const [busquedaPaterno, setBusquedaPaterno] = useState("");
    const [busquedaMaterno, setBusquedaMaterno] = useState("");
    const [informacion, setinformacion] = useState([]);
    const [total, setTotal] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [detallesActuales, setDetallesActuales] = useState(false);

    const [informacionEdicion, setInformacionEdicion] = useState(false);

    const pagina_contador = useRef(0);
    const modalDetalles = useRef(false);
    const modalEdicion = useRef(false);

    const limite = 10;

    //Hacemos la Petición de Usuarios inicial y las atualizaciones con las busquedas
    useEffect(() => {
        let offset = pagina * limite;
        let url = "https://api.devdicio.net:8444/v1/sec_dev_interview/?where=(nombre%2Clike%2C%25" + busquedaNombre.trim() + "%25)~and(apellidoPaterno%2Clike%2C%25" + busquedaPaterno.trim() + "%25)~and(apellidoMaterno%2Clike%2C%25" + busquedaMaterno.trim() + "%25)&limit=" + limite + "&offset=" + offset + "";
        axios({
            url: url,
            method: "GET",
            responseType: "text",
            contentType: "application/json",
            headers: {

                "xc-token": "J38b4XQNLErVatKIh4oP1jw9e_wYWkS86Y04TMNP"
            }
        }).then((response) => {

            try {
                if (response.status == 200) {
                    let datos = JSON.parse(response.data);
                    setinformacion(datos);
                }
                else {
                    console.error('Error:', err);
                    alert("Error de Conexión");
                }
            } catch (err) {
                console.error('Error:', err);
                alert("Error de Conexión");
            }
        }).catch((response) => {
            console.error('Error:', response);
            alert("Error de Conexión");
        });
    },
        [busquedaNombre, busquedaPaterno, busquedaMaterno, pagina]);
    useEffect(() => {
        //Solicitamos el número total de entradas en el servidor
        const url = 'https://api.devdicio.net:8444/v1/sec_dev_interview/count';
        axios({
            url: url,
            method: "GET",
            responseType: "text",
            contentType: "application/json",
            headers: {
                "xc-token": "J38b4XQNLErVatKIh4oP1jw9e_wYWkS86Y04TMNP"
            }
        }).then((response) => {

            try {
                if (response.status == 200) {
                    let datos = JSON.parse(response.data);
                    setTotal(parseInt(datos.count));
                }
                else {
                    console.error('Error:', err);
                    alert("Error de Conexión");
                }
            } catch (err) {
                console.error('Error:', err);
                alert("Error de Conexión");
            }
        }).catch((response) => {
            console.error('Error:', response);
            alert("Error de Conexión");
        });
    },
        []);
    //Inicializamos Modales
    useEffect(() => {
        modalDetalles.current = new Modal(document.getElementById('DetallesModal'));
        modalEdicion.current = new Modal(document.getElementById('EdicionModal'));
    },
        []);
    //Abrimos los detalles de un usuario
    function abrirModalDetalles(info) {
        setDetallesActuales(info);
        modalDetalles.current.show();
    }
    //Abrimos modal para la edición de un usuario
    function abrirModalEdicion(info) {
        setInformacionEdicion(info);
        modalEdicion.current.show();
    }
    //Funciones de Paginación
    function siguinetePagina() {
        if (pagina_contador.current < parseInt(total / limite) - 1)
            pagina_contador.current = pagina_contador.current + 1;
        setPagina(pagina_contador.current);
    }
    function anteriorPagina() {
        if (pagina_contador.current > 0)
            pagina_contador.current = pagina_contador.current - 1;
        setPagina(pagina_contador.current);
    }
    //Manejadores de Cambios en inputs
    function manejadorBusquedaNombre(e) {
        setBusquedaNombre(e.target.value);
    }
    function manejadorBusquedaPaterno(e) {
        setBusquedaPaterno(e.target.value);
    }
    function manejadorBusquedaMaterno(e) {
        setBusquedaMaterno(e.target.value);
    }
    //Renderizado Tabla con los datos obtenidos
    let datos_tabla = [];
    for (let i = 0; i < informacion.length; i++) {
        const element = informacion[i];
        datos_tabla.push(
            <tr key={"datos_" + element.id}>
                <th scope="row">{i + 1 + (pagina * limite)}</th>
                <td>{element.nombre}</td>
                <td>{element.apellidoPaterno}</td>
                <td>{element.apellidoMaterno}</td>
                <td>{element.edad}</td>
                <td>{element.email}</td>
                <td>{element.fechaNac}</td>
                <td><a onClick={() => { abrirModalDetalles(element.datos) }} href='#'> Detalles</a></td>
                <td><a onClick={() => { abrirModalEdicion(element) }} href='#'> Editar</a></td>
            </tr>
        );
    }
    return (
        <div className='container col-9'>
            <label>Lista de Usuarios</label>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Buscar</span>
                </div>
                <input value={busquedaNombre} onChange={manejadorBusquedaNombre} type="text" className="form-control" placeholder="Nombre" />
                <input value={busquedaPaterno} onChange={manejadorBusquedaPaterno} type="text" className="form-control" placeholder="Paterno" />
                <input value={busquedaMaterno} onChange={manejadorBusquedaMaterno} type="text" className="form-control" placeholder="Materno" />
            </div>
            <div className="table-responsive">

                <table className="table table-sm">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido Paterno</th>
                            <th scope="col">Apellido Materno</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Email</th>
                            <th scope="col">Fecha Nacimiento</th>
                            <th scope="col">Detalles</th>
                            <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos_tabla}
                    </tbody>
                </table>
            </div>
            <div className='row'>
                <div className='col'>
                    <a href='#' onClick={anteriorPagina}>Anterior Página</a>
                </div>
                <div className='col'>
                    <a href='#' onClick={siguinetePagina}>Siguiente Página</a>
                </div>
            </div>
            {/*<!-- Modal Detalles -->*/}

            <div className="modal fade" id="DetallesModal" tabIndex="-1" role="dialog" aria-labelledby="DetallesModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content justify-content-center">
                        <div className="modal-header">
                            <h5 className="modal-title" id="DetallesModalLabel">Detalles</h5>
                        </div>
                        <div className="modal-body">
                            {

                                detallesActuales ?
                                    <div className="list-group">
                                        <a href="#" className="list-group-item list-group-item-action" >
                                            Calle:{detallesActuales.calle} #: {detallesActuales.numero}
                                        </a>
                                        <a href="#" className="list-group-item list-group-item-action">Colonia: {detallesActuales.colonia} CP: {detallesActuales.cp}</a>
                                        <a href="#" className="list-group-item list-group-item-action">Estado: {detallesActuales.estado}</a>
                                        <a href="#" className="list-group-item list-group-item-action">Municipio/Delegación: {detallesActuales.delegacion}</a>

                                        {
                                            detallesActuales.imagen ?//Verificando que si exista imagen
                                                detallesActuales.imagen.startsWith("data") ? //verificando si tiene el prefijo o viene sin el
                                                    <img src={detallesActuales.imagen} className="img-fluid" />
                                                    :
                                                    <img src={"data:image/png;base64," + detallesActuales.imagen} className="img-fluid" />
                                                :
                                                <label>Sin Imagen</label>
                                        }
                                    </div>
                                    : null
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- Modal Edicion -->*/}

            <div className="modal fade" id="EdicionModal" tabIndex="-1" role="dialog" aria-labelledby="EdicionModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content justify-content-center">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EdicionModalLabel">Edición</h5>
                        </div>
                        <div className="modal-body">
                            {
                                informacionEdicion ?
                                    <FromularioAlta datosIniciales={informacionEdicion} modo={"edicion"} />
                                    :
                                    null
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setInformacionEdicion(false) }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}