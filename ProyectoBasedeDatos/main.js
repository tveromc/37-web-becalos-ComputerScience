// Clase para representar un alumno
class Alumno {
    constructor(nombre, apellidos, edad, grupo) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.grupo = grupo;
        this.materias = {
            Ingles: null,
            Español: null,
            Historia: null,
            Geografía: null,
            Matemáticas: null
        };
    }

    // Calcular promedio del alumno
    calcularPromedio() {
        const calificaciones = Object.values(this.materias).filter(cal => cal !== null);
        if (calificaciones.length === 0) return 0;
        const suma = calificaciones.reduce((a, b) => a + b, 0);
        return (suma / calificaciones.length).toFixed(2);
    }
}

// Clase para gestionar la aplicación
class GestionAlumnos {
    constructor() {
        this.alumnos = [];
        this.inicializarEventos();
    }

    // Inicializa los event listeners de los formularios
    inicializarEventos() {
        document.getElementById('formAltaAlumno').addEventListener('submit', (e) => this.registrarAlumno(e));
        document.getElementById('formInscripcionClase').addEventListener('submit', (e) => this.registrarCalificaciones(e));
        document.getElementById('formAsignarCalificacion').addEventListener('submit', (e) => this.asignarCalificacion(e));
    }

    // Registrar un nuevo alumno
    registrarAlumno(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const edad = document.getElementById('edad').value;
        const grupo = document.getElementById('grupo').value;

        const nuevoAlumno = new Alumno(nombre, apellidos, edad, grupo);
        this.alumnos.push(nuevoAlumno);

        this.actualizarSelectAlumnos();
        this.actualizarTablaAlumnos();
        event.target.reset();
    }

    // Inscribir a un alumno en varias clases con calificaciones
    registrarCalificaciones(event) {
        event.preventDefault();
        const alumnoIndex = document.getElementById('alumnoInscripcion').value;
        const alumno = this.alumnos[alumnoIndex];
        alumno.materias.Ingles = parseFloat(document.getElementById('Ingles').value);
        alumno.materias.Español = parseFloat(document.getElementById('Español').value);
        alumno.materias.Historia = parseFloat(document.getElementById('Historia').value);
        alumno.materias.Geografía = parseFloat(document.getElementById('Geografía').value);
        alumno.materias.Matemáticas = parseFloat(document.getElementById('Matemáticas').value);

        this.actualizarTablaAlumnos();
        event.target.reset();
    }

    // Asignar calificación a una materia de un alumno
    asignarCalificacion(event) {
        event.preventDefault();
        const alumnoIndex = document.getElementById('alumnoCalificacion').value;
        const materia = document.getElementById('claseCalificacion').value;
        const calificacion = parseFloat(document.getElementById('calificacion').value);

        if (this.alumnos[alumnoIndex]) {
            this.alumnos[alumnoIndex].materias[materia] = calificacion;
        }

        this.actualizarTablaAlumnos();
        event.target.reset();
    }

    // Actualizar el select de alumnos para las inscripciones y calificaciones
    actualizarSelectAlumnos() {
        const selects = ['alumnoInscripcion', 'alumnoCalificacion'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            select.innerHTML = '';
            this.alumnos.forEach((alumno, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
                select.appendChild(option);
            });
        });
    }

    // Actualizar la tabla de alumnos con sus datos
    actualizarTablaAlumnos() {
        const tabla = document.getElementById('tablaAlumnos').getElementsByTagName('tbody')[0];
        tabla.innerHTML = ''; // Limpiar la tabla

        this.alumnos.forEach(alumno => {
            const fila = tabla.insertRow();
            fila.insertCell(0).textContent = alumno.nombre;
            fila.insertCell(1).textContent = alumno.apellidos;
            fila.insertCell(2).textContent = alumno.edad;
            fila.insertCell(3).textContent = alumno.grupo;

            const materiasCalificadas = Object.entries(alumno.materias)
                .map(([materia, calificacion]) => `${materia}: ${calificacion !== null ? calificacion : 'Sin calificación'}`)
                .join(', ');

            fila.insertCell(4).textContent = materiasCalificadas;
            fila.insertCell(5).textContent = alumno.calcularPromedio();
        });
    }

    // Ordenar la tabla de alumnos por promedio
    ordenarTablaAlumnos(ascendente = true) {
        this.alumnos.sort((a, b) => {
            const promedioA = parseFloat(a.calcularPromedio());
            const promedioB = parseFloat(b.calcularPromedio());
            return ascendente ? promedioA - promedioB : promedioB - promedioA;
        });

        this.actualizarTablaAlumnos();
    }

    // Buscar un alumno por nombre, apellido o promedio
    buscarAlumno() {
        const termino = document.getElementById('buscar').value.toLowerCase();
        const resultados = this.alumnos.filter(alumno =>
            alumno.nombre.toLowerCase().includes(termino) ||
            alumno.apellidos.toLowerCase().includes(termino) ||
            alumno.calcularPromedio() === termino
        );

        const listaResultados = document.getElementById('listaAlumnosUl');
        listaResultados.innerHTML = '';
        resultados.forEach(alumno => {
            const li = document.createElement('li');
            li.textContent = `${alumno.nombre} ${alumno.apellidos} - Promedio: ${alumno.calcularPromedio()}`;
            listaResultados.appendChild(li);
        });
    }

    // Calcular y mostrar los promedios por grupo
    calcularPromediosPorGrupo() {
        const tablaPromedios = document.getElementById('tablaPromediosGrupo').getElementsByTagName('tbody')[0];
        tablaPromedios.innerHTML = ''; // Limpiar la tabla de promedios

        const grupos = {};
        this.alumnos.forEach(alumno => {
            if (!grupos[alumno.grupo]) grupos[alumno.grupo] = [];
            grupos[alumno.grupo].push(parseFloat(alumno.calcularPromedio()));
        });

        for (const grupo in grupos) {
            const promedios = grupos[grupo];
            const promedioGrupo = (promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(2);

            const fila = tablaPromedios.insertRow();
            fila.insertCell(0).textContent = grupo;
            fila.insertCell(1).textContent = promedioGrupo;
        }
    }
}

// Inicializa la aplicación
const gestionAlumnos = new GestionAlumnos();

// Funciones globales para ordenar y buscar
function ordenarTablaAlumnos(ascendente) {
    gestionAlumnos.ordenarTablaAlumnos(ascendente);
}

function buscarAlumno() {
    gestionAlumnos.buscarAlumno();
}
