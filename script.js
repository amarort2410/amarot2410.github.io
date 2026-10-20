
const precios = {
  standard: 59.99,
  deluxe: 79.99,
  ultimate: 99.99
};

const nombres = {
  standard: "Standard",
  deluxe: "Deluxe",
  ultimate: "Ultimate"
};

const euros = valor => valor.toLocaleString("es-ES", {
  style: "currency",
  currency: "EUR"
});

let carrito = [];

// MENÚ MÓVIL

const menu = document.getElementById("menu");

document.getElementById("menuBtn").addEventListener("click", () => {
  menu.classList.toggle("abierto");
});

document.querySelectorAll("nav a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("abierto");
  });
});

// MAPA INTERACTIVO

const regiones = {
  centro: {
    nombre: "NEON CORE",
    descripcion: "El corazón de la ciudad, con rascacielos, vida nocturna y grandes oportunidades."
  },
  costa: {
    nombre: "COSTA AZUL",
    descripcion: "Playas, deportes acuáticos, puertos deportivos y actividades de verano."
  },
  montana: {
    nombre: "LOS ALTOS",
    descripcion: "Montañas, rutas de exploración y lugares secretos."
  },
  puerto: {
    nombre: "PUERTO VORTEX",
    descripcion: "Una zona industrial con negocios, vehículos y misiones especiales."
  },
  desierto: {
    nombre: "DESIERTO",
    descripcion: "Carreteras interminables, carreras y misterios por descubrir."
  },
  bosque: {
    nombre: "BOSQUE NORTE",
    descripcion: "Naturaleza, senderos, campamentos y exploración."
  }
};

document.querySelectorAll("[data-region]").forEach(boton => {
  boton.addEventListener("click", () => {
    const region = regiones[boton.dataset.region];

    document.getElementById("nombreRegion").textContent =
      region.nombre;

    document.getElementById("descripcionRegion").textContent =
      region.descripcion;

    document.querySelectorAll("[data-region]").forEach(b => {
      b.classList.remove("activo");
    });

    boton.classList.add("activo");
  });
});

// DECISIONES DE LA HISTORIA

const resultados = {
  devolver: "Encuentras al propietario. Has ganado un nuevo aliado en la ciudad.",
  investigar: "Descubres una pista que podría abrir una misión secreta.",
  ignorar: "Continúas tu camino, pero nunca sabrás qué escondía la mochila."
};

document.querySelectorAll(".opcion").forEach(boton => {
  boton.addEventListener("click", () => {
    document.getElementById("resultadoHistoria").textContent =
      resultados[boton.dataset.opcion];
  });
});

// SELECCIÓN DE EDICIONES

const edicion = document.getElementById("edicion");
const cantidad = document.getElementById("cantidad");

document.querySelectorAll(".elegir").forEach(boton => {
  boton.addEventListener("click", () => {
    edicion.value = boton.dataset.edicion;

    actualizarPrecio();

    document.getElementById("reserva").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// CÁLCULO DEL PRECIO

function cantidadValida() {
  const numero = Number(cantidad.value);

  return Number.isInteger(numero) &&
    numero >= 1 &&
    numero <= 5;
}

function actualizarPrecio() {
  const total = cantidadValida()
    ? precios[edicion.value] * Number(cantidad.value)
    : 0;

  document.getElementById("precioTotal").textContent =
    euros(total);
}

edicion.addEventListener("change", actualizarPrecio);
cantidad.addEventListener("input", actualizarPrecio);

// AÑADIR AL CARRITO

const ventanaCarrito = document.getElementById("carrito");

document.getElementById("formReserva").addEventListener(
  "submit",
  evento => {
    evento.preventDefault();

    if (!cantidadValida()) {
      document.getElementById("estadoReserva").textContent =
        "Selecciona entre 1 y 5 unidades.";
      return;
    }

    const producto = {
      edicion: edicion.value,
      plataforma: document.getElementById("plataforma").value,
      formato: document.getElementById("formato").value,
      cantidad: Number(cantidad.value),
      precio: precios[edicion.value]
    };

    carrito.push(producto);

    document.getElementById("estadoReserva").textContent =
      "Producto añadido al carrito de demostración.";

    actualizarCarrito();
    ventanaCarrito.showModal();
  }
);

// ACTUALIZAR EL CARRITO

function actualizarCarrito() {
  const contenedor = document.getElementById("productosCarrito");

  contenedor.replaceChildren();

  let total = 0;
  let unidades = 0;

  carrito.forEach((producto, indice) => {
    const subtotal = producto.precio * producto.cantidad;

    total += subtotal;
    unidades += producto.cantidad;

    const caja = document.createElement("div");
    caja.className = "producto";

    const titulo = document.createElement("h3");
    titulo.textContent =
      "Vortex City — " + nombres[producto.edicion];

    const detalle = document.createElement("p");
    detalle.textContent =
      producto.plataforma + " · " +
      producto.formato + " · " +
      producto.cantidad + " unidades";

    const precio = document.createElement("strong");
    precio.textContent = euros(subtotal);

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.className = "boton secundario";

    eliminar.addEventListener("click", () => {
      carrito.splice(indice, 1);
      actualizarCarrito();
    });

    caja.append(titulo, detalle, precio, eliminar);
    contenedor.appendChild(caja);
  });

  if (carrito.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Tu carrito está vacío.";
    contenedor.appendChild(vacio);
  }

  document.getElementById("contador").textContent = unidades;
  document.getElementById("totalCarrito").textContent =
    euros(total);
}

// ABRIR Y CERRAR EL CARRITO

document.getElementById("abrirCarrito").addEventListener(
  "click",
  () => ventanaCarrito.showModal()
);

document.getElementById("cerrarCarrito").addEventListener(
  "click",
  () => ventanaCarrito.close()
);

// VACIAR CARRITO

document.getElementById("vaciarCarrito").addEventListener(
  "click",
  () => {
    carrito = [];
    actualizarCarrito();

    document.getElementById("mensajeCarrito").textContent =
      "Carrito vaciado.";
  }
);

// CONFIRMAR RESERVA SIMULADA

document.getElementById("confirmarReserva").addEventListener(
  "click",
  () => {
    const mensaje = document.getElementById("mensajeCarrito");

    if (carrito.length === 0) {
      mensaje.textContent = "Añade un producto primero.";
      return;
    }

    mensaje.textContent =
      "¡Simulación completada! No se ha realizado ninguna reserva ni cobro real.";
  }
);

// INICIAR LA PÁGINA

actualizarPrecio();
actualizarCarrito();
