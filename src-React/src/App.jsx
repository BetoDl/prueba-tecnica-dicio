import { useState } from 'react';
import "bootstrap";
import BarraLateral from './components/BarraLateral';
import "./theme/estilos.css";
import FromularioAlta from './components/FromularioAlta';
import VisualizarDatos from './components/VisualizarDatos';
export function App() {
    const [pantalla, setPantalla] = useState('Altas');
    return (
        <div className='row w-100 '>
            <BarraLateral cambioPantalla={setPantalla} />
            {pantalla == "Altas" ?
                <FromularioAlta />
                : pantalla == "Visualizacion" ?
                    <VisualizarDatos />
                    : pantalla == "Edicion" ?
                        null
                        : null
            }
        </div>
    );
}
export default App;