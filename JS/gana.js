document.addEventListener('DOMContentLoaded', function() {
    mostrarGanador();
});

function mostrarGanador() {
    const ganadores = JSON.parse(localStorage.getItem('ganadores') || '[]');

    if (ganadores.length > 0) {
        // Ordenar los ganadores de mayor a menor puntaje
        ganadores.sort((a, b) => b.puntaje - a.puntaje);

        // Encontrar el puntaje más alto
        const puntajeMaximo = ganadores[0].puntaje;
        // Filtrar para obtener todos los ganadores con el puntaje más alto
        const ganadoresMaximos = ganadores.filter(ganador => ganador.puntaje === puntajeMaximo);

        if (ganadoresMaximos.length > 1) {
            // Construir un mensaje para múltiples ganadores
            let mensaje = '¡Felicidades ';
            ganadoresMaximos.forEach((ganador, index) => {
                if (index === ganadoresMaximos.length - 1) {
                    mensaje += `y ${ganador.nombre}, Ustedes han ganado con ${ganador.puntaje} puntos!`;
                } else if (index === ganadoresMaximos.length - 2) {
                    mensaje += `${ganador.nombre} `;
                } else {
                    mensaje += `${ganador.nombre}, `;
                }
            });
            document.getElementById('mensajeGanador').textContent = mensaje;
        } else {
            // Mostrar el nombre del ganador con el puntaje más alto
            document.getElementById('mensajeGanador').textContent = `¡Felicidades ${ganadoresMaximos[0].nombre}, has ganado con ${ganadoresMaximos[0].puntaje} puntos!`;
        }
    } else {
        // Mensaje si no hay ganadores registrados
        document.getElementById('mensajeGanador').textContent = 'No hay ganadores registrados.';
    }
}