
const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");
const botonSubir = document.querySelector("#subir");
const formulario = document.querySelector("#form-contacto");
const respuesta = document.querySelector("#respuesta");

// Menú para celulares
menuBtn.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  menuBtn.setAttribute("aria-expanded", String(abierto));
  menuBtn.textContent = abierto ? "✕" : "☰";
});

// Cerrar menú al seleccionar una sección
menu.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("abierto");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

// Botón para regresar al inicio
window.addEventListener("scroll", () => {
  botonSubir.classList.toggle("visible", window.scrollY > 400);
});

botonSubir.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Año automático
document.querySelector("#anio").textContent = new Date().getFullYear();

// Pétalos animados
const movimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!movimientoReducido) {
  function crearPetalo() {
    const petalo = document.createElement("span");
    petalo.className = "petalo";
    petalo.textContent = Math.random() > 0.5 ? "✿" : "❀";
    petalo.style.left = Math.random() * 100 + "vw";
    petalo.style.fontSize = (12 + Math.random() * 14) + "px";
    petalo.style.animationDuration = (7 + Math.random() * 7) + "s";

    document.body.appendChild(petalo);

    petalo.addEventListener("animationend", () => petalo.remove());
  }

  setInterval(crearPetalo, 900);
}

// Formulario: preparar un correo para que el usuario lo envíe
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const nombre = datos.get("nombre").trim();
  const correo = datos.get("correo").trim();
  const mensaje = datos.get("mensaje").trim();

  const asunto = encodeURIComponent("Consulta desde la web Sakura");
  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
  );

  respuesta.textContent =
    "Se abrirá tu aplicación de correo para que puedas revisar y enviar el mensaje.";

  window.location.href =
    `mailto:?subject=${asunto}&body=${cuerpo}`;
});