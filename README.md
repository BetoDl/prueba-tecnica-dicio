# prueba-tecnica-dicio: Humberto Domínguez López
<h2>Prueba técnica</h2>
<li>Desarrollar la prueba con Reactjs e implementar Bootstrap.</li>
<li>Implementar Axios / CURL / Fetch para consumo de Web Services.</li>
<li>Subir la prueba en un repositorio de GITHUB.</li>
<h3>Descripción</h3>
<p>Esta Aplicación, tendrá 2 secciones:</p>
<li> <b>Alta de usuario con foto.-</b> Se debe construir un formulario para un registro de usuarios que tenga las
características mencionadas más adelante.</li>
<li> <b>Visualización de datos.-</b> Se debe visualizar la información de los usuarios ya registrados.</li>
<br/>
<b>1. Alta de usuario.</b> Construir un formulario que contenga los siguiente datos y validación de los mismos:
<li><b> Formulario. (5 puntos total)</b></li>
1. Nombre (Campo no vacío y solo letras)
<br/>
2. Apellido Paterno (Campo no vacío y solo letras)
<br/>
3. Apellido Materno (Campo no vacío y solo letras)
<br/>
4. Email (Formato de email)
<br/>
5. Fecha de Nacimiento (AAAA-MM-DD)
<br/>
6. Datos: <br/>
• Calle (Campo no vacío y solo letras)<br/>
• Numero (Campo no vacío y solo numeros)<br/>
• Colonia (Campo no vacío)<br/>
• Delegacion/Municipio (Campo no vacío)<br/>
• Estado (Campo no vacío y solo letras)<br/>
• CP (Campo no vacío y solo numeros)<br/>
• Fotografía.- El usuario deberá tomar una foto desde la cámara y realizar lo siguiente:<br/>
&emsp;&emsp;• Guía en sefie. Poner una guia para centrar el rostro.<br/>
&emsp;&emsp;• Envío. Para el envío al web service se debe enviar en base64 y tener formato png, además de
recortar la imagen puede ser manual (el usuario lo gestione el recorte) o automático desde el
centro de 300x300.<br/>
<b>2. Visualización datos. (3 puntos)</b><br/> 
  &emsp;&emsp;En un menu/pestaña/popup donde se pueda ver la información guardada
en una tabla con todos los usuarios incluye información pesonal como fotografía y un filtro de
búsqueda por nombre.<br/>
<b>3. OPCIONAL. Edición de datos. (1 punto).</b><br/>
 &emsp;&emsp;Una sección donde se pueda editar la información de los
usuarios registrados. 
<h2>Scripts de ejecución de proyecto</h2>
<li><b>npm run server</b> .- Ejecuta el proyecto en un servidor interno de parcel local</li>
<li><b>npm run build</b> .- Construye el proyecto para ejecutarlo desde un servidor externo (Se puede modificar la URL publica desde package.json )</li>
<b>Nota:</b> Estos Scripts deben ser ejecutados desde la carpeta "src-react" <br/>
De igual forma en la raiz del proyecto se encuentran los archivos para visualizar el proyecto desde el servidor local de su preferencia (Apache, server-live, etc.). No se podrán visualizar directamente sin un servidor local debido a la política CORS del navegador.
