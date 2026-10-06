/**
 * ====================================================================
 * SISTEMA DE GESTIÓN ESCOLAR - ETAPA 2 (CENTRO EDUCATIVO "EDUCAR PARA TRANSFORMAR")
 * Módulo de Gestión Administrativa, Académica y de Servicios Institucionales
 * Caso de Estudio UTN - FRRe (Metodología de Sistemas)
 * ====================================================================
 */

// Estado global en memoria para demostración interactiva
const AdminState = {
    pestañaActiva: 'dashboard',
    subpestañaServicios: 'micros',
    filtroSolicitudNivel: 'todos',
    filtroSolicitudEstado: 'todos',
    busquedaSolicitud: '',
    filtroAlumnoNivel: 'todos',
    busquedaAlumno: '',
    
    // Estadísticas clave
    stats: {
        totalAlumnos: 348,
        solicitudesPendientes: 4,
        docentesActivos: 36,
        rutasTransporte: 4,
        asistenciaPromedio: '95.8%',
        deportesActivos: 8
    },

    // Solicitudes de vacantes (Inscripciones 2027 que provienen de la Web)
    solicitudes: [
        {
            id: 'SOL-2027-001',
            nombreAspirante: 'Tomás Valentín Benítez',
            dni: '48.921.340',
            nivel: 'Primario',
            grado: '4to Grado',
            tutor: 'Valeria Soledad Benítez',
            email: 'valeria.benitez@gmail.com',
            telefono: '(362) 478-9012',
            turno: 'Jornada Extendida',
            fecha: '2026-09-18',
            estado: 'Pendiente',
            mensaje: 'Interesados en la jornada extendida por el laboratorio de robótica y natación.'
        },
        {
            id: 'SOL-2027-002',
            nombreAspirante: 'Lucía Milagros Esquivel',
            dni: '47.112.980',
            nivel: 'Secundario',
            grado: '1er Año',
            tutor: 'Marcos Esquivel',
            email: 'marcos.esquivel@chaco.edu.ar',
            telefono: '(362) 412-3344',
            turno: 'Jornada Extendida',
            fecha: '2026-09-19',
            estado: 'Pendiente',
            mensaje: 'Buscamos continuidad bilingüe (Inglés y Francés). Necesitamos servicio de micro desde Barranqueras.'
        },
        {
            id: 'SOL-2027-003',
            nombreAspirante: 'Mateo Bosch Vesconi',
            dni: '52.880.145',
            nivel: 'Inicial',
            grado: 'Sala de 5 Años',
            tutor: 'Romina Vesconi',
            email: 'romi.vesconi@outlook.com',
            telefono: '(362) 499-1122',
            turno: 'Jornada Extendida',
            fecha: '2026-09-20',
            estado: 'Aprobada',
            mensaje: 'Tiene hermanito en sala de 3. Solicito almuerzo en comedor escolar.'
        },
        {
            id: 'SOL-2027-004',
            nombreAspirante: 'Sofía Agustina Romero',
            dni: '46.330.120',
            nivel: 'Secundario',
            grado: '3er Año',
            tutor: 'Carlos Romero',
            email: 'cromero@fibertel.com.ar',
            telefono: '(362) 456-7890',
            turno: 'Jornada Extendida',
            fecha: '2026-09-21',
            estado: 'Pendiente',
            mensaje: 'Alumna deportista con interés en vóleibol y atletismo competitivo.'
        },
        {
            id: 'SOL-2027-005',
            nombreAspirante: 'Joaquín Ignacio Gómez',
            dni: '50.114.776',
            nivel: 'Primario',
            grado: '1er Grado',
            tutor: 'Natalia Gómez',
            email: 'naty.gomez@gmail.com',
            telefono: '(362) 433-2211',
            turno: 'Jornada Extendida',
            fecha: '2026-09-21',
            estado: 'Aprobada',
            mensaje: 'Solicitamos micro escolar ruta Fontana.'
        },
        {
            id: 'SOL-2027-006',
            nombreAspirante: 'Camila Da Silva Fernández',
            dni: '53.402.119',
            nivel: 'Inicial',
            grado: 'Sala de 4 Años',
            tutor: 'Jorge Fernández',
            email: 'jorgef@gmail.com',
            telefono: '(362) 420-5566',
            turno: 'Jornada Extendida',
            fecha: '2026-09-15',
            estado: 'Rechazada',
            mensaje: 'Sin cupo disponible en sala solicitada para el turno mañana.'
        }
    ],

    // Alumnos regulares del Centro
    alumnos: [
        {
            legajo: 'ET-2027-0101',
            nombre: 'Agustín Facundo Morales',
            dni: '45.109.823',
            nivel: 'Secundario',
            curso: '5to Año - Tec. Informática',
            idioma: 'Inglés Avanzado',
            deporte: 'Básquet',
            tutor: 'Eduardo Morales',
            regularidad: 'Regular',
            asistencia: '96%'
        },
        {
            legajo: 'ET-2027-0102',
            nombre: 'Candela Belén Aguirre',
            dni: '49.882.100',
            nivel: 'Primario',
            curso: '6to Grado "A"',
            idioma: 'Portugués',
            deporte: 'Natación',
            tutor: 'Lorena Aguirre',
            regularidad: 'Regular',
            asistencia: '98%'
        },
        {
            legajo: 'ET-2027-0103',
            nombre: 'Felipe Santino Ruiz',
            dni: '52.330.401',
            nivel: 'Inicial',
            curso: 'Sala de 5 "B"',
            idioma: 'Iniciación al Inglés',
            deporte: 'Iniciación Deportiva',
            tutor: 'Martín Ruiz',
            regularidad: 'Regular',
            asistencia: '92%'
        },
        {
            legajo: 'ET-2027-0104',
            nombre: 'Micaela Sol Navarro',
            dni: '46.771.203',
            nivel: 'Secundario',
            curso: '4to Año - Ciencias Naturales',
            idioma: 'Francés',
            deporte: 'Vóleibol',
            tutor: 'Silvina Prado',
            regularidad: 'Condicional',
            asistencia: '84%'
        },
        {
            legajo: 'ET-2027-0105',
            nombre: 'Benjamín David Torres',
            dni: '48.229.014',
            nivel: 'Primario',
            curso: '3er Grado "B"',
            idioma: 'Inglés',
            deporte: 'Ajedrez',
            tutor: 'Esteban Torres',
            regularidad: 'Regular',
            asistencia: '94%'
        }
    ],

    // Docentes, autoridades y especialistas del caso de estudio
    docentes: [
        {
            nombre: 'Lic. Carolina Ileana Vargas',
            rol: 'Directora General / Gestión Académica',
            area: 'Autoridades',
            email: 'direccion@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            nombre: 'Prof. Martín Aranda',
            rol: 'Coordinador Nivel Secundario y Lab. Informática',
            area: 'Tecnología y Ciencias',
            email: 'm.aranda@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            nombre: 'Prof. Laura Giménez',
            rol: 'Jefa de Cátedra Lenguas Extranjeras (Inglés)',
            area: 'Idiomas',
            email: 'l.gimenez@educarparatransformar.edu.ar',
            dedicacion: 'Jornada Extendida',
            estado: 'Activo'
        },
        {
            nombre: 'Prof. Pierre Dupont',
            rol: 'Profesor de Francés Institucional',
            area: 'Idiomas',
            email: 'p.dupont@educarparatransformar.edu.ar',
            dedicacion: 'Jornada Parcial',
            estado: 'Activo'
        },
        {
            nombre: 'Prof. Thiago Silva',
            rol: 'Profesor de Lengua y Cultura Portuguesa',
            area: 'Idiomas',
            email: 't.silva@educarparatransformar.edu.ar',
            dedicacion: 'Jornada Parcial',
            estado: 'Activo'
        },
        {
            nombre: 'Prof. Alejandro Rossi',
            rol: 'Coordinador de Deportes (Natación y Atletismo)',
            area: 'Educación Física',
            email: 'a.rossi@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            nombre: 'Lic. Florencia Sánchez',
            rol: 'Gabinete Psicopedagógico (Apoyo Estudiantil)',
            area: 'Bienestar',
            email: 'f.sanchez@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            nombre: 'Dra. Mariana Zalazar',
            rol: 'Médica Pediatra - Sala de Enfermería Escolar',
            area: 'Salud',
            email: 'enfermeria@educarparatransformar.edu.ar',
            dedicacion: 'Turno Mañana y Tarde',
            estado: 'Activo'
        }
    ],

    // Rutas de Micros de Traslado (Servicio de Transporte)
    rutasMicros: [
        {
            linea: 'Micro 01 - Zona Fontana',
            recorrido: 'Fontana Centro - Av. Alvear - Av. Castelli - Campus Educativo',
            chofer: 'Raúl Duarte',
            patente: 'AF 342 LK',
            alumnosAsignados: 28,
            capacidadTotal: 30,
            horarioArribo: '07:20 hs / 17:35 hs'
        },
        {
            linea: 'Micro 02 - Barranqueras & Puerto Vilelas',
            recorrido: 'Plaza Sarmiento - Av. 9 de Julio - Av. San Martín - Campus',
            chofer: 'Esteban Morales',
            patente: 'AE 901 ZZ',
            alumnosAsignados: 26,
            capacidadTotal: 30,
            horarioArribo: '07:25 hs / 17:40 hs'
        },
        {
            linea: 'Micro 03 - Resistencia Centro',
            recorrido: 'Plaza 25 de Mayo - Av. Sarmiento - Av. Italia - Campus',
            chofer: 'Gabriel Alegre',
            patente: 'AF 118 OP',
            alumnosAsignados: 30,
            capacidadTotal: 30,
            horarioArribo: '07:15 hs / 17:30 hs'
        },
        {
            linea: 'Micro 04 - Corredor Ruta 16 & Monte Alto',
            recorrido: 'Sarmiento Shopping - Ruta 16 Km 15 - Autovía Nicolás Avellaneda',
            chofer: 'Juan Ignacio Romero',
            patente: 'AD 855 MN',
            alumnosAsignados: 23,
            capacidadTotal: 30,
            horarioArribo: '07:10 hs / 17:45 hs'
        }
    ],

    // Menú de Comedor Institucional
    menuComedor: [
        { dia: 'Lunes', plato: 'Pechuga gratinada con milhojas de calabaza y ensalada fresca', dietaEspecial: 'Apto Celíaco / Sin TACC' },
        { dia: 'Martes', plato: 'Pastel de ternera tradicional con puré tricolor de batata y espinaca', dietaEspecial: 'Opción Vegetariana disponible' },
        { dia: 'Miércoles', plato: 'Penne rigate con bolognesa de la huerta escolar y queso sardo', dietaEspecial: 'Pasta de maíz para celíacos' },
        { dia: 'Jueves', plato: 'Filet de pescado crocante al limón con arroz pilaf y vegetales', dietaEspecial: 'Menú hiposódico disponible' },
        { dia: 'Viernes', plato: 'Tarta rústica mediterránea de queso y espinacas con ensalada mixta', dietaEspecial: '100% Vegetariano' }
    ],

    // Instalaciones & Deportes del caso de estudio
    instalaciones: [
        { nombre: 'Pileta Semi-Olímpica Climatizada', tipo: 'Deportiva / Acuática', estado: 'Operativa', capacidad: '40 alumnos/turno' },
        { nombre: 'Canchas de Césped Sintético (Fútbol)', tipo: 'Deportiva', estado: 'Operativa', capacidad: '2 canchas de 7' },
        { nombre: 'Pista de Atletismo Reglamentaria', tipo: 'Deportiva / Exterior', estado: 'Operativa', capacidad: '6 andariveles' },
        { nombre: 'Gimnasio Cubierto Multideporte', tipo: 'Vóley / Básquet / Danza', estado: 'Operativa', capacidad: '200 espectadores' },
        { nombre: 'Laboratorio de Computación y Robótica', tipo: 'Académica / STEM', estado: 'Equipado', capacidad: '32 puestos con PC' },
        { nombre: 'Laboratorios de Física y Química', tipo: 'Científica', estado: 'Equipado', capacidad: '28 puestos con mesada' },
        { nombre: 'Comedor Institucional', tipo: 'Nutrición y Bienestar', estado: 'Operativo', capacidad: '250 comensales' },
        { nombre: 'Sala de Primeros Auxilios y Enfermería', tipo: 'Salud', estado: 'Atención Permanente', capacidad: 'Guardia activa' }
    ],

    // Deportes
    deportes: [
        { nombre: 'Natación', nivel: 'Inicial, Primario y Secundario', dias: 'Lun, Mié y Vie', inscriptos: 142 },
        { nombre: 'Fútbol', nivel: 'Primario y Secundario', dias: 'Mar y Jue', inscriptos: 110 },
        { nombre: 'Atletismo', nivel: 'Primario y Secundario', dias: 'Lun y Mié', inscriptos: 64 },
        { nombre: 'Vóleibol', nivel: 'Secundario', dias: 'Mar y Vie', inscriptos: 55 },
        { nombre: 'Básquet', nivel: 'Primario y Secundario', dias: 'Mié y Vie', inscriptos: 78 },
        { nombre: 'Artes Marciales (Taekwondo / Judo)', nivel: 'Todos los niveles', dias: 'Sábados', inscriptos: 48 },
        { nombre: 'Danza y Expresión Corporal', nivel: 'Inicial y Primario', dias: 'Mar y Jue', inscriptos: 52 },
        { nombre: 'Ajedrez Formativo', nivel: 'Primario y Secundario', dias: 'Viernes', inscriptos: 39 }
    ],

    // Circulares Institucionales publicadas
    circulares: [
        {
            id: 'CIR-2027-08',
            titulo: 'Apertura de Convocatoria para Becas de Excelencia Deportiva y Académica 2027',
            destinatario: 'Familias de Resistencia y Alumnado',
            fecha: '2026-09-20',
            autor: 'Dirección General',
            categoria: 'Académica',
            contenido: 'Se informa que desde el 1 de Octubre se recibirán las solicitudes para el programa de estímulo deportivo en Atletismo y Natación.'
        },
        {
            id: 'CIR-2027-07',
            titulo: 'Cronograma de Ficha Médica y Apto Físico para Ingresantes al Ciclo 2027',
            destinatario: 'Tutores de Nivel Inicial y Primario',
            fecha: '2026-09-14',
            autor: 'Gabinete Médico y Enfermería',
            categoria: 'Salud',
            contenido: 'Recordamos presentar el formulario médico obligatorio firmado por pediatra antes del inicio lectivo de marzo 2027.'
        }
    ]
};

