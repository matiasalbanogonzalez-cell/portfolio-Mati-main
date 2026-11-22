/* =========================================================
   PROYECTOS DEL PORTFOLIO
   Para agregar uno nuevo: copiá un bloque, cambiá los datos
   y poné las capturas en img/proyectos/<carpeta>/01.webp, 02.webp...
   La galería de index.html y la página project.html se arman solas.
   ========================================================= */
const GITHUB = "https://github.com/matiasalbanogonzalez-cell/";

const proyectos = [
    {
        id: "eleton",
        titulo: "Eleton Digital Guest",
        categoria: "Full Stack · React + Node",
        descripcion: "Aplicación para los huéspedes de un hotel resort. Desde el celular pueden ver la agenda de recreación, inscribirse a actividades y reservar turnos de spa, mesas en el restó y funciones de teatro. El personal tiene paneles propios para gestionar actividades, cupos, reservas y avisos.",
        tecnologias: ["React 19", "Tailwind CSS", "Node.js", "Express", "Prisma", "PostgreSQL", "JWT"],
        repo: GITHUB + "eleton-digital-guest",
        demo: "",
        pantallas: [
            { titulo: "Inicio", texto: "Portada del resort con acceso a todos los servicios y lo destacado del día." },
            { titulo: "Agenda de recreación", texto: "Actividades por día, horario y edad (kids, teens, adultos), cada una con su botón de reserva." },
            { titulo: "Spa", texto: "Servicios del spa e ingreso a la reserva del circuito hídrico." },
            { titulo: "Reserva de spa", texto: "Reserva paso a paso: cantidad de adultos y niños, día y turno disponible." },
            { titulo: "Reserva en el restó", texto: "Elección del servicio (desayuno, almuerzo, merienda o cena) para reservar mesa." },
            { titulo: "Teatro", texto: "Próximas funciones con fecha, horario y lugares disponibles." },
            { titulo: "Acceso del personal", texto: "Login con JWT; cada rol (recreador, spa, restó, teatro, admin) ve su propio panel." },
            { titulo: "Panel del recreador", texto: "Gestión de actividades: cupos, inscriptos, lista de participantes y cancelación." },
            { titulo: "Dashboard de administración", texto: "Resumen del día por área: reservas, inscriptos y avisos activos, con filtro por fecha." },
            { titulo: "Avisos", texto: "Publicación de avisos que los huéspedes ven en la parte superior de la app." }
        ]
    },
    {
        id: "turnos-medicos",
        titulo: "Sistema de Turnos Médicos",
        categoria: "Full Stack · Node + MongoDB",
        descripcion: "Trabajo final de Programación 2. Sistema para gestionar pacientes, profesionales y turnos médicos, con registro, inicio de sesión y permisos por rol: el administrador ve todo y cada paciente solo sus turnos. El backend está organizado en capas y tiene tests de integración.",
        tecnologias: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "bcrypt", "Jest"],
        repo: GITHUB + "sistema-turnos-medicos",
        demo: "",
        pantallas: [
            { titulo: "Inicio de sesión", texto: "Login con email y contraseña; el token JWT se guarda para las siguientes consultas." },
            { titulo: "Registro", texto: "Alta de pacientes nuevos con contraseña encriptada con bcrypt." },
            { titulo: "Dashboard", texto: "Totales de profesionales, turnos y pacientes, y la tabla de los últimos turnos." },
            { titulo: "Mis turnos", texto: "Listado de turnos con especialidad, fecha, hora y estado." },
            { titulo: "Sacar turno", texto: "Formulario que filtra los profesionales según la especialidad elegida." },
            { titulo: "Profesionales", texto: "ABM de profesionales con matrícula y consultorio (solo administradores)." }
        ]
    },
    {
        id: "turnos-api",
        titulo: "Turnos Médicos · Clean Architecture",
        categoria: "Backend · API REST",
        descripcion: "API REST de turnos médicos organizada en capas (rutas, controladores, servicios y modelos), con validación de datos usando Joi, middlewares de autenticación y autorización, manejo de errores centralizado y tests con Jest y Supertest. Tiene un frontend simple para probarla.",
        tecnologias: ["Node.js", "Express", "MongoDB", "Joi", "JWT", "Jest", "Supertest"],
        repo: GITHUB + "turnos-medicos",
        demo: "",
        pantallas: [
            { titulo: "Inicio de sesión", texto: "Autenticación contra la API y acceso al panel del paciente." },
            { titulo: "Registro", texto: "Alta de usuario con los datos validados por Joi en el servidor." },
            { titulo: "Mis turnos", texto: "Turnos del paciente con un color por estado: confirmado, pendiente o cancelado." },
            { titulo: "Crear turno", texto: "Nuevo turno con fecha, hora, profesional, especialidad y motivo." }
        ]
    },
    {
        id: "academia-react",
        titulo: "Academia React",
        categoria: "Frontend · React",
        descripcion: "Plataforma de cursos hecha con React y Vite. Permite ver el catálogo, buscar y filtrar cursos, inscribirse y revisar las inscripciones con el total a pagar. El estado global se maneja con Zustand y la navegación con React Router.",
        tecnologias: ["React", "Vite", "Zustand", "React Router", "React Bootstrap"],
        repo: GITHUB + "academiareact",
        demo: "",
        pantallas: [
            { titulo: "Inicio", texto: "Landing de la academia con propuesta de valor y llamado a la acción." },
            { titulo: "Catálogo de cursos", texto: "Cursos con buscador, filtro por categoría, cupos disponibles y precio." },
            { titulo: "Inscripción", texto: "Al inscribirse, el botón cambia a «Quitar» y el contador del menú se actualiza al instante." },
            { titulo: "Mis inscripciones", texto: "Resumen del pedido con el total y la opción de confirmar o vaciar la inscripción." }
        ]
    },
    {
        id: "techvision",
        titulo: "TechVision",
        categoria: "Frontend · Landing page",
        descripcion: "Landing page para una agencia de soluciones digitales, con estilo glassmorphism, fondos animados, tarjetas flotantes y menú responsive.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        repo: GITHUB + "TechVision",
        demo: "",
        pantallas: [
            { titulo: "Hero", texto: "Encabezado con llamado a la acción y tarjetas flotantes animadas." },
            { titulo: "Servicios", texto: "Tarjetas de servicios con efecto de vidrio esmerilado." },
            { titulo: "Contacto", texto: "Formulario de contacto con campos validados." },
            { titulo: "Versión celular", texto: "Diseño responsive con menú hamburguesa." }
        ]
    },
    {
        id: "finanzas",
        titulo: "Control de Gastos Pro",
        categoria: "JavaScript · Firebase",
        descripcion: "App de finanzas personales para registrar ingresos y gastos. Calcula el saldo al instante, guarda los datos en tiempo real en Firebase Firestore y está publicada en Firebase Hosting.",
        tecnologias: ["JavaScript", "Firebase Firestore", "Firebase Hosting", "CSS"],
        repo: GITHUB + "Finanzas-Personales",
        demo: "https://finanzas-personales-42337.web.app",
        pantallas: [
            { titulo: "Cargar movimiento", texto: "Descripción y monto con formato de miles automático en pesos argentinos." },
            { titulo: "Saldo e historial", texto: "Saldo, total de ingresos y de gastos, y el historial sincronizado en tiempo real." },
            { titulo: "Versión celular", texto: "Pensada para cargar gastos rápido desde el teléfono." }
        ]
    },
    {
        id: "lista-tareas",
        titulo: "Mis Listas",
        categoria: "JavaScript · Firebase",
        descripcion: "Herramienta de productividad con dos listas, una de tareas y otra del súper. Los ítems se guardan en Firebase, así que no se pierden al recargar la página. Está publicada en Firebase Hosting.",
        tecnologias: ["JavaScript", "Firebase Firestore", "HTML", "CSS"],
        repo: GITHUB + "lista_tarea.js",
        demo: "https://lista-de-tareas-d29ca.web.app",
        pantallas: [
            { titulo: "Tareas y súper", texto: "Dos listas independientes que cargan los datos guardados." },
            { titulo: "Agregar ítem", texto: "El ítem nuevo se guarda en Firestore y aparece en la lista al instante." },
            { titulo: "Versión celular", texto: "Las listas se apilan para usarlas con una mano." }
        ]
    },
    {
        id: "parcial-js",
        titulo: "Parcial Programación Web 2",
        categoria: "JavaScript",
        descripcion: "Parcial resuelto con JavaScript puro: evaluador de notas, generador de tablas de multiplicar y analizador de números, con validación de lo que ingresa el usuario.",
        tecnologias: ["JavaScript", "HTML", "CSS"],
        repo: GITHUB + "stackblitz-Parcial.JS",
        demo: "",
        pantallas: [
            { titulo: "Ejercicios", texto: "Los tres ejercicios, cada uno con su entrada y su botón." },
            { titulo: "Resultados", texto: "Nota evaluada, tabla del 7 generada y análisis del número 24 (par y positivo)." }
        ]
    }
];

/* Ruta de la captura N (empieza en 1) de un proyecto */
function rutaPantalla(proyecto, n) {
    return `img/proyectos/${proyecto.id}/${String(n).padStart(2, "0")}.webp`;
}
