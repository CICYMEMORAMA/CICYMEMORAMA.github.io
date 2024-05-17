
function ejecutarAmbasFunciones(event) {
    if (validarNumeroJugadores()) {
        guardarNumeroJugadores(event);
        guardarNombresEquipos();
    }
}

function guardarNumeroJugadores(event) {
    if (validarNumeroJugadores()) {
        const numeroJugadores = document.getElementById("playerCount").value;
        const numeroTiempo = document.getElementById("add-time").value;
       
        // Almacenar número de jugadores en el almacenamiento local
        localStorage.setItem("numeroJug", numeroJugadores);
        localStorage.setItem("numTiempo", numeroTiempo);

        console.log(`Número de jugadores almacenado: ${numeroJugadores}`);
        console.log(`Número de tiempo: ${numeroTiempo}`)
        event.preventDefault(); // Evitar el envío del formulario y recarga de la página
        window.location.href = "segundo.html";
    }
}

function validarNumeroJugadores() {
    const numeroJugadores = document.getElementById("playerCount").value;
    if (numeroJugadores < 1 || numeroJugadores > 4) {
        alert("El número de equipos debe estar entre 1 y 4");
        return false; // Detener la ejecución de las otras funciones
    }

    // Validar tiempo para agregar
    const tiempoAgregar = document.getElementById("add-time").value;
    if (!tiempoAgregar) {
        alert("Por favor, llena cuanto tiempo");
        return false; // Detener la ejecución si la validación falla
    }

    if (tiempoAgregar < 5) {
        alert("Tiempo denegado, intenta mayor a 5 segundos");
        return false; // Detener la ejecución si la validación falla
    }

    if (tiempoAgregar > 1000) {
        alert("Tiempo denegado, intenta menor a 10000 segundos");
        return false; // Detener la ejecución si la validación falla
    }
     // Validar nombres de los equipos
     for (let i = 1; i <= numeroJugadores; i++) {
        const nombreEquipo = document.getElementById(`team${i}Name`).value;
        if (!nombreEquipo) {
            alert(`Por favor, llenar el nombre para el equipo ${i}.`);
            return false;
        }
    }
    return true;
}

function mostrarNombresEquipos() {
    
    const playerCount = document.getElementById("playerCount").value;
    const teamNamesContainer = document.getElementById("teamNamesContainer");
    
    // Limpiar contenido previo en teamNamesContainer
    teamNamesContainer.innerHTML = "";
    
  
       if (playerCount < 5){
        for (let i = 1; i <= playerCount; i++) {
            // Se omite la creación de la etiqueta label para cada equipo
            
            const input = document.createElement("input");
            input.type = "text";
            input.id = `team${i}Name`;
            input.name = `team${i}Name`;
            // Hacer el placeholder más descriptivo para no necesitar la etiqueta de texto
            input.placeholder = `Introduce el nombre del Equipo ${i}`; 
            input.setAttribute("maxlength", "13");  // Limitar el número de caracteres a 15
            teamNamesContainer.appendChild(input);
            
            // Añadir un salto de línea para separar los campos de nombre de equipo
            teamNamesContainer.appendChild(document.createElement("br"));
        }
    }
}

function guardarNombresEquipos() {
    
    const playerCount = document.getElementById("playerCount").value;
    const nombresEquipos = [];

    for (let i = 1; i <= playerCount; i++) {
        const nombreEquipo = document.getElementById(`team${i}Name`).value;
        nombresEquipos.push(nombreEquipo);
    }

    // Guardar los nombres de los equipos en el almacenamiento local
    localStorage.setItem("nombresEquipos", JSON.stringify(nombresEquipos));
    console.log("Nombres de los equipos guardados: ", nombresEquipos);
}
