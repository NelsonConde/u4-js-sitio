// 3. CONSTANTES
const APP_NOMBRE = "Reloj";
const APP_VERSION = 1.1;
const ANIO = 2025;

// 4. VARIABLES CON let
let ruta = window.location.pathname;
let contadorVisitas = 0;
let usuarioActivo, esMovil;

// 5. FUNCIONES sumar() Y multiplicar()
function sumar() {
    const resultado = document.getElementById("resultado");
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    resultado.textContent = !isNaN(num1) && !isNaN(num2)
        ? num1 + num2
        : (!isNaN(num1) ? num1 : (!isNaN(num2) ? num2 : 0));
}

function multiplicar() {
    const resultado = document.getElementById("resultado");
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    resultado.textContent = !isNaN(num1) && !isNaN(num2) ? num1 * num2 : 0;
}

// 6. MENSAJE DE BIENVENIDA EN #salida
function mostrarBienvenida() {
    const salida = document.getElementById("salida");
    if (salida) {
        salida.innerHTML = `¡Hola! Gracias por visitar Mi App ${APP_NOMBRE} en su versión ${APP_VERSION} de ${ANIO}.`;
    }
}

// 7. BOTÓN CONTADOR DE VISITAS (#totalVisitas) CON LOCALSTORAGE
function cargarVisitas() {
    const guardadas = localStorage.getItem("miApp_visitas");
    contadorVisitas = guardadas ? parseInt(guardadas) : 0;
    document.getElementById("totalVisitas").textContent = contadorVisitas;
}

function actualizarVistas() {
    contadorVisitas++;
    localStorage.setItem("miApp_visitas", contadorVisitas);
    document.getElementById("totalVisitas").textContent = contadorVisitas;
}

// 8. FUNCIÓN mostrarHora() EN HEADER
const HORA_RELOJ = document.getElementById("horaReloj");

function mostrarHora() {
    const hora = new Date();
    const hh = hora.getHours().toString().padStart(2, "0");
    const mm = hora.getMinutes().toString().padStart(2, "0");
    const ss = hora.getSeconds().toString().padStart(2, "0");
    HORA_RELOJ.textContent = `${hh}:${mm}:${ss}`;
}

// 9. NAVEGACIÓN ACTIVA CON data-page Y CLASE activo
function activarMenu() {
    const archivo = ruta.split("/").pop();
    const paginaActual = archivo.replace(".html", "");
    document.querySelectorAll("nav ul li a").forEach((enlace) => {
        enlace.classList.toggle("activo", enlace.dataset.page === paginaActual);
    });
}

// 10. DOM BÁSICO: CAMBIO DE COLOR
const botonesColor = document.querySelectorAll(".color-btn");
const colorOriginal = getComputedStyle(document.body).backgroundColor;

botonesColor.forEach((boton) => {
    boton.addEventListener("click", () => {
        document.body.style.backgroundColor =
            boton.dataset.color === "reset" ? colorOriginal : boton.dataset.color;
    });
});

// 11. DOM AVANZADO: LISTA DE NOTAS
const inputNota = document.getElementById("inputNota");
const btnAgregarNota = document.getElementById("btnAgregarNota");
const listaNotas = document.getElementById("listaNotas");
const errorNota = document.getElementById("errorNota");

if (btnAgregarNota) {
    btnAgregarNota.addEventListener("click", () => {
        const texto = inputNota.value.trim();
        if (texto.length < 3) {
            errorNota.textContent = "La nota debe tener al menos 3 caracteres.";
            return;
        }
        errorNota.textContent = "";
        const li = document.createElement("li");
        li.textContent = texto;
        listaNotas.appendChild(li);
        inputNota.value = "";
    });
}

// 12-13. VALIDACIÓN FORMULARIO CONTACTO + MENSAJE ÉXITO
const formContacto = document.getElementById("formContacto");
const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorMensaje = document.getElementById("errorMensaje");
const mensajeExito = document.getElementById("mensajeExito");

