"use strict"; /*Para evitar errores comunes y asegurar un código más seguro y limpio.*/

/* Aplicación de consola - Módulo 3: Fundamentos de JavaScript
   Gestión de estudiantes y notas para una plataforma de aprendizaje.*/

// funciones de constantes 
const NOTA_MINIMA = 1;
const NOTA_MAXIMA = 7;
const NOTA_APROBACION = 4; // Se aprueba con promedio igual o superior
const MAX_NOTAS = 10;

// Datos iniciales (arreglo de objetos)
const estudiantes = [
  crearEstudiante("Ana", [6.5, 6.0, 7.0]),
  crearEstudiante("Luis", [3.5, 4.0, 3.0]),
  crearEstudiante("Camila", [5.0, 4.5, 6.0]),
  crearEstudiante("Diego", [4.0, 4.0, 4.0]),
  crearEstudiante("Sofía", [2.5, 3.5, 4.0]),
];

// 1. Entrada y salida

// Muestra un mensaje en la consola y en una ventana emergente
function mostrarMensaje(mensaje) {
  console.log(mensaje);
  alert(mensaje);
}

// Muestra una lista de líneas en la consola y en una sola ventana emergente
function mostrarLineas(lineas, mensajeVacio) {
  if (lineas.length === 0) {
    mostrarMensaje(mensajeVacio);
    return;
  }

  lineas.forEach((linea) => console.log(linea));
  alert(lineas.join("\n"));
}

// Pide un número al usuario hasta que ingrese uno válido.
// Devuelve null si el usuario cancela.
function pedirNumero(mensaje) {
  while (true) {
    const entrada = prompt(mensaje);
    if (entrada === null) return null;

    const texto = entrada.trim().replace(",", ".");
    const numero = Number(texto);

    if (texto !== "" && Number.isFinite(numero)) return numero;
    alert("Entrada inválida. Debes ingresar un número.");
  }
}

// Pide un texto no vacío. Devuelve null si el usuario cancela.
function pedirTexto(mensaje) {
  while (true) {
    const entrada = prompt(mensaje);
    if (entrada === null) return null;

    const texto = entrada.trim();
    if (texto !== "") return texto;
    alert("Entrada inválida. El texto no puede estar vacío.");
  }
}

// Pide una nota dentro del rango permitido. Devuelve null si cancela.
function pedirNota(mensaje) {
  while (true) {
    const nota = pedirNumero(mensaje);
    if (nota === null) return null;

    if (nota >= NOTA_MINIMA && nota <= NOTA_MAXIMA) return nota;
    alert(`La nota debe estar entre ${NOTA_MINIMA} y ${NOTA_MAXIMA}.`);
  }
}

// Pide cuántas notas se ingresarán (número entero). Devuelve null si cancela.
function pedirCantidadNotas() {
  while (true) {
    const cantidad = pedirNumero(`¿Cuántas notas tiene? (1 a ${MAX_NOTAS})`);
    if (cantidad === null) return null;

    if (Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= MAX_NOTAS) {
      return cantidad;
    }
    alert(`Ingresa un número entero entre 1 y ${MAX_NOTAS}.`);
  }
}

// 2. Operaciones matemáticas (Calculo de promedios y aprobaciones)

const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;

// Devuelve null si se intenta dividir por un valor menor que nota mínima (0). Esto evita errores de división por cero.
const dividir = (a, b) => (b === 0 ? null : a / b);

// Calcula el promedio de un arreglo de notas, redondeado a un decimal.
// Así el promedio que se muestra coincide con el que define si aprueba.
function calcularPromedio(notas) {
  if (notas.length === 0) return 0;

  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma = sumar(suma, notas[i]);
  }

  const promedio = dividir(suma, notas.length);
  return Math.round(promedio * 10) / 10;
}

// Puntos que le faltan a un promedio para llegar a la nota de aprobación
const calcularPuntosParaAprobar = (promedio) => restar(NOTA_APROBACION, promedio);

// 3. Estudiantes (arreglos y objetos)

