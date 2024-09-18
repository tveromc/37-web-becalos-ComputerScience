// clases y objetos voy a llenar mi tabla alumnos o de alumnos
class Students {
    // atributos de la clase, son propiedades del objeto, en este caso de los alumnos o estudiantes 
    constructor(nombre, apellido, grado, carrera, calificacion ){
        // en algunos lenguajes de programación
        // ; señala donde termina una linea de código
        this.nombre = nombre;
        this.apellido = apellido;
        this.grado = grado;
        this.carrera = carrera;
        this.calificacion = calificacion;
    }

    // Métodos de la clase
    pasoSemestre(){
       return this.calificacion >= 60;
    }

    greetings(){
            // vamos a poner saludos para aquellas personas que pasaron el semestre
            if (this.pasoSemestre()) {
                return `¡Hola, ${this.nombre}! Felicidades por pasar el semestre.`;
            } else {
                return `Hola, ${this.nombre}. No te desanimes, sigue esforzándote.`;
            }
    }
}



// Creación de 20 objetos de la clase Student
const alumnos = {
    alumno1: new Students('Juan', 'Pérez', '5to', 'Ingeniería', 85),
    alumno2: new Students('Ana', 'Gómez', '4to', 'Medicina', 55),
    alumno3: new Students('Luis', 'Martínez', '6to', 'Derecho', 90),
    alumno4: new Students('María', 'López', '5to', 'Arquitectura', 70),
    alumno5: new Students('Carlos', 'Sánchez', '4to', 'Economía', 40),
    alumno6: new Students('Laura', 'Fernández', '3ro', 'Psicología', 75),
    alumno7: new Students('Pedro', 'García', '2do', 'Biología', 65),
    alumno8: new Students('Sofía', 'Rodríguez', '1ro', 'Química', 95),
    alumno9: new Students('Miguel', 'Hernández', '6to', 'Física', 50),
    alumno10: new Students('Lucía', 'Ramírez', '5to', 'Matemáticas', 80), 
    alumno11: new Students('Diego', 'Torres', '4to', 'Historia', 60),
    alumno12: new Students('Valeria', 'Flores', '3ro', 'Filosofía', 45),
    alumno13: new Students('Jorge', 'Ríos', '2do', 'Literatura', 85),
    alumno14: new Students('Elena', 'Cruz', '1ro', 'Arte', 90),
    alumno15: new Students('Raúl', 'Morales', '6to', 'Ingeniería', 55),
    alumno16: new Students('Isabel', 'Ortiz', '5to', 'Medicina', 70),
    alumno17: new Students('Fernando', 'Gutiérrez', '4to', 'Derecho', 65),
    alumno18: new Students('Patricia', 'Mendoza', '3ro', 'Arquitectura', 75),
    alumno19: new Students('Ricardo', 'Silva', '2do', 'Economía', 60),
    alumno20: new Students('Gabriela', 'Castro', '1ro', 'Psicología', 85)
};
    

    // manipular del dom para poder mostrar estos datos en mi archivo html
    // más especificamente en la tabla 
    function getStudents(alumnos){
        const table = document.getElementById('studentTable');
    table.innerHTML = '';
    //Se inicia un bucle for...in para iterar sobre todas las propiedades del objeto alumnos.
    for (const key in alumnos) {
        //Esta línea verifica si la propiedad key es una propiedad directa del objeto alumnos y no heredada.
        // En este caso del objeto Prototipo
        if (alumnos.hasOwnProperty(key)) {
            //Aquí se obtiene el objeto alumno correspondiente a la clave actual key.
            const alumno = alumnos[key];
            //Se crea un nuevo elemento de fila (<tr>) para la tabla.
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.grado}</td>
                <td>${alumno.carrera}</td>
                <td>${alumno.calificacion}</td>
            `;
             // Añadir la fila a la tabla
            // Se añade la fila recién creada a la tabla.
            table.appendChild(fila);
            console.log(alumno.greetings()); // Llamada al método greetings
        }
    }
}

// implementar el buscador 
// seleccionar el elemento de mi html y le paso un evento, es una función que buscará
// a un objeto de tipo alumno, por su nombre
document.getElementById('search').addEventListener('input', function getName(){
    const filtro = this.value.toLowerCase();
    const alumnosFiltrados = {};
    for (const alumno of Object.values(alumnos)) {
        if (alumno.nombre.toLowerCase().includes(filtro)) {
            alumnosFiltrados[alumno.id] = alumno;
        }
    }
    getStudents(alumnosFiltrados);
});

getStudents(alumnos);