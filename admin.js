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

    // Alumnos regulares del Centro (Persistencia en Supabase)
    alumnos: [],

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
// CONEXIÓN SINGLETON A SUPABASE
// ====================================================================

function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;
    if (typeof supabase !== 'undefined') {
        const supabaseUrl = 'https://qynsmxiarnanqtxefltu.supabase.co';
        const supabaseKey = 'sb_publishable_iy7O34nEqp_zVcWzet7tCQ_1mGOgGQy';
        window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        return window.supabaseClient;
    }
    return null;
}

// ====================================================================
// MÉTODOS DE CONTROL DE VISTAS Y NAVEGACIÓN
// ====================================================================

/**
 * Abre el Sistema de Gestión (Etapa 2 - Admin Panel) validando rol
 */
async function abrirPanelAdmin() {
    const client = getSupabaseClient();
    if (!client) {
        mostrarToast('No se pudo verificar la sesión. Reintente en unos instantes.', 'error');
        return;
    }

    try {
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            if (typeof window.toggleModal === 'function') {
                window.toggleModal(true);
            }
            mostrarToast('Inicie sesión con su cuenta de Administrador.', 'warning');
            return;
        }

        const { data: perfil, error } = await client
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

        if (error || perfil?.role !== 'admin') {
            alert('Acceso restringido: Esta cuenta no posee permisos de Administrador.');
            return;
        }
    } catch (err) {
        console.error("Error al validar rol de administrador:", err);
        alert('No se pudo verificar el permiso de Administrador.');
        return;
    }

    if (typeof window.cerrarTodosLosDrawersMobile === 'function') {
        window.cerrarTodosLosDrawersMobile();
    }

    const vistaLanding = document.getElementById('vistaLanding');
    const vistaPanel = document.getElementById('vistaPanel');
    const vistaAdmin = document.getElementById('vistaAdmin');

    if (vistaLanding) vistaLanding.classList.add('hidden');
    if (vistaPanel) vistaPanel.classList.add('hidden');
    if (vistaAdmin) {
        vistaAdmin.classList.remove('hidden');
        renderizarVistaAdmin();
        await obtenerSolicitudes();
        await obtenerAlumnos();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarToast('Bienvenido al Sistema de Gestión', 'info');
}

/**
 * Regresa a la Landing Page pública
 */