// Crea un objeto estudiante con propiedades y métodos
function crearEstudiante(nombre, notas) {
  return {
    nombre,
    notas,
    promedio() {
      return calcularPromedio(this.notas);
    },
    estaAprobado() {
      return this.promedio() >= NOTA_APROBACION;
    },
    describir() {
      const notasTexto = this.notas.map((nota) => nota.toFixed(1)).join(", ");
      return `${this.nombre} - Notas: ${notasTexto}`;
    },
    describirPromedio() {
      return `${this.nombre} - Promedio: ${this.promedio().toFixed(1)}`;
    },
  };
}

// Recorre el arreglo con for y devuelve los estudiantes aprobados
// (aprobados = true) o reprobados (aprobados = false)
function filtrarPorAprobacion(lista, aprobados) {
  const filtrados = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].estaAprobado() === aprobados) {
      filtrados.push(lista[i]);
    }
  }
  return filtrados;
}

// 4. Acciones del programa 

function verEstudiantes() {
  const lineas = estudiantes.map((estudiante) => estudiante.describir());
  mostrarLineas(lineas, "No hay estudiantes registrados.");
}

function agregarEstudiante() {
  const nombre = pedirTexto("Nombre del estudiante:");
  if (nombre === null) return;

  const cantidad = pedirCantidadNotas();
  if (cantidad === null) return;

  const notas = [];
  for (let i = 1; i <= cantidad; i++) {
    const nota = pedirNota(`Nota ${i} de ${nombre} (${NOTA_MINIMA} a ${NOTA_MAXIMA}):`);
    if (nota === null) return; // Si cancela, no se guarda el estudiante
    notas.push(nota);
  }

  estudiantes.push(crearEstudiante(nombre, notas));
  mostrarMensaje(`Estudiante ${nombre} agregado correctamente.`);
}

function verPromedios() {
  const lineas = estudiantes.map((estudiante) => estudiante.describirPromedio());
  mostrarLineas(lineas, "No hay estudiantes registrados.");
}

function verAprobados() {
  const aprobados = filtrarPorAprobacion(estudiantes, true);
  const lineas = aprobados.map((estudiante) => estudiante.describirPromedio());
  mostrarLineas(lineas, "Ningún estudiante ha aprobado.");
}

function verReprobados() {
  const reprobados = filtrarPorAprobacion(estudiantes, false);
  const lineas = reprobados.map((estudiante) => {
    const faltan = calcularPuntosParaAprobar(estudiante.promedio());
    return `${estudiante.describirPromedio()} (le faltan ${faltan.toFixed(1)} para aprobar)`;
  });
  mostrarLineas(lineas, "Ningún estudiante ha reprobado.");
}

// 5. Menú principal

function mostrarMenu() {
  return prompt(
    "MENÚ PRINCIPAL\n" +
      "1. Ver estudiantes\n" +
      "2. Agregar estudiante\n" +
      "3. Ver promedios\n" +
      "4. Ver aprobados\n" +
      "5. Ver reprobados\n" +
      "0. Salir"
  );
}

function iniciarAplicacion() {
  let continuar = true;

  while (continuar) {
    const respuesta = mostrarMenu();

    // Si el usuario cancela, se termina el programa
    if (respuesta === null) break;

    switch (respuesta.trim()) {
      case "1":
        verEstudiantes();
        break;
      case "2":
        agregarEstudiante();
        break;
      case "3":
        verPromedios();
        break;
      case "4":
        verAprobados();
        break;
      case "5":
        verReprobados();
        break;
      case "0":
        continuar = false;
        break;
      default:
        alert("Opción no válida. Intenta nuevamente.");
    }
  }

  console.log("Programa finalizado. ¡Hasta pronto!");
}

// La aplicación se inicia desde los botones de index.html, no obstante se puede ejecutar directamente en la consola del navegador para pruebas utilizando iniciarAplicacion(). Esto permite probar la funcionalidad sin necesidad de la interfaz gráfica.
