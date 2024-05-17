document.addEventListener('DOMContentLoaded', function() {
    cargarGanadores();
});

function cargarGanadores() {
    const tablaGanadores = document.getElementById('tablaGanadores').getElementsByTagName('tbody')[0];
    const ganadores = JSON.parse(localStorage.getItem('ganadores') || '[]');

    // Ordenar los ganadores de mayor a menor puntaje
    ganadores.sort((a, b) => b.puntaje - a.puntaje);

    // Limpiar la tabla antes de añadir nuevos datos
    tablaGanadores.innerHTML = '';

    // Insertar cada equipo y su puntaje en la tabla
    ganadores.forEach((equipo, index) => {
        let fila = tablaGanadores.insertRow();
        let celdaEquipo = fila.insertCell(0);
        let celdaPuntaje = fila.insertCell(1);

        celdaEquipo.textContent = equipo.nombre;
        celdaPuntaje.textContent = equipo.puntaje;

        // Aplicar un estilo especial a la fila del equipo con el mayor puntaje
        if (index === 0) { // El primer elemento ya que la lista está ordenada de mayor a menor
            fila.style.backgroundColor = '#EFCC00'; // Cambia el color de fondo a amarillo
        }
    });

    // Verificar si la tabla está vacía y mostrar un mensaje si lo está
    if (ganadores.length === 0) {
        let fila = tablaGanadores.insertRow();
        let celda = fila.insertCell(0);
        celda.textContent = 'No hay ganadores registrados.';
        celda.colSpan = 2;  // Hacer que la celda ocupe todo el ancho de la tabla
        celda.style.textAlign = 'center';
    }
}