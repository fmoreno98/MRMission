Explicación del proyecto y errores que no he podido encontrar solución:

    Al hacer npm run dev y entrar en la aplicacion se carga un mapa con obstaculos y un "rover"
    que se mueve con el comando que se introduce en el input.
    El comando tiene que estar escrito en mayúsuculas y sin espacios.
    Para que avance hacia arriba pondrá una letra F.
    Para que avance hacia abajo pondrá una letra B
    Para que avance hacia la izquierda pondrá una letra L
    Para que avance hacia la derecha pondrá una letra R
    Al hacer click en el boton "Start" se inicia el movimiento del rover.
    El rover se mueve en el mapa y si se encunetra con algún obstaculo no lo traspasa.
    Al hacer click en el boton "Center" se centra al rover en el mapa.
    Debajo de los botones se muestra la casilla donde está situada la esquina suoerior izquierda y la inferior derecha del mapa en el eje x y.

    Problemas:

    -No he conseguido que el rover se detenga cuando encuentra un obstaculo. El problema es que cuando lo detecta rellena el 
    state de stop en el setStop, pero al ser asyncrono no lo lee actualizado hasta que se termina la funcion y se vuelve a ejecutar.
    -No he sabido implementar el Norte, Sur, Este y Oeste. Para intentar solucionar este problema he decidido añadir la direccion hacia abajo
    -No he puesto estilos a la aplicacion.
    -He decidido hacer el proyecto con react y javascript porque me pareció más sencillo que con typescript y vue.js. Jamás había usado vue y me pareció más sencillo de usar.

    Herramientas utilizadas:

    -React
    -Javascript
    -HTML
    -CSS

    Herramientas web  utilizadas para resolver problemas:
    -https://chatgpt.com
    -https://stackoverflow.com/
    -https://www.w3schools.com/
