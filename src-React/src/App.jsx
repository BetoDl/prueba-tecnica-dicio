import { useState } from 'react';
import BarraLateral from './components/BarraLateral';
import "./theme/estilos.css";

export function App() {
    const [pantalla, setPantalla] = useState('Altas');
    return (
        <div className='row container '>
            <BarraLateral cambioPantalla={setPantalla} />
            {pantalla == "Altas" ?
                null
                : pantalla == "Visualizacion" ?
                    null
                    : pantalla == "Edicion" ?
                        null
                        : null
            }
        </div>
    );
}
export default App;