function volverALanding() {
    if (typeof window.cerrarTodosLosDrawersMobile === 'function') {
        window.cerrarTodosLosDrawersMobile();
    }

    const vistaLanding = document.getElementById('vistaLanding');
    const vistaPanel = document.getElementById('vistaPanel');
    const vistaAdmin = document.getElementById('vistaAdmin');

    if (vistaAdmin) vistaAdmin.classList.add('hidden');
    if (vistaPanel) vistaPanel.classList.add('hidden');
    if (vistaLanding) vistaLanding.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Abre el panel de estudiante desde el admin (vista previa autorizada)
 */
async function abrirPanelEstudianteDesdeAdmin() {
    if (typeof window.cerrarTodosLosDrawersMobile === 'function') {
        window.cerrarTodosLosDrawersMobile();
    }
    const client = getSupabaseClient();
    if (!client) return;

    try {
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            volverALanding();
            return;
        }

        const { data: perfil } = await client
            .from('profiles')
            .select('id, email, role')
            .eq('id', session.user.id)
            .single();

        if (!perfil || (perfil.role !== 'admin' && perfil.role !== 'estudiante')) {
            volverALanding();
            return;
        }

        const vistaLanding = document.getElementById('vistaLanding');
        const vistaPanel = document.getElementById('vistaPanel');
        const vistaAdmin = document.getElementById('vistaAdmin');

        if (vistaAdmin) vistaAdmin.classList.add('hidden');
        if (vistaLanding) vistaLanding.classList.add('hidden');
        if (vistaPanel) vistaPanel.classList.remove('hidden');

        if (typeof window.cambiarTab === 'function') {
            window.cambiarTab('inicio');
        }
        if (typeof window.cargarCampusEstudiante === 'function') {
            await window.cargarCampusEstudiante(session.user, perfil);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
        console.error("Error al abrir vista previa de estudiante:", err);
    }
}

/**
 * Alterna la visibilidad del menú de navegación de administración en móviles (Drawer Lateral)
 */
function toggleNavAdmin(forzarEstado, gestionarFoco = true) {
    const drawer = document.getElementById('drawerNavAdmin');
    const backdrop = document.getElementById('backdropNavAdmin');
    const navMenu = document.getElementById('navAdminMenu');
    const navFooter = document.getElementById('navAdminFooter');
    const btnToggle = document.getElementById('btnToggleNavAdmin');
    const btnCerrar = document.getElementById('btnCerrarNavAdmin');
    if (!navMenu) return;

    const estaAbierto = drawer
        ? drawer.classList.contains('is-open')
        : !navMenu.classList.contains('hidden');
    const abrir = typeof forzarEstado === 'boolean' ? forzarEstado : !estaAbierto;

    if (abrir) {
        if (typeof window.toggleNavLanding === 'function') window.toggleNavLanding(false, false);
        if (typeof window.toggleNavEstudiante === 'function') window.toggleNavEstudiante(false, false);
        navMenu.classList.remove('hidden');
        if (navFooter) navFooter.classList.remove('hidden');
        drawer?.classList.add('is-open');
        backdrop?.classList.add('is-open');
        btnToggle?.setAttribute('aria-expanded', 'true');
        if (typeof window.sincronizarBloqueoScrollDrawer === 'function') {
            window.sincronizarBloqueoScrollDrawer();
        }
        if (gestionarFoco && window.innerWidth < 768) {
            requestAnimationFrame(() => btnCerrar?.focus());
        }
    } else {
        navMenu.classList.add('hidden');
        if (navFooter) navFooter.classList.add('hidden');
        drawer?.classList.remove('is-open');
        backdrop?.classList.remove('is-open');
        btnToggle?.setAttribute('aria-expanded', 'false');
        if (typeof window.sincronizarBloqueoScrollDrawer === 'function') {
            window.sincronizarBloqueoScrollDrawer();
        }
        if (gestionarFoco && estaAbierto && window.innerWidth < 768) {
            requestAnimationFrame(() => btnToggle?.focus());
        }
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
            btn.setAttribute('aria-current', 'page');
        } else {
            btn.classList.remove('bg-blue-800', 'text-white', 'shadow-md');
            btn.classList.add('text-slate-300', 'hover:bg-blue-900/60');
            btn.removeAttribute('aria-current');
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

    // En móviles, cerrar el drawer al seleccionar una opción
    if (window.innerWidth < 768) {
        toggleNavAdmin(false, false);
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

    if (nombreTab === 'solicitudes' || nombreTab === 'dashboard') {
        obtenerSolicitudes();
    }
    if (nombreTab === 'alumnos' || nombreTab === 'dashboard') {
        obtenerAlumnos();
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
/**
 * Obtiene las solicitudes de admisión reales desde Supabase
 */
async function obtenerSolicitudes() {
    const client = getSupabaseClient();
    if (!client) {
        console.warn("Cliente Supabase no inicializado aún.");
        return;
    }

    try {
        const { data, error } = await client
            .from('inscripciones')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error al obtener solicitudes desde Supabase:", error.message);
            mostrarToast("Error al cargar solicitudes: " + error.message, "error");
            return;
        }

        AdminState.solicitudes = (data || []).map(row => ({
            id: row.id,
            nombreAspirante: row.nombre || '',
            nombre: row.nombre || '',
            dni: row.dni || '',
            nivel: row.nivel || '',
            grado: row.nivel || '',
            tutor: row.email ? `Tutor (${row.email.split('@')[0]})` : 'Tutor responsable',
            email: row.email || '',
            telefono: '-',
            mensaje: row.mensaje || 'Sin observaciones.',
            estado: row.estado || 'pendiente',
            created_at: row.created_at
        }));

        renderizarContadoresDashboard();
        renderizarTablaSolicitudes();
    } catch (err) {
        console.error("Fallo inesperado al consultar solicitudes:", err);
    }
}

/**
 * Obtiene la nómina de alumnos matriculados desde Supabase
 */
async function obtenerAlumnos() {
    const client = getSupabaseClient();
    if (!client) {
        console.warn("Cliente Supabase no inicializado aún.");
        return;
    }

    try {
        const { data, error } = await client
            .from('alumnos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error al obtener alumnos de Supabase:", error.message);
            mostrarToast("Error al cargar la nómina de alumnos: " + error.message, "error");
            return;
        }

        AdminState.alumnos = data || [];
        renderizarTablaAlumnos();
        renderizarContadoresDashboard();
    } catch (err) {
        console.error("Fallo inesperado al consultar alumnos:", err);
        mostrarToast("Error inesperado al cargar alumnos.", "error");
    }
}

function renderizarContadoresDashboard() {
    const pendientes = AdminState.solicitudes.filter(s => (s.estado || '').toLowerCase() === 'pendiente').length;
    AdminState.stats.solicitudesPendientes = pendientes;

    const elMatricula = document.getElementById('adminStatMatricula');
    const elSolicitudes = document.getElementById('adminStatSolicitudes');
    const elDocentes = document.getElementById('adminStatDocentes');
    const elMicros = document.getElementById('adminStatMicros');
    const badgePendientesNav = document.getElementById('badgeAdminPendientesNav');

    if (elMatricula) elMatricula.innerText = AdminState.alumnos.length;
    if (elSolicitudes) elSolicitudes.innerText = pendientes;
    if (elDocentes) elDocentes.innerText = AdminState.docentes.length;
    if (elMicros) elMicros.innerText = AdminState.rutasMicros.length;
    if (badgePendientesNav) badgePendientesNav.innerText = pendientes;
}

function escaparHTML(valor) {
    return String(valor ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Renderiza la tabla de Solicitudes de Admisión con filtros y acciones completas
 */
function renderizarTablaSolicitudes() {
    const tbody = document.getElementById('tablaSolicitudesBody');
    if (!tbody) return;

    let lista = AdminState.solicitudes.filter(item => {
        const coincideNivel = AdminState.filtroSolicitudNivel === 'todos' || (item.nivel || '').toLowerCase() === AdminState.filtroSolicitudNivel.toLowerCase();
        const coincideEstado = AdminState.filtroSolicitudEstado === 'todos' || (item.estado || '').toLowerCase() === AdminState.filtroSolicitudEstado.toLowerCase();
        const coincideBusqueda = AdminState.busquedaSolicitud === '' ||
            (item.nombreAspirante || item.nombre || '').toLowerCase().includes(AdminState.busquedaSolicitud.toLowerCase()) ||
            (item.dni || '').includes(AdminState.busquedaSolicitud) ||
            (item.tutor || '').toLowerCase().includes(AdminState.busquedaSolicitud.toLowerCase());
        return coincideNivel && coincideEstado && coincideBusqueda;
    });

    if (lista.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <i class="fas fa-search text-2xl mb-2 block text-slate-400" aria-hidden="true"></i>
                    No se encontraron solicitudes con los filtros aplicados.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = lista.map(sol => {
        const estadoNorm = (sol.estado || 'pendiente').toLowerCase();
        let badgeEstado = '';
        if (estadoNorm === 'pendiente') {
            badgeEstado = '<span class="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase"><i class="fas fa-clock mr-1" aria-hidden="true"></i>Pendiente</span>';
        } else if (estadoNorm === 'aprobada') {
            badgeEstado = '<span class="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase"><i class="fas fa-check-circle mr-1" aria-hidden="true"></i>Aprobada</span>';
        } else {
            badgeEstado = '<span class="bg-red-100 text-red-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase"><i class="fas fa-times-circle mr-1" aria-hidden="true"></i>Rechazada</span>';
        }

        let badgeNivel = '';
        const nivelNorm = (sol.nivel || '').toLowerCase();
        if (nivelNorm === 'inicial') badgeNivel = 'border-l-4 border-green-500';
        else if (nivelNorm === 'primario') badgeNivel = 'border-l-4 border-blue-500';
        else badgeNivel = 'border-l-4 border-purple-500';

        const fechaFormateada = sol.created_at ? new Date(sol.created_at).toLocaleDateString('es-AR') : (sol.fecha || '-');
        const codigo = typeof sol.id === 'number' ? `SOL-${String(sol.id).padStart(4, '0')}` : sol.id;
        const idSeguro = escaparHTML(sol.id);
        const nombreSeguro = escaparHTML(sol.nombreAspirante || sol.nombre);

        return `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition ${badgeNivel}">
                <td class="p-4 font-mono text-[11px] font-bold text-slate-600">${escaparHTML(codigo)}</td>
                <td class="p-4">
                    <p class="font-bold text-slate-800 text-xs break-words">${nombreSeguro}</p>
                    <p class="text-[10px] text-slate-500">DNI: ${escaparHTML(sol.dni)}</p>
                </td>
                <td class="p-4">
                    <span class="font-bold text-xs text-blue-900">${escaparHTML(sol.nivel)}</span>
                    <p class="text-[10px] text-slate-500">${escaparHTML(sol.grado || sol.nivel)}</p>
                </td>
                <td class="p-4">
                    <p class="text-xs font-semibold text-slate-700 break-words">${escaparHTML(sol.tutor)}</p>
                    <p class="text-[10px] text-slate-500 break-all"><i class="fas fa-envelope mr-1" aria-hidden="true"></i>${escaparHTML(sol.email)}</p>
                </td>
                <td class="p-4 text-center">
                    ${badgeEstado}
                </td>
                <td class="p-4 text-[11px] text-slate-600">${escaparHTML(fechaFormateada)}</td>
                <td class="p-4 text-right">
                    <div class="flex justify-end gap-1.5">
                        <button type="button" data-solicitud-action="ver" data-id="${idSeguro}" title="Ver Detalles de Familia" aria-label="Ver detalles de ${nombreSeguro}" class="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs transition min-w-[36px] min-h-[36px] flex items-center justify-center">
                            <i class="fas fa-eye" aria-hidden="true"></i>
                        </button>
                        ${estadoNorm !== 'aprobada' ? `
                            <button type="button" data-solicitud-action="estado" data-estado="aprobada" data-id="${idSeguro}" title="Aprobar Vacante" aria-label="Aprobar vacante de ${nombreSeguro}" class="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs transition min-w-[36px] min-h-[36px] flex items-center justify-center">
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </button>
                        ` : ''}
                        ${estadoNorm !== 'rechazada' ? `
                            <button type="button" data-solicitud-action="estado" data-estado="rechazada" data-id="${idSeguro}" title="Rechazar Vacante" aria-label="Rechazar vacante de ${nombreSeguro}" class="p-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs transition min-w-[36px] min-h-[36px] flex items-center justify-center">
                                <i class="fas fa-times" aria-hidden="true"></i>
                            </button>
                        ` : ''}
                        <button type="button" data-solicitud-action="eliminar" data-id="${idSeguro}" title="Eliminar Solicitud" aria-label="Eliminar solicitud de ${nombreSeguro}" class="p-2 bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-700 rounded-lg text-xs transition min-w-[36px] min-h-[36px] flex items-center justify-center">
                            <i class="fas fa-trash-alt" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Actualiza el estado de una solicitud de admisión de forma persistente en Supabase
 */
async function actualizarEstadoSolicitud(id, nuevoEstado) {
    const client = getSupabaseClient();
    if (!client) return;

    const estadoNormalizado = nuevoEstado.toLowerCase();

    try {
        const { error } = await client
            .from('inscripciones')
            .update({ estado: estadoNormalizado })
            .eq('id', id);

        if (error) {
            console.error("Error al actualizar estado en Supabase:", error.message);
            alert("No se pudo actualizar el estado: " + error.message);
            mostrarToast("Error al actualizar: " + error.message, "error");
            return;
        }

        // Éxito real en base de datos: sincronizar en memoria y re-renderizar
        const solicitud = AdminState.solicitudes.find(s => String(s.id) === String(id));
        if (solicitud) {
            solicitud.estado = estadoNormalizado;
        }

        renderizarContadoresDashboard();
        renderizarTablaSolicitudes();

        if (estadoNormalizado === 'aprobada') {
            mostrarToast("Vacante APROBADA exitosamente en Supabase.", "success");
        } else {
            mostrarToast(`Solicitud actualizada a ${estadoNormalizado} en Supabase.`, "warning");
        }
    } catch (err) {
        console.error("Fallo inesperado al actualizar solicitud:", err);
        alert("Error de conexión al actualizar la solicitud.");
    }
}

/**
 * Elimina una solicitud de admisión de forma persistente en Supabase previa confirmación
 */
async function eliminarSolicitud(id) {
    const confirmar = confirm("¿Está seguro de que desea eliminar permanentemente esta solicitud de admisión? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    const client = getSupabaseClient();
    if (!client) return;

    try {
        const { error } = await client
            .from('inscripciones')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error al eliminar solicitud en Supabase:", error.message);
            alert("No se pudo eliminar la solicitud: " + error.message);
            mostrarToast("Error al eliminar: " + error.message, "error");
            return;
        }

        // Éxito real en base de datos: remover de memoria y re-renderizar
        AdminState.solicitudes = AdminState.solicitudes.filter(s => String(s.id) !== String(id));
        renderizarContadoresDashboard();
        renderizarTablaSolicitudes();
        mostrarToast("Solicitud eliminada correctamente de Supabase.", "success");
    } catch (err) {
        console.error("Fallo inesperado al eliminar solicitud:", err);
        alert("Error de conexión al eliminar la solicitud.");
    }
}

/**
 * Modal para ver detalle completo de la solicitud
 */
function verDetalleSolicitud(id) {
    const sol = AdminState.solicitudes.find(s => String(s.id) === String(id));
    if (!sol) return;

    const modal = document.getElementById('modalDetalleSolicitud');
    const contenido = document.getElementById('contenidoDetalleSolicitud');
    if (!modal || !contenido) return;

    const estadoNorm = (sol.estado || 'pendiente').toLowerCase();
    const badgeClass = estadoNorm === 'aprobada' ? 'bg-emerald-100 text-emerald-800' : (estadoNorm === 'pendiente' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800');
    const codigo = typeof sol.id === 'number' ? `SOL-${String(sol.id).padStart(4, '0')}` : sol.id;
    const idSeguro = escaparHTML(sol.id);

    contenido.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b pr-8">
                <div class="min-w-0">
                    <span class="text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2 py-0.5 rounded">${escaparHTML(codigo)}</span>
                    <h4 class="text-lg font-black text-slate-800 mt-1 break-words">${escaparHTML(sol.nombreAspirante || sol.nombre)}</h4>
                </div>
                <div class="shrink-0">
                    <span class="px-3 py-1 rounded-full text-xs font-bold capitalize ${badgeClass}">
                        ${escaparHTML(estadoNorm)}
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-500 font-bold uppercase text-[9px]">DNI Alumno</p>
                    <p class="font-bold text-slate-800 break-words">${escaparHTML(sol.dni)}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-500 font-bold uppercase text-[9px]">Nivel Solicitado</p>
                    <p class="font-bold text-blue-900 break-words">${escaparHTML(sol.nivel)} - ${escaparHTML(sol.grado || sol.nivel)}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-500 font-bold uppercase text-[9px]">Tutor Responsable</p>
                    <p class="font-bold text-slate-800 break-words">${escaparHTML(sol.tutor || 'No especificado')}</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl">
                    <p class="text-slate-500 font-bold uppercase text-[9px]">Teléfono Contacto</p>
                    <p class="font-bold text-slate-800 break-words">${escaparHTML(sol.telefono || 'No especificado')}</p>
                </div>
            </div>

            <div class="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-xs">
                <p class="text-blue-900 font-bold uppercase text-[10px] mb-1">Email Registrado:</p>
                <p class="text-slate-700 break-all">${escaparHTML(sol.email)}</p>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl text-xs">
                <p class="text-slate-500 font-bold uppercase text-[10px] mb-1">Mensaje de la Familia:</p>
                <p class="text-slate-700 italic break-words">"${escaparHTML(sol.mensaje || 'Sin mensaje adicional')}"</p>
            </div>

            <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 border-t">
                <button type="button" onclick="cerrarModalDetalle()" class="min-h-[44px] px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition">Cerrar</button>
                <button type="button" data-solicitud-action="estado" data-estado="Aprobada" data-id="${idSeguro}" data-close-modal="true" class="min-h-[44px] px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-1.5">
                    <i class="fas fa-check" aria-hidden="true"></i> <span>Aprobar Vacante</span>
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
 * Renderiza la nómina de Alumnos y Cursos (Sincroniza Tabla Desktop y Tarjetas Mobile)
 */
function renderizarTablaAlumnos() {
    const tbody = document.getElementById('tablaAlumnosBody');
    const cardsContainer = document.getElementById('listaAlumnosCards');
    if (!tbody && !cardsContainer) return;

    const termino = (AdminState.busquedaAlumno || '').trim().toLowerCase();
    const lista = AdminState.alumnos.filter(al => {
        const coincideNivel = AdminState.filtroAlumnoNivel === 'todos' || (al.nivel || '').toLowerCase() === AdminState.filtroAlumnoNivel.toLowerCase();
        const coincideBusqueda = termino === '' ||
            (al.nombre || '').toLowerCase().includes(termino) ||
            (al.dni || '').toLowerCase().includes(termino) ||
            (al.legajo || '').toLowerCase().includes(termino) ||
            (al.curso || '').toLowerCase().includes(termino) ||
            (al.nivel || '').toLowerCase().includes(termino);
        return coincideNivel && coincideBusqueda;
    });

    const totalAlumnos = AdminState.alumnos.length;
    const hayFiltroActivo = termino !== '' || AdminState.filtroAlumnoNivel !== 'todos';

    // Mostrar u ocultar botón de limpiar búsqueda
    const btnLimpiar = document.getElementById('btnLimpiarBusquedaAlumnos');
    if (btnLimpiar) {
        if (termino !== '') {
            btnLimpiar.classList.remove('hidden');
            btnLimpiar.classList.add('flex');
        } else {
            btnLimpiar.classList.add('hidden');
            btnLimpiar.classList.remove('flex');
        }
    }

    // Actualizar contador de resultados
    const contadorEl = document.getElementById('contadorAlumnosResultados');
    if (contadorEl) {
        if (hayFiltroActivo) {
            contadorEl.textContent = `Mostrando ${lista.length} de ${totalAlumnos} ${totalAlumnos === 1 ? 'alumno' : 'alumnos'}`;
        } else {
            contadorEl.textContent = `${totalAlumnos} ${totalAlumnos === 1 ? 'alumno matriculado' : 'alumnos matriculados'}`;
        }
    }

    if (lista.length === 0) {
        if (tbody) {
            tbody.innerHTML = hayFiltroActivo ? `
                <tr>
                    <td colspan="7" class="text-center py-10 px-4">
                        <i class="fas fa-search text-2xl text-slate-400 mb-2 block" aria-hidden="true"></i>
                        <p class="text-slate-700 font-bold text-xs uppercase tracking-wider">No se encontraron alumnos para la búsqueda actual.</p>
                        <p class="text-slate-500 text-xs mt-1">Probá con otro nombre, DNI, legajo o curso.</p>
                        <button type="button" onclick="limpiarBusquedaAlumnos()" class="mt-3 inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl transition">
                            <i class="fas fa-times-circle" aria-hidden="true"></i> Limpiar búsqueda
                        </button>
                    </td>
                </tr>
            ` : `
                <tr>
                    <td colspan="7" class="text-center py-10 px-4 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <i class="fas fa-user-graduate text-2xl text-slate-400 mb-2 block" aria-hidden="true"></i>
                        No se encontraron alumnos registrados.
                    </td>
                </tr>
            `;
        }

        if (cardsContainer) {
            cardsContainer.innerHTML = hayFiltroActivo ? `
                <div class="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-search text-lg" aria-hidden="true"></i>
                    </div>
                    <p class="text-slate-800 font-black text-sm">Sin resultados para tu búsqueda</p>
                    <p class="text-slate-600 text-xs mt-1">No hay alumnos que coincidan con el criterio ingresado.</p>
                    <button type="button" onclick="limpiarBusquedaAlumnos()" class="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl transition active:scale-95">
                        <i class="fas fa-times-circle" aria-hidden="true"></i>
                        <span>Limpiar búsqueda</span>
                    </button>
                </div>
            ` : `
                <div class="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
                    <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-user-graduate text-lg" aria-hidden="true"></i>
                    </div>
                    <p class="text-slate-800 font-black text-sm">No se encontraron alumnos registrados</p>
                    <p class="text-slate-600 text-xs mt-1">Utilizá el botón superior para matricular un nuevo alumno en el padrón oficial.</p>
                </div>
            `;
        }
        return;
    }

    if (tbody) {
        tbody.innerHTML = lista.map(al => {
            const initial = escaparHTML(((al.nombre || 'A').trim().charAt(0) || 'A').toUpperCase());
            const legajoSeguro = escaparHTML(al.legajo);
            const nombreSeguro = escaparHTML(al.nombre);
            const condicionActual = al.regularidad || 'Regular';
            const esRegular = condicionActual === 'Regular';
            return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-4 font-mono text-[11px] font-bold text-blue-900 whitespace-nowrap">${legajoSeguro}</td>
                    <td class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                                ${initial}
                            </div>
                            <div class="min-w-0">
                                <p class="font-bold text-slate-800 text-xs break-words">${nombreSeguro}</p>
                                <p class="text-[10px] text-slate-500">DNI: ${escaparHTML(al.dni)}</p>
                            </div>
                        </div>
                    </td>
                    <td class="p-4">
                        <span class="font-bold text-xs text-slate-700 block break-words">${escaparHTML(al.curso)}</span>
                        <span class="block text-[10px] text-slate-500">${escaparHTML(al.nivel)}</span>
                    </td>
                    <td class="p-4">
                        <span class="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">${escaparHTML(al.idioma || 'Sin idioma')}</span>
                        <span class="block text-[10px] text-slate-600 mt-0.5"><i class="fas fa-running mr-1" aria-hidden="true"></i>${escaparHTML(al.deporte || 'Sin deporte')}</span>
                    </td>
                    <td class="p-4 text-center">
                        <button type="button" data-alumno-action="regularidad" data-legajo="${legajoSeguro}" title="Click para alternar condición" aria-label="Alternar condición ${escaparHTML(condicionActual)} de ${nombreSeguro}" class="cursor-pointer text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${esRegular ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                            ${escaparHTML(condicionActual)}
                        </button>
                    </td>
                    <td class="p-4 text-center font-bold text-xs text-slate-700">
                        ${escaparHTML(al.asistencia || '100%')}
                    </td>
                    <td class="p-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button type="button" data-alumno-action="certificado" data-legajo="${legajoSeguro}" aria-label="Emitir certificado de ${nombreSeguro}" class="px-2.5 py-1.5 bg-blue-900 text-white hover:bg-blue-800 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                                <i class="fas fa-file-pdf" aria-hidden="true"></i> <span>Certificado</span>
                            </button>
                            <button type="button" data-alumno-action="eliminar" data-legajo="${legajoSeguro}" title="Dar de baja alumno" aria-label="Dar de baja a ${nombreSeguro}" class="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                                <i class="fas fa-trash-alt" aria-hidden="true"></i> <span>Dar de baja</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    if (cardsContainer) {
        cardsContainer.innerHTML = lista.map(al => {
            const initial = escaparHTML(((al.nombre || 'A').trim().charAt(0) || 'A').toUpperCase());
            const legajoSeguro = escaparHTML(al.legajo);
            const nombreSeguro = escaparHTML(al.nombre);
            const condicionActual = al.regularidad || 'Regular';
            const esRegular = condicionActual === 'Regular';

            return `
                <article class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3.5 transition">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-start gap-3 min-w-0 flex-1">
                            <div class="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
                                ${initial}
                            </div>
                            <div class="min-w-0 flex-1">
                                <span class="inline-block font-mono text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md mb-1 break-all">
                                    ${legajoSeguro}
                                </span>
                                <h4 class="font-black text-slate-900 text-sm leading-snug break-words">
                                    ${nombreSeguro}
                                </h4>
                                <p class="text-xs font-semibold text-slate-600 mt-0.5">
                                    DNI: <span class="font-bold text-slate-800">${escaparHTML(al.dni)}</span>
                                </p>
                            </div>
                        </div>

                        <button type="button"
                            data-alumno-action="regularidad"
                            data-legajo="${legajoSeguro}"
                            title="Toque para alternar condición de regularidad"
                            aria-label="Condición ${escaparHTML(condicionActual)} de ${nombreSeguro}. Toque para cambiar estado"
                            class="shrink-0 min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide flex items-center justify-center gap-1.5 border transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${esRegular ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'}">
                            <span class="w-2 h-2 rounded-full ${esRegular ? 'bg-emerald-600' : 'bg-amber-600'}" aria-hidden="true"></span>
                            <span>${escaparHTML(condicionActual)}</span>
                            <i class="fas fa-sync-alt text-[10px] opacity-70 ml-0.5" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Nivel y Curso</span>
                            <p class="font-bold text-slate-800 mt-0.5 break-words">${escaparHTML(al.nivel || 'Sin nivel')} · ${escaparHTML(al.curso || 'Sin curso')}</p>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Idioma & Deporte</span>
                            <p class="font-bold text-slate-800 mt-0.5 break-words">${escaparHTML(al.idioma || 'Sin idioma')} · ${escaparHTML(al.deporte || 'Sin deporte')}</p>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Tutor Responsable</span>
                            <p class="font-semibold text-slate-700 mt-0.5 break-words">${escaparHTML(al.tutor || 'No especificado')}</p>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Asistencia</span>
                            <p class="font-bold text-emerald-700 mt-0.5">${escaparHTML(al.asistencia || '100%')}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2.5 pt-0.5">
                        <button type="button"
                            data-alumno-action="certificado"
                            data-legajo="${legajoSeguro}"
                            aria-label="Emitir certificado de ${nombreSeguro}"
                            class="min-h-[44px] px-3 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition active:scale-95 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-1">
                            <i class="fas fa-file-pdf text-xs" aria-hidden="true"></i>
                            <span>Certificado</span>
                        </button>
                        <button type="button"
                            data-alumno-action="eliminar"
                            data-legajo="${legajoSeguro}"
                            aria-label="Dar de baja a ${nombreSeguro}"
                            class="min-h-[44px] px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-1">
                            <i class="fas fa-trash-alt text-xs" aria-hidden="true"></i>
                            <span>Dar de baja</span>
                        </button>
                    </div>
                </article>
            `;
        }).join('');
    }
}

function limpiarBusquedaAlumnos() {
    AdminState.busquedaAlumno = '';
    AdminState.filtroAlumnoNivel = 'todos';
    const inputSearchAl = document.getElementById('searchAlumnos');
    if (inputSearchAl) {
        inputSearchAl.value = '';
    }
    renderizarTablaAlumnos();
}

async function alternarRegularidadAlumno(legajo) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;

    const client = getSupabaseClient();
    if (!client) {
        mostrarToast('Cliente de base de datos no disponible.', 'error');
        return;
    }

    const nuevoEstado = (alumno.regularidad === 'Regular') ? 'Condicional' : 'Regular';

    try {
        const { data, error } = await client
            .from('alumnos')
            .update({ regularidad: nuevoEstado })
            .eq('legajo', legajo)
            .select()
            .single();

        if (error) {
            console.error("Error al actualizar regularidad del alumno en Supabase:", error);
            mostrarToast("Error al actualizar regularidad: " + error.message, 'error');
            return;
        }

        alumno.regularidad = nuevoEstado;
        renderizarTablaAlumnos();
        mostrarToast(`Condición de ${alumno.nombre} actualizada a: ${nuevoEstado}`, 'info');
    } catch (err) {
        console.error("Error inesperado al actualizar regularidad:", err);
        mostrarToast("Error inesperado al cambiar condición.", 'error');
    }
}

async function eliminarAlumno(legajo, nombre) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    const nombreConfirm = nombre || alumno?.nombre || legajo;

    if (!confirm(`¿Dar de baja a ${nombreConfirm}?`)) {
        return;
    }

    const client = getSupabaseClient();
    if (!client) {
        mostrarToast('Cliente de base de datos no disponible.', 'error');
        return;
    }

    try {
        const { error } = await client
            .from('alumnos')
            .delete()
            .eq('legajo', legajo);

        if (error) {
            console.error("Error al dar de baja alumno en Supabase:", error);
            mostrarToast("Error al dar de baja: " + error.message, 'error');
            return;
        }

        await obtenerAlumnos();
        mostrarToast(`Alumno ${nombreConfirm} dado de baja exitosamente.`, 'success');
    } catch (err) {
        console.error("Error inesperado al dar de baja alumno:", err);
        mostrarToast("Error inesperado al procesar la baja.", 'error');
    }
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
    if (!modal) {
        console.error('No se encontró #modalNuevoAlumno');
        return;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalNuevoAlumno() {
    const modal = document.getElementById('modalNuevoAlumno');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

async function guardarNuevoAlumno(e) {
    if (e) e.preventDefault();
    const nombre = document.getElementById('matNombre')?.value.trim();
    const dni = document.getElementById('matDni')?.value.trim();
    const nivel = document.getElementById('matNivel')?.value;
    const curso = document.getElementById('matCurso')?.value.trim();
    const tutor = document.getElementById('matTutor')?.value.trim();
    const idioma = document.getElementById('matIdioma')?.value;
    const deporte = document.getElementById('matDeporte')?.value;

    if (!nombre || !dni || !curso || !tutor) {
        mostrarToast('Complete los datos obligatorios del alumno y tutor.', 'warning');
        return;
    }

    const client = getSupabaseClient();
    if (!client) {
        mostrarToast('Error de conexión con la base de datos.', 'error');
        return;
    }

    const nuevoLegajo = `ET-2027-${Date.now()}`;

    try {
        const { data, error } = await client
            .from('alumnos')
            .insert({
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
            })
            .select()
            .single();

        if (error) {
            console.error("Error al matricular alumno en Supabase:", error);
            mostrarToast("Error al matricular alumno: " + error.message, 'error');
            return;
        }

        await obtenerAlumnos();
        cerrarModalNuevoAlumno();

        // Limpiar formulario
        const form = document.querySelector('#modalNuevoAlumno form');
        if (form) form.reset();

        mostrarToast("Alumno matriculado exitosamente", 'success');
    } catch (err) {
        console.error("Error inesperado al guardar alumno:", err);
        mostrarToast("Error inesperado al guardar matrícula.", 'error');
    }
}

// ====================================================================
// COMPONENTE DE NOTIFICACIONES TOAST (MODERNO Y NO BLOQUEANTE)
// ====================================================================

function mostrarToast(mensaje, tipo = 'info') {
    let contenedor = document.getElementById('adminToastContainer');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'adminToastContainer';
        contenedor.setAttribute('role', 'status');
        contenedor.setAttribute('aria-live', 'polite');
        contenedor.setAttribute('aria-atomic', 'true');
        contenedor.className = 'fixed z-[9999] flex flex-col gap-2 pointer-events-none left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))]';
        document.body.appendChild(contenedor);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto transform transition-all duration-300 translate-y-3 opacity-0 flex items-center p-3.5 rounded-xl shadow-xl border text-xs font-bold';

    let icon = 'fa-info-circle';
    let style = 'bg-slate-900 text-white border-slate-700';

    if (tipo === 'success') {
        icon = 'fa-check-circle';
        style = 'bg-emerald-600 text-white border-emerald-500';
    } else if (tipo === 'warning') {
        icon = 'fa-exclamation-triangle';
        style = 'bg-amber-600 text-white border-amber-500';
    } else if (tipo === 'error') {
        icon = 'fa-exclamation-circle';
        style = 'bg-rose-600 text-white border-rose-500';
    } else if (tipo === 'info') {
        icon = 'fa-bell';
        style = 'bg-blue-900 text-white border-blue-700';
    }

    toast.className += ` ${style}`;

    const iconEl = document.createElement('i');
    iconEl.className = `fas ${icon} text-base mr-2.5 shrink-0`;
    iconEl.setAttribute('aria-hidden', 'true');

    const textEl = document.createElement('span');
    textEl.className = 'flex-1 break-words';
    textEl.textContent = String(mensaje ?? '');

    toast.appendChild(iconEl);
    toast.appendChild(textEl);
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

// Inicialización de escuchadores de búsqueda, delegación segura de acciones y teclado
function inicializarListenersAdmin() {
    const inputSearchSol = document.getElementById('searchSolicitudes');
    if (inputSearchSol && !inputSearchSol.dataset.listenerBound) {
        inputSearchSol.dataset.listenerBound = 'true';
        inputSearchSol.addEventListener('input', (e) => {
            AdminState.busquedaSolicitud = e.target.value;
            renderizarTablaSolicitudes();
        });
    }

    const inputSearchAl = document.getElementById('searchAlumnos');
    if (inputSearchAl && !inputSearchAl.dataset.listenerBound) {
        inputSearchAl.dataset.listenerBound = 'true';
        inputSearchAl.addEventListener('input', (e) => {
            AdminState.busquedaAlumno = e.target.value;
            renderizarTablaAlumnos();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarListenersAdmin);
} else {
    inicializarListenersAdmin();
}

// Delegación segura de eventos en DOM para evitar handlers inline con datos de base de datos
document.addEventListener('click', (e) => {
    const btnAlumno = e.target.closest('[data-alumno-action]');
    if (btnAlumno) {
        const action = btnAlumno.getAttribute('data-alumno-action');
        const legajo = btnAlumno.getAttribute('data-legajo');
        if (!legajo) return;

        const alumno = AdminState.alumnos.find(a => String(a.legajo) === String(legajo));
        const nombre = alumno?.nombre || legajo;

        if (action === 'regularidad') {
            alternarRegularidadAlumno(legajo);
        } else if (action === 'certificado') {
            emitirCertificadoDesdeAdmin(legajo, nombre);
        } else if (action === 'eliminar') {
            eliminarAlumno(legajo, nombre);
        }
        return;
    }

    const btnSolicitud = e.target.closest('[data-solicitud-action]');
    if (btnSolicitud) {
        const action = btnSolicitud.getAttribute('data-solicitud-action');
        const id = btnSolicitud.getAttribute('data-id');
        if (!id) return;

        if (action === 'ver') {
            verDetalleSolicitud(id);
        } else if (action === 'estado') {
            const estado = btnSolicitud.getAttribute('data-estado') || 'aprobada';
            actualizarEstadoSolicitud(id, estado);
            if (btnSolicitud.getAttribute('data-close-modal') === 'true') {
                cerrarModalDetalle();
            }
        } else if (action === 'eliminar') {
            eliminarSolicitud(id);
        }
    }
});

// Soporte accesible de teclado (Escape para cerrar modales abiertos)
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const modalAlumno = document.getElementById('modalNuevoAlumno');
    if (modalAlumno && !modalAlumno.classList.contains('hidden')) {
        cerrarModalNuevoAlumno();
        return;
    }
    const modalDetalle = document.getElementById('modalDetalleSolicitud');
    if (modalDetalle && !modalDetalle.classList.contains('hidden')) {
        cerrarModalDetalle();
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
window.cambiarEstadoSolicitud = actualizarEstadoSolicitud;
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
window.obtenerSolicitudes = obtenerSolicitudes;
window.actualizarEstadoSolicitud = actualizarEstadoSolicitud;
window.eliminarSolicitud = eliminarSolicitud;
window.cargarSolicitudesAdmin = obtenerSolicitudes;
window.obtenerAlumnos = obtenerAlumnos;
window.eliminarAlumno = eliminarAlumno;
window.cargarAlumnosAdmin = obtenerAlumnos;
window.limpiarBusquedaAlumnos = limpiarBusquedaAlumnos;