if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        // Nombre
        if (formContacto.nombre.value.trim().length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
            valido = false;
        } else errorNombre.textContent = "";

        // Email
        const emailVal = formContacto.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            errorEmail.textContent = "Ingrese un email válido.";
            valido = false;
        } else errorEmail.textContent = "";

        // Mensaje
        if (formContacto.mensaje.value.trim().length < 5) {
            errorMensaje.textContent = "El mensaje debe tener al menos 5 caracteres.";
            valido = false;
        } else errorMensaje.textContent = "";

        mensajeExito.textContent = valido ? "✅ ¡Formulario enviado correctamente!" : "";
        if (valido) formContacto.reset();
    });
}

// 14. BUSCADOR EN SERVICIOS
const buscador = document.getElementById("buscador");
const listaServicios = document.getElementById("listaServicios");

if (buscador) {
    buscador.addEventListener("input", () => {
        const filtro = buscador.value.toLowerCase();
        listaServicios.querySelectorAll("li").forEach((item) => {
            item.style.display = item.textContent.toLowerCase().includes(filtro) ? "" : "none";
        });
    });
}

// 15. FUNCIÓN evaluarNumero(n)
function evaluarNumero(n) {
    if (n > 0) return "El número es positivo";
    if (n < 0) return "El número es negativo";
    return "El número es cero";
}

// 16. FUNCIÓN obtenerDia() DEL SISTEMA
function obtenerDia() {
    const numero = new Date().getDay(); // 0=Domingo ... 6=Sábado
    switch (numero) {
        case 0: return "Domingo";
        case 1: return "Lunes";
        case 2: return "Martes";
        case 3: return "Miércoles";
        case 4: return "Jueves";
        case 5: return "Viernes";
        case 6: return "Sábado";
        default: return "Error al obtener el día";
    }
}

// 17. RENDERIZAR PERFIL EN acerca.html
const perfilDiv = document.getElementById("perfil");
if (perfilDiv) {
    const perfil = {
        nombre: "Nelson Conde",
        profesion: "Desarrollador Web",
        ciudad: "Cúcuta",
        intereses: ["JavaScript", "Bases de Datos", "UI/UX"],
    };

    perfilDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${perfil.nombre}</p>
        <p><strong>Profesión:</strong> ${perfil.profesion}</p>
        <p><strong>Ciudad:</strong> ${perfil.ciudad}</p>
        <p><strong>Intereses:</strong> ${perfil.intereses.join(", ")}</p>
    `;
}

// 19. CLASE Util CON formatearMoneda()
class Util {
    static formatearMoneda(valor) {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
        }).format(valor);
    }
}

// EVENTOS DE PRUEBA PARA PUNTOS 15, 16 Y 19
const btnEvaluarNumero = document.getElementById("btnEvaluarNumero");
const btnObtenerDia = document.getElementById("btnObtenerDia");
const btnFormatearMoneda = document.getElementById("btnFormatearMoneda");

if (btnEvaluarNumero) {
    btnEvaluarNumero.addEventListener("click", () => {
        document.getElementById("resultadoNumero").textContent =
            evaluarNumero(parseFloat(document.getElementById("numeroEvaluar").value));
    });
}

if (btnObtenerDia) {
    btnObtenerDia.addEventListener("click", () => {
        document.getElementById("resultadoDia").textContent = obtenerDia();
    });
}

if (btnFormatearMoneda) {
    btnFormatearMoneda.addEventListener("click", () => {
        const valor = parseFloat(document.getElementById("valorMoneda").value);
        document.getElementById("resultadoMoneda").textContent =
            isNaN(valor) ? "Ingrese un valor válido" : Util.formatearMoneda(valor);
    });
}

// INICIALIZACIÓN DE PÁGINA
// Activar menú en todas las páginas
activarMenu();

// Si existe el elemento de reloj, actualizar cada segundo
if (HORA_RELOJ) {
    mostrarHora(); // para que muestre la hora inmediatamente
    setInterval(mostrarHora, 1000);
}

// Solo para index.html: visitas y bienvenida
if (ruta.includes("index.html")) {
    usuarioActivo = "Invitado";
    esMovil = /Mobi|Android/i.test(navigator.userAgent);

    mostrarBienvenida();
    cargarVisitas();

    if (BTN_VISITAS) BTN_VISITAS.addEventListener("click", actualizarVistas);
    console.log(`Detectado: ${esMovil ? "Móvil" : "Escritorio"}`);
}