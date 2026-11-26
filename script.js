
/* =========================================
   VORTEX GAMES - JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       FUNCIONES GENERALES
    ===================================== */

    const seleccionar = (selector) => document.querySelector(selector);
    const seleccionarTodos = (selector) => document.querySelectorAll(selector);

    const dinero = (cantidad) => {
        return cantidad.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR"
        });
    };

    /* =====================================
       MENÚ RESPONSIVE
    ===================================== */

    const menuBtn = seleccionar("#menuBtn");
    const menu = seleccionar("#menu");

    if (menuBtn && menu) {
        menuBtn.addEventListener("click", () => {
            menu.classList.toggle("abierto");
        });

        seleccionarTodos("#menu a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                menu.classList.remove("abierto");
            });
        });
    }

    /* =====================================
       BOTÓN VOLVER ARRIBA
    ===================================== */

    const volverArriba = seleccionar("#volverArriba");

    if (volverArriba) {
        window.addEventListener("scroll", () => {
            volverArriba.classList.toggle("visible", window.scrollY > 400);
        });

        volverArriba.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =====================================
       MAPA INTERACTIVO
    ===================================== */

    const regiones = {
        neon: {
            nombre: "NEON CORE",
            texto: "El centro de Vortex City. Una zona llena de rascacielos, luces, grandes avenidas, comercios y una intensa vida urbana."
        },
        costa: {
            nombre: "COSTA AZUL",
            texto: "Una región costera con playas, paseos marítimos, restaurantes y actividades junto al mar."
        },
        altos: {
            nombre: "LOS ALTOS",
            texto: "Una zona montañosa con carreteras curvas, miradores, pequeños pueblos y rutas de exploración."
        },
        puerto: {
            nombre: "PUERTO GRIS",
            texto: "Una zona industrial y comercial con almacenes, barcos, contenedores y grandes instalaciones."
        },
        desierto: {
            nombre: "TIERRAS ROJAS",
            texto: "Un territorio árido con caminos de tierra, paisajes rocosos y lugares escondidos."
        },
        bosque: {
            nombre: "BOSQUE LÚMINA",
            texto: "Una región natural con bosques, lagos, caminos y rincones alejados de la ciudad."
        }
    };

    const regionNombre = seleccionar("#regionNombre");
    const regionTexto = seleccionar("#regionTexto");

    seleccionarTodos("[data-region]").forEach(boton => {
        boton.addEventListener("click", () => {
            const region = regiones[boton.dataset.region];

            if (!region) return;

            regionNombre.textContent = region.nombre;
            regionTexto.textContent = region.texto;

            seleccionarTodos("[data-region]").forEach(elemento => {
                elemento.classList.remove("activo");
            });

            boton.classList.add("activo");
        });
    });

    /* =====================================
       DECISIONES DE LA HISTORIA
    ===================================== */

    const decisiones = {
        devolver: "Has decidido buscar al dueño de la mochila. Tu personaje demuestra responsabilidad y gana la confianza de otros ciudadanos.",
        investigar: "Has decidido investigar la información. Descubres una pista que podría llevarte a una nueva aventura.",
        ignorar: "Has decidido continuar tu camino. A veces, no intervenir también forma parte de una historia."
    };

    seleccionarTodos(".decision").forEach(boton => {
        boton.addEventListener("click", () => {
            const resultado = decisiones[boton.dataset.decision];

            seleccionar("#resultadoHistoria").textContent = resultado;
        });
    });

    /* =====================================
       GARAJE Y VEHÍCULOS
    ===================================== */

    const coches = {
        phantom: {
            nombre: "PHANTOM GT",
            tipo: "Deportivo de alto rendimiento",
            icono: "🏎️",
            velocidad: 95,
            manejo: 82,
            resistencia: 60
        },

        titan: {
            nombre: "TITAN X",
            tipo: "Todoterreno de gran resistencia",
            icono: "🚙",
            velocidad: 70,
            manejo: 75,
            resistencia: 95
        },

        volt: {
            nombre: "VOLT R",
            tipo: "Deportivo eléctrico futurista",
            icono: "⚡",
            velocidad: 90,
            manejo: 95,
            resistencia: 65
        },

        retro: {
            nombre: "RETRO 88",
            tipo: "Clásico urbano personalizado",
            icono: "🚗",
            velocidad: 65,
            manejo: 70,
            resistencia: 75
        }
    };

    const cocheIcono = seleccionar("#cocheIcono");
    const cocheNombre = seleccionar("#cocheNombre");
    const cocheTipo = seleccionar("#cocheTipo");

    function actualizarCoche(clave) {
        const coche = coches[clave];

        if (!coche) return;

        cocheIcono.textContent = coche.icono;
        cocheNombre.textContent = coche.nombre;
        cocheTipo.textContent = coche.tipo;

        seleccionar("#velocidadValor").textContent = coche.velocidad;
        seleccionar("#manejoValor").textContent = coche.manejo;
        seleccionar("#resistenciaValor").textContent = coche.resistencia;

        seleccionar("#velocidadBarra").style.width = coche.velocidad + "%";
        seleccionar("#manejoBarra").style.width = coche.manejo + "%";
        seleccionar("#resistenciaBarra").style.width = coche.resistencia + "%";

        seleccionarTodos(".opcion-coche[data-coche]").forEach(boton => {
            boton.classList.toggle("activo", boton.dataset.coche === clave);
        });

        seleccionar("#cocheMensaje").textContent =
            coche.nombre + " seleccionado. ¡Personalízalo a tu gusto!";
    }

    seleccionarTodos("[data-coche]").forEach(boton => {
        boton.addEventListener("click", () => {
            actualizarCoche(boton.dataset.coche);
        });
    });

    seleccionarTodos("[data-color]").forEach(boton => {
        boton.addEventListener("click", () => {
            const color = boton.dataset.color;

            seleccionar("#cochePintura").style.background = color;
            seleccionar("#cochePintura").style.boxShadow =
                "0 0 20px " + color;

            seleccionar("#cocheMensaje").textContent =
                "Nuevo color aplicado al vehículo.";
        });
    });

    /* =====================================
       CREADOR DE PERSONAJE
    ===================================== */

    const formularioPersonaje = seleccionar("#formPersonaje");

    if (formularioPersonaje) {
        formularioPersonaje.addEventListener("submit", evento => {
            evento.preventDefault();

            const alias = seleccionar("#alias").value.trim();
            const profesion = seleccionar("#profesion").value;
            const estilo = seleccionar("#estilo").value;

            if (!alias) {
                seleccionar("#alias").focus();
                alert("Escribe un nombre para tu personaje.");
                return;
            }

            seleccionar("#carnetNombre").textContent =
                alias.toUpperCase();

            seleccionar("#carnetProfesion").textContent =
                profesion.toUpperCase();

            seleccionar("#carnetEstilo").textContent =
                "ESTILO: " + estilo.toUpperCase();
        });
    }

    /* =====================================
       SISTEMA DE REPUTACIÓN
    ===================================== */

    let reputacion = 50;

    const reputacionNumero = seleccionar("#reputacionNumero");
    const reputacionBarra = seleccionar("#reputacionBarra");
    const reputacionEstado = seleccionar("#reputacionEstado");
    const mensajeReputacion = seleccionar("#mensajeReputacion");

    function actualizarReputacion() {
        reputacion = Math.max(0, Math.min(100, reputacion));

        reputacionNumero.textContent = reputacion;
        reputacionBarra.style.width = reputacion + "%";

        if (reputacion >= 80) {
            reputacionEstado.textContent = "LEYENDA DE LA CIUDAD";
        } else if (reputacion >= 60) {
            reputacionEstado.textContent = "CIUDADANO RESPETADO";
        } else if (reputacion >= 40) {
            reputacionEstado.textContent = "CIUDADANO DESCONOCIDO";
        } else if (reputacion >= 20) {
            reputacionEstado.textContent = "REPUTACIÓN BAJA";
        } else {
            reputacionEstado.textContent = "REPUTACIÓN MUY BAJA";
        }
    }

    seleccionarTodos(".accion").forEach(boton => {
        boton.addEventListener("click", () => {
            const puntos = Number(boton.dataset.puntos);

            reputacion += puntos;
            actualizarReputacion();

            mensajeReputacion.textContent =
                puntos > 0
                    ? "¡Buena acción! Has ganado " + puntos + " puntos."
                    : "Tu reputación ha bajado " + Math.abs(puntos) + " puntos.";
        });
    });

    seleccionar("#reiniciarReputacion").addEventListener("click", () => {
        reputacion = 50;
        actualizarReputacion();

        mensajeReputacion.textContent =
            "Tu reputación ha vuelto a su valor inicial.";
    });

    /* =====================================
       VORTEX PHONE
    ===================================== */

    function actualizarHora() {
        const ahora = new Date();

        seleccionar("#horaMovil").textContent =
            ahora.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit"
            });
    }

    actualizarHora();
    setInterval(actualizarHora, 1000);

    const aplicaciones = {
        misiones: {
            titulo: "🎯 MISIONES",
            texto: "Consulta tus objetivos, descubre nuevos desafíos y sigue el progreso de tu aventura."
        },
        mensajes: {
            titulo: "💬 MENSAJES",
            texto: "Tus contactos pueden enviarte información, novedades y propuestas dentro de la ciudad."
        },
        banco: {
            titulo: "💳 V-BANK",
            texto: "Un sistema bancario ficticio para consultar el dinero y los movimientos de tu personaje."
        },
        mapa: {
            titulo: "🗺️ MAPA",
            texto: "Consulta las seis regiones de Vortex City y descubre los lugares que puedes visitar."
        }
    };

    seleccionarTodos("[data-app]").forEach(boton => {
        boton.addEventListener("click", () => {
            const aplicacion = aplicaciones[boton.dataset.app];

            if (!aplicacion) return;

            seleccionar("#appTitulo").textContent = aplicacion.titulo;
            seleccionar("#appTexto").textContent = aplicacion.texto;
        });
    });

    /* =====================================
       GALERÍA Y VISOR DE IMÁGENES
    ===================================== */

    const visor = seleccionar("#visor");
    const imagenVisor = seleccionar("#imagenVisor");
    const tituloVisor = seleccionar("#tituloVisor");

    seleccionarTodos(".foto").forEach(boton => {
        boton.addEventListener("click", () => {
            const imagen = boton.querySelector("img");

            imagenVisor.src = imagen.src;
            imagenVisor.alt = imagen.alt;
            tituloVisor.textContent = boton.dataset.titulo;

            visor.showModal();
        });
    });

    seleccionar("#cerrarVisor").addEventListener("click", () => {
        visor.close();
    });

    visor.addEventListener("click", evento => {
        if (evento.target === visor) {
            visor.close();
        }
    });

    /* =====================================
       DESAFÍOS Y EXPERIENCIA
    ===================================== */

    const retos = seleccionarTodos(".reto-check");
    const barraRetos = seleccionar("#barraRetos");
    const textoRetos = seleccionar("#textoRetos");

    const xpTexto = seleccionar("#xpTexto");
    const barraXP = seleccionar("#barraXP");
    const nivelNumero = seleccionar("#nivelNumero");
    const nivelNombre = seleccionar("#nivelNombre");
    const nivelMensaje = seleccionar("#nivelMensaje");

    function actualizarProgreso() {
        const completados = [...retos].filter(reto => reto.checked).length;
        const total = retos.length;
        const porcentaje = total === 0 ? 0 : (completados / total) * 100;

        barraRetos.style.width = porcentaje + "%";
        textoRetos.textContent =
            completados + " de " + total + " desafíos completados";

        const experiencia = completados * 50;
        const nivel = Math.floor(experiencia / 100) + 1;
        const experienciaNivel = experiencia % 100;

        nivelNumero.textContent = "NIVEL " + nivel;
        xpTexto.textContent = experienciaNivel + " / 100 XP";
        barraXP.style.width = experienciaNivel + "%";

        if (nivel >= 4) {
            nivelNombre.textContent = "LEYENDA VORTEX";
        } else if (nivel === 3) {
            nivelNombre.textContent = "EXPLORADOR EXPERTO";
        } else if (nivel === 2) {
            nivelNombre.textContent = "AVENTURERO";
        } else {
            nivelNombre.textContent = "NOVATO VORTEX";
        }

        nivelMensaje.textContent =
            "Has conseguido " + experiencia + " puntos de experiencia.";

        actualizarTrofeos(completados);
    }

    function actualizarTrofeos(completados) {
        const trofeos = [
            {
                id: "#trofeoPrimero",
                requisito: 1
            },
            {
                id: "#trofeoExplorador",
                requisito: 3
            },
            {
                id: "#trofeoLeyenda",
                requisito: 6
            }
        ];

        trofeos.forEach(trofeo => {
            const elemento = seleccionar(trofeo.id);
            const desbloqueado = completados >= trofeo.requisito;

            elemento.classList.toggle("desbloqueado", desbloqueado);

            elemento.querySelector(".trofeo-icono").textContent =
                desbloqueado ? "🏆" : "🔒";

            elemento.querySelector(".trofeo-estado").textContent =
                desbloqueado ? "DESBLOQUEADO" : "BLOQUEADO";
        });
    }

    retos.forEach(reto => {
        reto.addEventListener("change", actualizarProgreso);
    });

    seleccionar("#reiniciarRetos").addEventListener("click", () => {
        retos.forEach(reto => {
            reto.checked = false;
        });

        actualizarProgreso();
    });

    actualizarProgreso();

    /* =====================================
       CONFIGURADOR DE AVENTURA
    ===================================== */

    seleccionar("#descubrirAventura").addEventListener("click", () => {
        const tipo = seleccionar("#tipoJugador").value;
        const zona = seleccionar("#zonaJugador").value;

        const estilos = {
            explorador: "Tu perfil es el de un explorador. Te encanta descubrir lugares y secretos.",
            piloto: "Tu perfil es el de un piloto. Las carreras y los vehículos son lo tuyo.",
            empresario: "Tu perfil es el de un empresario. Te gusta crear negocios y conseguir objetivos.",
            aventurero: "Tu perfil es el de un aventurero. Prefieres vivir historias y descubrir nuevas experiencias."
        };

        const zonas = {
            ciudad: "Tu escenario ideal es Neon Core, el centro de la ciudad.",
            playa: "Tu escenario ideal es Costa Azul, junto al mar.",
            montana: "Tu escenario ideal son Los Altos, con sus rutas y montañas.",
            desierto: "Tu escenario ideal son las Tierras Rojas, llenas de paisajes diferentes."
        };

        seleccionar("#resultadoAventura").textContent =
            estilos[tipo] + " " + zonas[zona];
    });

    /* =====================================
       ENCUESTA DE LA COMUNIDAD
    ===================================== */

    const mensajesVotos = {
        coches: "¡Has elegido más vehículos! La personalización del garaje sería una de tus prioridades.",
        misiones: "¡Has elegido más misiones! La historia y los desafíos serían lo más importante.",
        mapa: "¡Has elegido un mapa más grande! La exploración sería tu prioridad.",
        online: "¡Has elegido más actividades online! La comunidad tendría un papel importante."
    };

    seleccionarTodos(".voto").forEach(boton => {
        boton.addEventListener("click", () => {
            seleccionarTodos(".voto").forEach(elemento => {
                elemento.classList.remove("seleccionado");
            });

            boton.classList.add("seleccionado");

            seleccionar("#mensajeVoto").textContent =
                mensajesVotos[boton.dataset.voto];
        });
    });

    /* =====================================
       TIENDA Y EDICIONES
    ===================================== */

    const precios = {
        standard: 59.99,
        deluxe: 79.99,
        ultimate: 99.99
    };

    const nombresEdiciones = {
        standard: "Vortex City - Standard",
        deluxe: "Vortex City - Deluxe",
        ultimate: "Vortex City - Ultimate"
    };

    seleccionarTodos(".elegir-edicion").forEach(boton => {
        boton.addEventListener("click", () => {
            const edicion = boton.dataset.edicion;

            seleccionar("#edicion").value = edicion;

            actualizarPrecioReserva();

            seleccionar("#reservas").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /* =====================================
       RESERVAS DE DEMOSTRACIÓN
    ===================================== */

    const formularioReserva = seleccionar("#formReserva");

    function actualizarPrecioReserva() {
        const edicion = seleccionar("#edicion").value;
        const cantidad = Math.max(
            1,
            Math.min(5, Number(seleccionar("#cantidad").value) || 1)
        );

        const precio = precios[edicion] * cantidad;

        seleccionar("#precioTotal").textContent = dinero(precio);
    }

    seleccionar("#edicion").addEventListener("change", actualizarPrecioReserva);
    seleccionar("#cantidad").addEventListener("input", actualizarPrecioReserva);

    actualizarPrecioReserva();

    /* =====================================
       CARRITO DE COMPRA
    ===================================== */

    let carrito = [];

    const ventanaCarrito = seleccionar("#carrito");
    const listaCarrito = seleccionar("#listaCarrito");

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";

        let total = 0;
        let cantidadTotal = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML =
                "<p>Tu carrito está vacío. Añade una edición para empezar.</p>";
        }

        carrito.forEach((producto, indice) => {
            total += producto.precio * producto.cantidad;
            cantidadTotal += producto.cantidad;

            const fila = document.createElement("div");
            fila.className = "producto-carrito";

            const informacion = document.createElement("div");

            const titulo = document.createElement("strong");
            titulo.textContent = producto.nombre;

            const detalle = document.createElement("p");
            detalle.textContent =
                producto.plataforma + " · " +
                producto.formato + " · " +
                producto.cantidad + " unidad(es)";

            informacion.append(titulo, detalle);

            const lado = document.createElement("div");

            const precio = document.createElement("strong");
            precio.textContent =
                dinero(producto.precio * producto.cantidad);

            const eliminar = document.createElement("button");
            eliminar.type = "button";
            eliminar.textContent = "Eliminar";

            eliminar.addEventListener("click", () => {
                carrito.splice(indice, 1);
                actualizarCarrito();
            });

            lado.append(precio, eliminar);
            fila.append(informacion, lado);

            listaCarrito.appendChild(fila);
        });

        seleccionar("#contador").textContent = cantidadTotal;
        seleccionar("#totalCarrito").textContent = dinero(total);
    }

    seleccionar("#abrirCarrito").addEventListener("click", () => {
        ventanaCarrito.showModal();
    });

    seleccionar("#cerrarCarrito").addEventListener("click", () => {
        ventanaCarrito.close();
    });

    ventanaCarrito.addEventListener("click", evento => {
        if (evento.target === ventanaCarrito) {
            ventanaCarrito.close();
        }
    });

    formularioReserva.addEventListener("submit", evento => {
        evento.preventDefault();

        const edicion = seleccionar("#edicion").value;
        const plataforma = seleccionar("#plataforma").value;
        const formato = seleccionar("#formato").value;

        const cantidad = Math.max(
            1,
            Math.min(5, Number(seleccionar("#cantidad").value) || 1)
        );

        carrito.push({
            nombre: nombresEdiciones[edicion],
            precio: precios[edicion],
            plataforma: plataforma,
            formato: formato,
            cantidad: cantidad
        });

        actualizarCarrito();

        seleccionar("#mensajeReserva").textContent =
            "¡Producto añadido al carrito correctamente!";

        seleccionar("#mensajeCarrito").textContent = "";
    });

    seleccionar("#vaciarCarrito").addEventListener("click", () => {
        carrito = [];
        actualizarCarrito();

        seleccionar("#mensajeCarrito").textContent =
            "Has vaciado el carrito.";
    });

    seleccionar("#confirmarReserva").addEventListener("click", () => {
        if (carrito.length === 0) {
            seleccionar("#mensajeCarrito").textContent =
                "Primero debes añadir una edición al carrito.";
            return;
        }

        const total = carrito.reduce((suma, producto) => {
            return suma + producto.precio * producto.cantidad;
        }, 0);

        seleccionar("#mensajeCarrito").textContent =
            "Demostración completada. El importe sería " +
            dinero(total) +
            ". No se ha realizado ningún pago ni reserva real.";

        carrito = [];
        actualizarCarrito();
    });

    actualizarCarrito();

    /* =====================================
       CENTRO DE OPERACIONES
    ===================================== */

    const climas = [
        "Despejado",
        "Nublado",
        "Lluvia ligera",
        "Soleado",
        "Tormenta lejana"
    ];

    const actividades = [
        "Alta",
        "Media",
        "Muy alta",
        "Tranquila"
    ];

    const traficos = [
        "Moderado",
        "Fluido",
        "Intenso",
        "Muy fluido"
    ];

    function elementoAleatorio(lista) {
        return lista[Math.floor(Math.random() * lista.length)];
    }

    seleccionar("#actualizarCiudad").addEventListener("click", () => {
        seleccionar("#climaCiudad").textContent =
            elementoAleatorio(climas);

        seleccionar("#temperaturaCiudad").textContent =
            Math.floor(Math.random() * 18 + 15) + " °C";

        seleccionar("#actividadCiudad").textContent =
            elementoAleatorio(actividades);

        seleccionar("#traficoCiudad").textContent =
            elementoAleatorio(traficos);

        seleccionar("#mensajeCiudad").textContent =
            "Informe actualizado. Datos generados para esta demostración.";
    });

    /* =====================================
       GENERADOR DE MISIONES
    ===================================== */

    const misiones = [
        {
            icono: "🏎️",
            titulo: "RETO DE VELOCIDAD",
            descripcion: "Participa en una competición ficticia por las avenidas de la ciudad.",
            zona: "Neon Core",
            recompensa: 100
        },
        {
            icono: "🗺️",
            titulo: "RUTA DESCONOCIDA",
            descripcion: "Descubre un lugar escondido y explora sus alrededores.",
            zona: "Los Altos",
            recompensa: 150
        },
        {
            icono: "🌊",
            titulo: "DÍA EN LA COSTA",
            descripcion: "Completa una serie de actividades junto al mar.",
            zona: "Costa Azul",
            recompensa: 80
        },
        {
            icono: "🔎",
            titulo: "EL MISTERIO DEL PUERTO",
            descripcion: "Investiga las pistas de una historia que ocurre en la zona industrial.",
            zona: "Puerto Gris",
            recompensa: 200
        },
        {
            icono: "🌲",
            titulo: "EXPLORACIÓN NATURAL",
            descripcion: "Recorre los caminos del bosque y encuentra sus rincones secretos.",
            zona: "Bosque Lúmina",
            recompensa: 120
        },
        {
            icono: "🏜️",
            titulo: "TIERRAS ROJAS",
            descripcion: "Completa una ruta de exploración por el paisaje desértico.",
            zona: "Tierras Rojas",
            recompensa: 130
        }
    ];

    seleccionar("#generarMision").addEventListener("click", () => {
        const mision = elementoAleatorio(misiones);

        seleccionar("#misionIcono").textContent = mision.icono;
        seleccionar("#misionTitulo").textContent = mision.titulo;
        seleccionar("#misionDescripcion").textContent = mision.descripcion;
        seleccionar("#misionZona").textContent = "Zona: " + mision.zona;
        seleccionar("#misionRecompensa").textContent =
            "Recompensa: " + mision.recompensa + " XP";

        seleccionar("#mensajeMision").textContent =
            "¡Nueva misión generada! Esta actividad es una simulación.";
    });

    /* =====================================
       CIERRE DE VENTANAS CON ESCAPE
    ===================================== */

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") {
            if (visor.open) visor.close();
            if (ventanaCarrito.open) ventanaCarrito.close();
        }
    });

    /* =====================================
       INICIO DE LA PÁGINA
    ===================================== */

    console.log("Vortex Games: página cargada correctamente.");
    console.log("Todos los sistemas de demostración están preparados.");

});


