document.addEventListener("DOMContentLoaded", function() {
    const numeroJugadores = localStorage.getItem("numeroJug");  // Obtener el número de jugadores de localStorage
    mostrarOcultarTablas(numeroJugadores); // Llamar a la función para mostrar u ocultar las tablas según el número de jugadores
    mostrarNombresEquipos();
});



function mostrarOcultarTablas(numeroJugadores) {
     // Ocultar todas las tablas
    
    // Mostrar u ocultar cuadros según la cantidad de jugadores seleccionada
    if (numeroJugadores === "1") {
        document.getElementById("jugador1Scoreboard").style.display = "block";
        // Ocultar cuadros adicionales si es necesario
    } else if (numeroJugadores === "2") {
        document.getElementById("jugador1Scoreboard").style.display = "block";
        document.getElementById("jugador2Scoreboard").style.display = "block";
        // Ocultar cuadros adicionales si es necesario
    } else if (numeroJugadores === "3") {
        document.getElementById("jugador1Scoreboard").style.display = "block";
        document.getElementById("jugador2Scoreboard").style.display = "block";
        document.getElementById("jugador3Scoreboard").style.display = "block";
    }else if (numeroJugadores === "4") {
        document.getElementById("jugador1Scoreboard").style.display = "block";
        document.getElementById("jugador2Scoreboard").style.display = "block";
        document.getElementById("jugador3Scoreboard").style.display = "block";
        document.getElementById("jugador4Scoreboard").style.display = "block";
    }


     // Evitar que el formulario se envíe y recargue la página
    event.preventDefault();
}

document.addEventListener("DOMContentLoaded", function() {
    const nombresEquipos = JSON.parse(localStorage.getItem("nombresEquipos"));

    if (nombresEquipos && nombresEquipos.length > 0) {
        for (let i = 1; i <= nombresEquipos.length; i++) {
            const equipoNameElement = document.getElementById(`equipo${i}Name`);
            if (equipoNameElement) {
                equipoNameElement.textContent = nombresEquipos[i - 1];
            }
        }
    }
});