// ====================================================================
// MÉTODOS DE CONTROL DE VISTAS Y NAVEGACIÓN
// ====================================================================

/**
 * Abre el Sistema de Gestión (Etapa 2 - Admin Panel)
 */
function abrirPanelAdmin() {
    const vistaLanding = document.getElementById('vistaLanding');
    const vistaPanel = document.getElementById('vistaPanel');
    const vistaAdmin = document.getElementById('vistaAdmin');

    if (vistaLanding) vistaLanding.classList.add('hidden');
    if (vistaPanel) vistaPanel.classList.add('hidden');
    if (vistaAdmin) {
        vistaAdmin.classList.remove('hidden');
        renderizarVistaAdmin();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarToast('Bienvenido al Sistema de Gestión (Etapa 2)', 'info');
}

/**
 * Regresa a la Landing Page pública
 */
function volverALanding() {
    const vistaLanding = document.getElementById('vistaLanding');
    const vistaPanel = document.getElementById('vistaPanel');
    const vistaAdmin = document.getElementById('vistaAdmin');

    if (vistaAdmin) vistaAdmin.classList.add('hidden');
    if (vistaPanel) vistaPanel.classList.add('hidden');
    if (vistaLanding) vistaLanding.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Abre el panel de estudiante desde el admin
 */
function abrirPanelEstudianteDesdeAdmin() {
    const vistaLanding = document.getElementById('vistaLanding');
    const vistaPanel = document.getElementById('vistaPanel');
    const vistaAdmin = document.getElementById('vistaAdmin');

    if (vistaAdmin) vistaAdmin.classList.add('hidden');
    if (vistaLanding) vistaLanding.classList.add('hidden');
    if (vistaPanel) vistaPanel.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Alterna la visibilidad del menú de navegación de administración en móviles
 */
function toggleNavAdmin() {
    const navMenu = document.getElementById('navAdminMenu');
    const navFooter = document.getElementById('navAdminFooter');
    if (!navMenu) return;

    const estaOculto = navMenu.classList.contains('hidden');
    if (estaOculto) {
        navMenu.classList.remove('hidden');
        if (navFooter) navFooter.classList.remove('hidden');
    } else {
        navMenu.classList.add('hidden');
        if (navFooter) navFooter.classList.add('hidden');
    }
}

/**
 * Cambia la pestaña activa dentro del Sistema de Gestión
 */
function cambiarAdminTab(nombreTab) {
    AdminState.pestañaActiva = nombreTab;
    
    // Actualizar estilos de los botones del menú lateral
    const botones = document.querySelectorAll('.admin-nav-item');
    botones.forEach(btn => {
        if (btn.getAttribute('data-tab') === nombreTab) {
            btn.classList.add('bg-blue-800', 'text-white', 'shadow-md');
            btn.classList.remove('text-slate-300', 'hover:bg-blue-900/60');
        } else {
            btn.classList.remove('bg-blue-800', 'text-white', 'shadow-md');
            btn.classList.add('text-slate-300', 'hover:bg-blue-900/60');
        }
    });

    // Ocultar todos los contenedores de sección
    const contenedores = document.querySelectorAll('.admin-tab-content');
    contenedores.forEach(c => c.classList.add('hidden'));

    // Mostrar el contenedor seleccionado
    const contenedorActivo = document.getElementById(`admin-sec-${nombreTab}`);
    if (contenedorActivo) {
        contenedorActivo.classList.remove('hidden');
    }

    // En móviles, colapsar el menú al seleccionar una opción
    if (window.innerWidth < 768) {
        const navMenu = document.getElementById('navAdminMenu');
        const navFooter = document.getElementById('navAdminFooter');
        if (navMenu) navMenu.classList.add('hidden');
        if (navFooter) navFooter.classList.add('hidden');
    }

    // Actualizar título de sección en el header
    const titulos = {
        dashboard: 'Tablero General de Gestión y Métricas',
        solicitudes: 'Gestión de Solicitudes de Admisión (Ciclo 2027)',
        alumnos: 'Nómina de Alumnos, Regularidad y Cursos',
        docentes: 'Plantel Docente, Idiomas y Especialidades',
        servicios: 'Servicios Institucionales: Transporte, Comedor y Salud',
        deportes: 'Deportes, Infraestructura e Instalaciones',
        circulares: 'Comunicados Oficiales y Circulares'
    };
    const headerTitle = document.getElementById('adminCurrentSectionTitle');
    if (headerTitle && titulos[nombreTab]) {
        headerTitle.innerText = titulos[nombreTab];
    }
}

/**
 * Cambia la sub-pestaña dentro del módulo de Servicios & Bienestar
 */
function cambiarSubpestañaServicios(sub) {
    AdminState.subpestañaServicios = sub;
    const subs = ['micros', 'comedor', 'enfermeria', 'apoyo'];
    subs.forEach(s => {
        const el = document.getElementById(`subservicios-${s}`);
        const btn = document.getElementById(`btn-sub-${s}`);
        if (s === sub) {
            if (el) el.classList.remove('hidden');
            if (btn) {
                btn.classList.add('bg-blue-900', 'text-white');
                btn.classList.remove('bg-slate-100', 'text-slate-600');
            }
        } else {
            if (el) el.classList.add('hidden');
            if (btn) {
                btn.classList.remove('bg-blue-900', 'text-white');
                btn.classList.add('bg-slate-100', 'text-slate-600');
            }
        }
    });
}

// ====================================================================
// RENDERIZADO DINÁMICO DE DATOS
// ====================================================================

function renderizarVistaAdmin() {
    renderizarContadoresDashboard();
    renderizarTablaSolicitudes();
    renderizarTablaAlumnos();
    renderizarTablaDocentes();
    renderizarModuloServicios();
    renderizarModuloDeportes();
    renderizarListaCirculares();
}

/**
 * Actualiza los contadores de la sección Dashboard
 */
function renderizarContadoresDashboard() {
    const pendientes = AdminState.solicitudes.filter(s => s.estado === 'Pendiente').length;
    AdminState.stats.solicitudesPendientes = pendientes;

    const elMatricula = document.getElementById('adminStatMatricula');
    const elSolicitudes = document.getElementById('adminStatSolicitudes');
    const elDocentes = document.getElementById('adminStatDocentes');
    const elMicros = document.getElementById('adminStatMicros');
    const badgePendientesNav = document.getElementById('badgeAdminPendientesNav');

    if (elMatricula) elMatricula.innerText = AdminState.alumnos.length + 343;
    if (elSolicitudes) elSolicitudes.innerText = pendientes;
    if (elDocentes) elDocentes.innerText = AdminState.docentes.length;
    if (elMicros) elMicros.innerText = AdminState.rutasMicros.length;
    if (badgePendientesNav) badgePendientesNav.innerText = pendientes;
}

/**
 * Renderiza la tabla de Solicitudes de Admisión con filtros
 */
function renderizarTablaSolicitudes() {
    const tbody = document.getElementById('tablaSolicitudesBody');
    if (!tbody) return;

    let lista = AdminState.solicitudes.filter(item => {
        const coincideNivel = AdminState.filtroSolicitudNivel === 'todos' || item.nivel.toLowerCase() === AdminState.filtroSolicitudNivel.toLowerCase();
        const coincideEstado = AdminState.filtroSolicitudEstado === 'todos' || item.estado.toLowerCase() === AdminState.filtroSolicitudEstado.toLowerCase();
        const coincideBusqueda = AdminState.busquedaSolicitud === '' || 
            item.nombreAspirante.toLowerCase().includes(AdminState.busquedaSolicitud.toLowerCase()) ||
            item.dni.includes(AdminState.busquedaSolicitud) ||
            item.tutor.toLowerCase().includes(AdminState.busquedaSolicitud.toLowerCase());
        return coincideNivel && coincideEstado && coincideBusqueda;
    });

    if (lista.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8 text-slate-400 font-bold text-xs uppercase tracking-wider">
                    <i class="fas fa-search text-2xl mb-2 block"></i>
                    No se encontraron solicitudes con los filtros aplicados.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = lista.map(sol => {
        let badgeEstado = '';
        if (sol.estado === 'Pendiente') {
            badgeEstado = '<span class="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase"><i class="fas fa-clock mr-1"></i>Pendiente</span>';
        } else if (sol.estado === 'Aprobada') {
            badgeEstado = '<span class="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase"><i class="fas fa-check-circle mr-1"></i>Aprobada</span>';
        } else {
            badgeEstado = '<span class="bg-red-100 text-red-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase"><i class="fas fa-times-circle mr-1"></i>Rechazada</span>';
        }

        let badgeNivel = '';
        if (sol.nivel === 'Inicial') badgeNivel = 'border-l-4 border-green-500';
        else if (sol.nivel === 'Primario') badgeNivel = 'border-l-4 border-blue-500';
        else badgeNivel = 'border-l-4 border-purple-500';

        return `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition ${badgeNivel}">
                <td class="p-4 font-mono text-[11px] font-bold text-slate-500">${sol.id}</td>
                <td class="p-4">
                    <p class="font-bold text-slate-800 text-xs">${sol.nombreAspirante}</p>
                    <p class="text-[10px] text-slate-400">DNI: ${sol.dni}</p>
                </td>
                <td class="p-4">
                    <span class="font-bold text-xs text-blue-900">${sol.nivel}</span>
                    <p class="text-[10px] text-slate-500">${sol.grado}</p>
                </td>
                <td class="p-4">
                    <p class="text-xs font-semibold text-slate-700">${sol.tutor}</p>
                    <p class="text-[10px] text-slate-400"><i class="fas fa-envelope mr-1"></i>${sol.email}</p>
                </td>
                <td class="p-4 text-center">
                    ${badgeEstado}
                </td>
                <td class="p-4 text-[11px] text-slate-500">${sol.fecha}</td>
                <td class="p-4 text-right">
                    <div class="flex justify-end gap-1.5">
                        <button onclick="verDetalleSolicitud('${sol.id}')" title="Ver Detalles de Familia" class="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs transition">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${sol.estado !== 'Aprobada' ? `
                            <button onclick="cambiarEstadoSolicitud('${sol.id}', 'Aprobada')" title="Aprobar Vacante" class="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs transition">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        ${sol.estado !== 'Rechazada' ? `
                            <button onclick="cambiarEstadoSolicitud('${sol.id}', 'Rechazada')" title="Rechazar Vacante" class="p-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs transition">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Cambia el estado de una solicitud de admisión en memoria
 */
function cambiarEstadoSolicitud(id, nuevoEstado) {
    const solicitud = AdminState.solicitudes.find(s => s.id === id);
    if (!solicitud) return;

    solicitud.estado = nuevoEstado;
    renderizarContadoresDashboard();
    renderizarTablaSolicitudes();

    if (nuevoEstado === 'Aprobada') {
        mostrarToast(`Vacante de ${solicitud.nombreAspirante} APROBADA exitosamente.`, 'success');
    } else {
        mostrarToast(`Solicitud de ${solicitud.nombreAspirante} actualizada a ${nuevoEstado}.`, 'warning');
    }
}

/**
 * Modal para ver detalle completo de la solicitud
 */
function verDetalleSolicitud(id) {
    const sol = AdminState.solicitudes.find(s => s.id === id);
    if (!sol) return;

    const modal = document.getElementById('modalDetalleSolicitud');
    const contenido = document.getElementById('contenidoDetalleSolicitud');
    if (!modal || !contenido) return;

    contenido.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b">
                <div>
                    <span class="text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2 py-0.5 rounded">${sol.id}</span>
                    <h4 class="text-lg font-black text-slate-800 mt-1">${sol.nombreAspirante}</h4>
                </div>
                <div>
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${sol.estado === 'Aprobada' ? 'bg-emerald-100 text-emerald-800' : (sol.estado === 'Pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800')}">
                        ${sol.estado}
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-400 font-bold uppercase text-[9px]">DNI Alumno</p>
                    <p class="font-bold text-slate-700">${sol.dni}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-400 font-bold uppercase text-[9px]">Nivel Solicitado</p>
                    <p class="font-bold text-blue-900">${sol.nivel} - ${sol.grado}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-400 font-bold uppercase text-[9px]">Tutor Responsable</p>
                    <p class="font-bold text-slate-700">${sol.tutor}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-400 font-bold uppercase text-[9px]">Teléfono Contacto</p>
                    <p class="font-bold text-slate-700">${sol.telefono}</p>
                </div>
            </div>

            <div class="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-xs">
                <p class="text-blue-900 font-bold uppercase text-[10px] mb-1">Email Registrado:</p>
                <p class="text-slate-700">${sol.email}</p>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl text-xs">
                <p class="text-slate-400 font-bold uppercase text-[10px] mb-1">Mensaje de la Familia:</p>
                <p class="text-slate-700 italic">"${sol.mensaje}"</p>
            </div>

            <div class="flex justify-end gap-2 pt-3 border-t">
                <button onclick="cerrarModalDetalle()" class="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition">Cerrar</button>
                <button onclick="cambiarEstadoSolicitud('${sol.id}', 'Aprobada'); cerrarModalDetalle();" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition">
                    <i class="fas fa-check mr-1"></i> Aprobar Vacante
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalDetalle() {
    const modal = document.getElementById('modalDetalleSolicitud');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

/**
 * Renderiza la nómina de Alumnos y Cursos
 */
function renderizarTablaAlumnos() {
    const tbody = document.getElementById('tablaAlumnosBody');
    if (!tbody) return;

    let lista = AdminState.alumnos.filter(al => {
        const coincideNivel = AdminState.filtroAlumnoNivel === 'todos' || al.nivel.toLowerCase() === AdminState.filtroAlumnoNivel.toLowerCase();
        const coincideBusqueda = AdminState.busquedaAlumno === '' || 
            al.nombre.toLowerCase().includes(AdminState.busquedaAlumno.toLowerCase()) ||
            al.dni.includes(AdminState.busquedaAlumno) ||
            al.legajo.toLowerCase().includes(AdminState.busquedaAlumno.toLowerCase());
        return coincideNivel && coincideBusqueda;
    });

    tbody.innerHTML = lista.map(al => {
        return `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                <td class="p-4 font-mono text-[11px] font-bold text-blue-900">${al.legajo}</td>
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                            ${al.nombre.charAt(0)}
                        </div>
                        <div>
                            <p class="font-bold text-slate-800 text-xs">${al.nombre}</p>
                            <p class="text-[10px] text-slate-400">DNI: ${al.dni}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <span class="font-bold text-xs text-slate-700">${al.curso}</span>
                    <span class="block text-[10px] text-slate-400">${al.nivel}</span>
                </td>
                <td class="p-4">
                    <span class="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">${al.idioma}</span>
                    <span class="block text-[10px] text-slate-500 mt-0.5"><i class="fas fa-running mr-1"></i>${al.deporte}</span>
                </td>
                <td class="p-4 text-center">
                    <button onclick="alternarRegularidadAlumno('${al.legajo}')" title="Click para alternar condición" class="cursor-pointer text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${al.regularidad === 'Regular' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                        ${al.regularidad}
                    </button>
                </td>
                <td class="p-4 text-center font-bold text-xs text-slate-700">
                    ${al.asistencia}
                </td>
                <td class="p-4 text-right">
                    <button onclick="emitirCertificadoDesdeAdmin('${al.legajo}', '${al.nombre}')" class="px-2.5 py-1 bg-blue-900 text-white hover:bg-blue-800 rounded-lg text-[10px] font-bold transition">
                        <i class="fas fa-file-pdf mr-1"></i> Certificado
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function alternarRegularidadAlumno(legajo) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;
    alumno.regularidad = (alumno.regularidad === 'Regular') ? 'Condicional' : 'Regular';
    renderizarTablaAlumnos();
    mostrarToast(`Condición de ${alumno.nombre} actualizada a: ${alumno.regularidad}`, 'info');
}

function emitirCertificadoDesdeAdmin(legajo, nombre) {
    mostrarToast(`Certificado Institucional emitido para ${nombre} (${legajo})`, 'success');
}

/**
 * Renderiza el listado de Docentes y Especialistas
 */
function renderizarTablaDocentes() {
    const grid = document.getElementById('gridDocentes');
    if (!grid) return;

    grid.innerHTML = AdminState.docentes.map(d => {
        let icon = 'fa-chalkboard-teacher';
        if (d.area === 'Autoridades') icon = 'fa-user-tie';
        if (d.area === 'Idiomas') icon = 'fa-language';
        if (d.area === 'Educación Física') icon = 'fa-swimmer';
        if (d.area === 'Salud') icon = 'fa-user-md';
        if (d.area === 'Bienestar') icon = 'fa-heart';

        return `
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col justify-between">
                <div>
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center text-lg">
                            <i class="fas ${icon}"></i>
                        </div>
                        <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">${d.area}</span>
                    </div>
                    <h4 class="font-bold text-slate-800 text-sm mb-1">${d.nombre}</h4>
                    <p class="text-xs text-blue-900 font-semibold mb-2">${d.rol}</p>
                    <p class="text-[11px] text-slate-500 mb-1"><i class="fas fa-envelope mr-1 text-slate-400"></i>${d.email}</p>
                    <p class="text-[10px] text-slate-400"><i class="fas fa-clock mr-1 text-slate-400"></i>${d.dedicacion}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="inline-flex items-center text-[10px] font-bold text-emerald-600">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> ${d.estado}
                    </span>
                    <button onclick="mostrarToast('Mensaje directo iniciado con ${d.nombre}', 'info')" class="text-blue-900 hover:underline text-[10px] font-bold">Contactar</button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Renderiza el módulo de Servicios Escolares (Micros, Comedor, Enfermería, Apoyo)
 */
function renderizarModuloServicios() {
    // 1. Micros
    const tablaMicros = document.getElementById('tablaMicrosBody');
    if (tablaMicros) {
        tablaMicros.innerHTML = AdminState.rutasMicros.map(m => `
            <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
                <td class="p-3 font-bold text-blue-900">${m.linea}</td>
                <td class="p-3 text-slate-600">${m.recorrido}</td>
                <td class="p-3">
                    <p class="font-semibold text-slate-800">${m.chofer}</p>
                    <p class="text-[10px] text-slate-400">Patente: ${m.patente}</p>
                </td>
                <td class="p-3 text-center">
                    <span class="font-bold ${m.alumnosAsignados >= m.capacidadTotal ? 'text-red-600' : 'text-emerald-700'}">
                        ${m.alumnosAsignados} / ${m.capacidadTotal}
                    </span>
                </td>
                <td class="p-3 text-slate-500 text-[11px]">${m.horarioArribo}</td>
            </tr>
        `).join('');
    }

    // 2. Comedor
    const gridMenu = document.getElementById('gridMenuComedor');
    if (gridMenu) {
        gridMenu.innerHTML = AdminState.menuComedor.map(c => `
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-black uppercase text-orange-600 tracking-wider">${c.dia}</span>
                <p class="font-bold text-slate-800 text-xs mt-1 mb-2">${c.plato}</p>
                <span class="inline-block bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                    <i class="fas fa-leaf mr-1"></i>${c.dietaEspecial}
                </span>
            </div>
        `).join('');
    }
}

/**
 * Renderiza Deportes e Instalaciones
 */
function renderizarModuloDeportes() {
    const gridInst = document.getElementById('gridInstalaciones');
    if (gridInst) {
        gridInst.innerHTML = AdminState.instalaciones.map(inst => `
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-black uppercase text-blue-900">${inst.tipo}</span>
                    <span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">${inst.estado}</span>
                </div>
                <h5 class="font-bold text-slate-800 text-xs mb-1">${inst.nombre}</h5>
                <p class="text-[10px] text-slate-500"><i class="fas fa-users mr-1"></i>Capacidad: ${inst.capacidad}</p>
            </div>
        `).join('');
    }

    const gridDep = document.getElementById('gridDeportes');
    if (gridDep) {
        gridDep.innerHTML = AdminState.deportes.map(d => `
            <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                    <h5 class="font-bold text-slate-800 text-xs">${d.nombre}</h5>
                    <p class="text-[10px] text-slate-400">${d.nivel} • ${d.dias}</p>
                </div>
                <div class="text-right">
                    <span class="text-sm font-black text-blue-900">${d.inscriptos}</span>
                    <span class="block text-[9px] text-slate-400 uppercase">Alumnos</span>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Renderiza la lista de Circulares y avisos
 */
function renderizarListaCirculares() {
    const contenedor = document.getElementById('contenedorCirculares');
    if (!contenedor) return;

    contenedor.innerHTML = AdminState.circulares.map(cir => `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-black uppercase bg-blue-50 text-blue-900 px-2 py-0.5 rounded">${cir.categoria}</span>
                <span class="text-[10px] text-slate-400">${cir.fecha}</span>
            </div>
            <h4 class="font-black text-slate-800 text-sm mb-1">${cir.titulo}</h4>
            <p class="text-xs text-slate-600 mb-3">${cir.contenido}</p>
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-50">
                <span><i class="fas fa-user-edit mr-1"></i>Emitido por: ${cir.autor}</span>
                <span><i class="fas fa-users mr-1"></i>Para: ${cir.destinatario}</span>
            </div>
        </div>
    `).join('');
}

/**
 * Publicar una nueva circular institucional
 */
function publicarNuevaCircular(e) {
    if (e) e.preventDefault();
    const titulo = document.getElementById('cirTitulo').value.trim();
    const categoria = document.getElementById('cirCategoria').value;
    const destinatario = document.getElementById('cirDestinatario').value;
    const contenido = document.getElementById('cirContenido').value.trim();

    if (!titulo || !contenido) {
        mostrarToast('Por favor complete título y contenido de la circular.', 'warning');
        return;
    }

    const nueva = {
        id: `CIR-2027-${String(AdminState.circulares.length + 9).padStart(2, '0')}`,
        titulo,
        categoria,
        destinatario,
        contenido,
        fecha: new Date().toISOString().split('T')[0],
        autor: 'Dirección General'
    };

    AdminState.circulares.unshift(nueva);
    renderizarListaCirculares();
    
    document.getElementById('cirTitulo').value = '';
    document.getElementById('cirContenido').value = '';

    mostrarToast('¡Circular institucional publicada con éxito!', 'success');
}

/**
 * Modal para matricular un nuevo alumno manualmente
 */
function abrirModalNuevoAlumno() {
    const modal = document.getElementById('modalNuevoAlumno');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function cerrarModalNuevoAlumno() {
    const modal = document.getElementById('modalNuevoAlumno');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function guardarNuevoAlumno(e) {
    if (e) e.preventDefault();
    const nombre = document.getElementById('matNombre').value.trim();
    const dni = document.getElementById('matDni').value.trim();
    const nivel = document.getElementById('matNivel').value;
    const curso = document.getElementById('matCurso').value.trim();
    const tutor = document.getElementById('matTutor').value.trim();
    const idioma = document.getElementById('matIdioma').value;
    const deporte = document.getElementById('matDeporte').value;

    if (!nombre || !dni || !curso || !tutor) {
        mostrarToast('Complete los datos obligatorios del alumno y tutor.', 'warning');
        return;
    }

    const nuevoLegajo = `ET-2027-0${100 + AdminState.alumnos.length + 1}`;
    AdminState.alumnos.unshift({
        legajo: nuevoLegajo,
        nombre,
        dni,
        nivel,
        curso,
        idioma,
        deporte,
        tutor,
        regularidad: 'Regular',
        asistencia: '100%'
    });

    renderizarContadoresDashboard();
    renderizarTablaAlumnos();
    cerrarModalNuevoAlumno();
    mostrarToast(`¡Alumno ${nombre} matriculado exitosamente con legajo ${nuevoLegajo}!`, 'success');
}

// ====================================================================
// COMPONENTE DE NOTIFICACIONES TOAST (MODERNO Y NO BLOQUEANTE)
// ====================================================================

function mostrarToast(mensaje, tipo = 'info') {
    let contenedor = document.getElementById('adminToastContainer');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'adminToastContainer';
        contenedor.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none';
        document.body.appendChild(contenedor);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto transform transition-all duration-300 translate-y-3 opacity-0 flex items-center p-3 rounded-xl shadow-xl border text-xs font-bold';

    let icon = 'fa-info-circle';
    let style = 'bg-slate-900 text-white border-slate-700';

    if (tipo === 'success') {
        icon = 'fa-check-circle';
        style = 'bg-emerald-600 text-white border-emerald-500';
    } else if (tipo === 'warning') {
        icon = 'fa-exclamation-triangle';
        style = 'bg-amber-500 text-white border-amber-400';
    } else if (tipo === 'info') {
        icon = 'fa-bell';
        style = 'bg-blue-900 text-white border-blue-700';
    }

    toast.className += ` ${style}`;
    toast.innerHTML = `
        <i class="fas ${icon} text-base mr-2.5"></i>
        <span class="flex-1">${mensaje}</span>
    `;

    contenedor.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-3', 'opacity-0');
    });

    // Auto-cierre
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}

// Filtros interactivos de solicitudes
function setFiltroSolicitudNivel(nivel, btn) {
    AdminState.filtroSolicitudNivel = nivel;
    actualizarEstilosBotonesFiltro('.btn-filtro-sol-nivel', btn);
    renderizarTablaSolicitudes();
}

function setFiltroSolicitudEstado(estado, btn) {
    AdminState.filtroSolicitudEstado = estado;
    actualizarEstilosBotonesFiltro('.btn-filtro-sol-estado', btn);
    renderizarTablaSolicitudes();
}

function setFiltroAlumnoNivel(nivel, btn) {
    AdminState.filtroAlumnoNivel = nivel;
    actualizarEstilosBotonesFiltro('.btn-filtro-al-nivel', btn);
    renderizarTablaAlumnos();
}

function actualizarEstilosBotonesFiltro(selector, btnActivo) {
    document.querySelectorAll(selector).forEach(b => {
        b.classList.remove('bg-blue-900', 'text-white');
        b.classList.add('bg-white', 'text-slate-600');
    });
    if (btnActivo) {
        btnActivo.classList.add('bg-blue-900', 'text-white');
        btnActivo.classList.remove('bg-white', 'text-slate-600');
    }
}

// Inicialización de escuchadores de búsqueda
document.addEventListener('DOMContentLoaded', () => {
    const inputSearchSol = document.getElementById('searchSolicitudes');
    if (inputSearchSol) {
        inputSearchSol.addEventListener('input', (e) => {
            AdminState.busquedaSolicitud = e.target.value;
            renderizarTablaSolicitudes();
        });
    }

    const inputSearchAl = document.getElementById('searchAlumnos');
    if (inputSearchAl) {
        inputSearchAl.addEventListener('input', (e) => {
            AdminState.busquedaAlumno = e.target.value;
            renderizarTablaAlumnos();
        });
    }
});

// Exposición global en window para eventos inline HTML y compatibilidad móvil
window.AdminState = AdminState;
window.abrirPanelAdmin = abrirPanelAdmin;
window.volverALanding = volverALanding;
window.abrirPanelEstudianteDesdeAdmin = abrirPanelEstudianteDesdeAdmin;
window.cambiarAdminTab = cambiarAdminTab;
window.cambiarSubpestañaServicios = cambiarSubpestañaServicios;
window.renderizarVistaAdmin = renderizarVistaAdmin;
window.renderizarContadoresDashboard = renderizarContadoresDashboard;
window.renderizarTablaSolicitudes = renderizarTablaSolicitudes;
window.cambiarEstadoSolicitud = cambiarEstadoSolicitud;
window.verDetalleSolicitud = verDetalleSolicitud;
window.cerrarModalDetalle = cerrarModalDetalle;
window.renderizarTablaAlumnos = renderizarTablaAlumnos;
window.alternarRegularidadAlumno = alternarRegularidadAlumno;
window.emitirCertificadoDesdeAdmin = emitirCertificadoDesdeAdmin;
window.renderizarTablaDocentes = renderizarTablaDocentes;
window.renderizarModuloServicios = renderizarModuloServicios;
window.renderizarModuloDeportes = renderizarModuloDeportes;
window.renderizarListaCirculares = renderizarListaCirculares;
window.publicarNuevaCircular = publicarNuevaCircular;
window.abrirModalNuevoAlumno = abrirModalNuevoAlumno;
window.cerrarModalNuevoAlumno = cerrarModalNuevoAlumno;
window.guardarNuevoAlumno = guardarNuevoAlumno;
window.mostrarToast = mostrarToast;
window.setFiltroSolicitudNivel = setFiltroSolicitudNivel;
window.setFiltroSolicitudEstado = setFiltroSolicitudEstado;
window.setFiltroAlumnoNivel = setFiltroAlumnoNivel;
window.actualizarEstilosBotonesFiltro = actualizarEstilosBotonesFiltro;
window.toggleNavAdmin = toggleNavAdmin;
