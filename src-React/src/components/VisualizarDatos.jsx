import { useState, useEffect, useRef } from 'react';
import "bootstrap";
import axios from 'axios';
import { Modal } from "bootstrap";
/*
Componente: VisualizarDatos

Descripción: Este componete muestra el los datos de los usuarios registrados
*/

export default function VisualizarDatos() {
    const [busqueda, setBusqueda] = useState("");
    const [informacion, setinformacion] = useState([]);
    const [total, setTotal] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [detallesActuales, setDetallesActuales] = useState(false);

    const pagina_contador = useRef(0);
    const modalDetalles = useRef(false);
    //Hacemos la Petición de Usuarios inicial
    useEffect(() => {
        let limite = 10;
        let offset = pagina * 10;
        let url = "https://api.devdicio.net:8444/v1/sec_dev_interview/?limit=" + limite + "&offset=" + offset + "";
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
        [pagina]);
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
    },
        []);
    function abrirModalDetalles(info) {
        setDetallesActuales(info);
        modalDetalles.current.show();
    }
    //Funciones de Paginación
    function siguinetePagina() {
        if (pagina_contador.current < parseInt(total / 10))
            pagina_contador.current = pagina_contador.current + 1;
        setPagina(pagina_contador.current);
    }
    function anteriorPagina() {
        if (pagina_contador.current > 0)
            pagina_contador.current = pagina_contador.current - 1;
        setPagina(pagina_contador.current);
    }
    //Renderizado Tabla con los datos obtenidos
    let datos_tabla = [];
    for (let i = 0; i < informacion.length; i++) {
        const element = informacion[i];
        datos_tabla.push(
            <tr key={"datos_" + element.id}>
                <th scope="row">{i + 1 + (pagina * 10)}</th>
                <td>{element.nombre}</td>
                <td>{element.apellidoPaterno}</td>
                <td>{element.apellidoMaterno}</td>
                <td>{element.edad}</td>
                <td>{element.email}</td>
                <td>{element.fechaNac}</td>
                <td><a onClick={() => { abrirModalDetalles(element.datos) }} href='#'> Detalles</a></td>
            </tr>
        );
    }
    return (
        <div className='container col-9'>
            <label>Lista de Usuarios</label>
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

                                        {detallesActuales.imagen.startsWith("data") ? //verificando si tiene el prefijo o viene sin el
                                            <img src={detallesActuales.imagen} className="img-fluid" />
                                            :
                                            <img src={"data:image/png;base64," + detallesActuales.imagen} className="img-fluid" />
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
        </div>
    );
}