// Clase Alumno
class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones =  [];
        this.grupo = '';
    }

    inscribirMaterias(materia, calificaciones) {
            this.materias.push(materia);
            this.calificaciones .push(calificaciones);
        }
    
    obtenerPromedio() {
        
        if (this.calificaciones.length === 0) return 0;
        const total= this.calificaciones.reduce((acc,curr) => acc + curr, 0);
        return (total / this.calificaciones.length).toFixed(2);
    }
}

class GestionAlumnos {
    constructor() {
        this.alumnos = [];
        this.grupos = [];
        this.cargarDatos();
        this.inicializarEventListeners();
        this.actualizarListaAlumnos();
    }
    cargarDatos() {
        
    }

    guardarDatos() {
        
    }
       agregarAlumno(nombre, apellidos, edad) {
        const alumno = new Alumno(nombre, apellidos, parseInt(edad));
        this.alumnos.push(alumno);
        this.guardarDatos();
        this.actualizarListaAlumnos();
    }

    inscribirAlumnoAClase(alumnoIndex, nombreClase) {
        if (this.alumnos[alumnoIndex]) {
            this.alumnos[alumnoIndex].inscribirMaterias(nombreClase); 
            this.guardarDatos();
            this.actualizarListaAlumnos();
        }
    }

    asignarCalificacion(alumnoIndex, materia, calificacion) {
        if (this.alumnos[alumnoIndex]) {
            this.alumnos[alumnoIndex].asignarCalificacion(materia, parseFloat(calificacion));
            this.guardarDatos();
            this.actualizarListaAlumnos();
        }
    }
    
    crearGrupo(nombreGrupo) {
        if (!this.grupos.includes(nombreGrupo)) {
            this.grupos.push(nombreGrupo);
            this.guardarDatos();
            this.actualizarSelectGrupos(); 
        }
    }

    asignarAlumnoAGrupo(alumnoIndex, grupo) {
        if (this.grupos.includes(grupo) && this.alumnos[alumnoIndex]) {
            this.alumnos[alumnoIndex].grupo = grupo;
            this.guardarDatos();
            this.actualizarListaAlumnos();
        }
    }

    buscarAlumnos(termino) {
        return this.alumnos.filter(alumnos => 
            a.nombre.toLowerCase().includes(termino.toLowerCase()) || 
            a.apellidos.toLowerCase().includes(termino.toLowerCase())
        );
    }

    obtenerPromedioGrupo(grupo) {
        const alumnosGrupo = this.alumnos.filter(a => a.grupo === grupo);
        if (alumnosGrupo.length === 0) return 0;
        const promedio = alumnosGrupo.reduce((sum, a) => sum + parseFloat(a.obtenerPromedio()), 0) / alumnosGrupo.length;
        return promedio.toFixed(2);
    }

    ordenarPorCalificacion(ascendente = true) {
        return this.alumnos.slice().sort((a, b) => {
            const promedioA = parseFloat(a.obtenerPromedio());
            const promedioB = parseFloat(b.obtenerPromedio());
            return ascendente ? promedioA - promedioB : promedioB - promedioA;
        });
    }

    ordenarPorEdad(ascendente = true) {
        return this.alumnos.sort((a, b) => ascendente ? a.edad - b.edad : b.edad - a.edad);
    }

    // Inicializa los eventos
    inicializarEventListeners() {
        const formAltaAlumno = document.getElementById('formAltaAlumno');
        formAltaAlumno.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto del formulario
            const nombre = document.getElementById('nombre').value;
            const apellidos = document.getElementById('apellidos').value;
            const edad = document.getElementById('edad').value;

            this.agregarAlumno(nombre, apellidos, edad);

            // Reinicia los campos del formulario
            formAltaAlumno.reset();
        });
    }

       actualizarSelectGrupos() {
        const select = document.getElementById('grupoAsignar');
        select.innerHTML = '';
        this.grupos.forEach(grupo => {
            const option = document.createElement('option');
            option.value = grupo;
            option.textContent = grupo;
            select.appendChild(option);
        });
    }

    actualizarListaAlumnos() {
        const listaAlumnos = document.getElementById('listaAlumnosUl');
        listaAlumnos.innerHTML = '';
        this.alumnos.forEach(alumno => {
            const li = document.createElement('li');
            li.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad} - Grupo: ${alumno.grupo || 'No asignado'} - Promedio: ${alumno.obtenerPromedio()}`;
            listaAlumnos.appendChild(li);
        });
        this.actualizarSelectAlumnos();
    }

    actualizarSelectAlumnos() {
        const selects = ['alumnoInscripcion', 'alumnoCalificacion', 'alumnoGrupo'];
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
}

// Inicializa la gestión de alumnos
const gestionAlumnos = new GestionAlumnos();
