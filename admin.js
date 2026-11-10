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
    // Si hay una sesión de demostración activa con rol admin, permitir acceso inmediato
    try {
        const sesionDemo = localStorage.getItem('sesion_demo_activa');
        if (sesionDemo) {
            const parsed = JSON.parse(sesionDemo);
            if (parsed.rol === 'admin') {
                const vistaLanding = document.getElementById('vistaLanding');
                const vistaPanel = document.getElementById('vistaPanel');
                const vistaAdmin = document.getElementById('vistaAdmin');

                vistaLanding?.classList.add('hidden');
                vistaPanel?.classList.add('hidden');
                vistaAdmin?.classList.remove('hidden');

                if (typeof window.cerrarTodosLosDrawersMobile === 'function') {
                    window.cerrarTodosLosDrawersMobile();
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });

                await cargarSolicitudesAdmin();
                await obtenerAlumnos();
                return;
            }
        }
    } catch (_) {}

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
            mostrarToast('Acceso restringido: Esta cuenta no posee permisos de Administrador.', 'warning');
            return;
        }
    } catch (err) {
        console.error("Error al validar rol de administrador:", err);
        mostrarToast('No se pudo verificar el permiso de Administrador.', 'error');
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
        circulares: 'Comunicados Oficiales y Circulares',
        tesoreria: 'Tesorería Institucional: Aranceles, Pagos y Recordatorios'
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
    if (nombreTab === 'tesoreria') {
        renderizarModuloTesoreriaAdmin();
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
 * Renderiza la tabla de Solicitudes de Admisión (Desktop >= 768px) y Tarjetas Mobile (< 768px)
 */
function renderizarTablaSolicitudes() {
    const tbody = document.getElementById('tablaSolicitudesBody');
    const cardsContainer = document.getElementById('listaSolicitudesCards');
    if (!tbody && !cardsContainer) return;

    const termino = (AdminState.busquedaSolicitud || '').trim().toLowerCase();
    const lista = AdminState.solicitudes.filter(item => {
        const coincideNivel = AdminState.filtroSolicitudNivel === 'todos' || (item.nivel || '').toLowerCase() === AdminState.filtroSolicitudNivel.toLowerCase();
        const coincideEstado = AdminState.filtroSolicitudEstado === 'todos' || (item.estado || '').toLowerCase() === AdminState.filtroSolicitudEstado.toLowerCase();
        const coincideBusqueda = termino === '' ||
            (item.nombreAspirante || item.nombre || '').toLowerCase().includes(termino) ||
            (item.dni || '').toLowerCase().includes(termino) ||
            (item.tutor || '').toLowerCase().includes(termino) ||
            (item.email || '').toLowerCase().includes(termino);
        return coincideNivel && coincideEstado && coincideBusqueda;
    });

    const totalSolicitudes = AdminState.solicitudes.length;
    const hayFiltroActivo =
        termino !== '' ||
        AdminState.filtroSolicitudNivel !== 'todos' ||
        AdminState.filtroSolicitudEstado !== 'todos';

    // Mostrar u ocultar botón de limpiar búsqueda de solicitudes
    const btnLimpiar = document.getElementById('btnLimpiarBusquedaSolicitudes');
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
    const contadorEl = document.getElementById('contadorSolicitudesResultados');
    if (contadorEl) {
        if (hayFiltroActivo) {
            contadorEl.textContent = `Mostrando ${lista.length} de ${totalSolicitudes} ${totalSolicitudes === 1 ? 'solicitud' : 'solicitudes'}`;
        } else {
            contadorEl.textContent = `${totalSolicitudes} ${totalSolicitudes === 1 ? 'solicitud registrada' : 'solicitudes registradas'}`;
        }
    }

    if (lista.length === 0) {
        if (tbody) {
            tbody.innerHTML = hayFiltroActivo ? `
                <tr>
                    <td colspan="7" class="text-center py-8 px-4 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <i class="fas fa-search text-2xl mb-2 block text-slate-400" aria-hidden="true"></i>
                        <p>No se encontraron solicitudes con los filtros aplicados.</p>
                        <button type="button" onclick="limpiarBusquedaSolicitudes()" class="mt-3 inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl transition">
                            <i class="fas fa-times-circle" aria-hidden="true"></i> Restablecer filtros
                        </button>
                    </td>
                </tr>
            ` : `
                <tr>
                    <td colspan="7" class="text-center py-8 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <i class="fas fa-inbox text-2xl mb-2 block text-slate-400" aria-hidden="true"></i>
                        No se encontraron solicitudes registradas.
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
                    <p class="text-slate-800 font-black text-sm">Sin solicitudes para este filtro</p>
                    <p class="text-slate-600 text-xs mt-1">No hay postulaciones que coincidan con el nivel, estado o búsqueda actual.</p>
                    <button type="button" onclick="limpiarBusquedaSolicitudes()" class="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl transition active:scale-95">
                        <i class="fas fa-times-circle" aria-hidden="true"></i>
                        <span>Restablecer filtros</span>
                    </button>
                </div>
            ` : `
                <div class="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
                    <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-inbox text-lg" aria-hidden="true"></i>
                    </div>
                    <p class="text-slate-800 font-black text-sm">No hay solicitudes de admisión</p>
                    <p class="text-slate-600 text-xs mt-1">Las postulaciones enviadas desde el formulario público aparecerán aquí.</p>
                </div>
            `;
        }
        return;
    }

    if (tbody) {
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

    if (cardsContainer) {
        cardsContainer.innerHTML = lista.map(sol => {
            const nombreBase = sol.nombreAspirante || sol.nombre || 'Aspirante';
            const initial = escaparHTML((nombreBase.trim().charAt(0) || 'A').toUpperCase());
            const estadoNorm = (sol.estado || 'pendiente').toLowerCase();
            const fechaFormateada = sol.created_at ? new Date(sol.created_at).toLocaleDateString('es-AR') : (sol.fecha || '-');
            const codigo = typeof sol.id === 'number' ? `SOL-${String(sol.id).padStart(4, '0')}` : sol.id;
            const idSeguro = escaparHTML(sol.id);
            const nombreSeguro = escaparHTML(nombreBase);

            let badgeEstadoMobile = '';
            if (estadoNorm === 'pendiente') {
                badgeEstadoMobile = `
                    <span class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200">
                        <span class="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true"></span>
                        <span>Pendiente</span>
                    </span>`;
            } else if (estadoNorm === 'aprobada') {
                badgeEstadoMobile = `
                    <span class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span class="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true"></span>
                        <span>Aprobada</span>
                    </span>`;
            } else {
                badgeEstadoMobile = `
                    <span class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wide bg-rose-50 text-rose-800 border border-rose-200">
                        <span class="w-2 h-2 rounded-full bg-rose-600" aria-hidden="true"></span>
                        <span>Rechazada</span>
                    </span>`;
            }

            const yaAprobada = estadoNorm === 'aprobada';
            const yaRechazada = estadoNorm === 'rechazada';

            return `
                <article class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3.5 transition">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-start gap-3 min-w-0 flex-1">
                            <div class="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
                                ${initial}
                            </div>
                            <div class="min-w-0 flex-1">
                                <span class="inline-block font-mono text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md mb-1 break-all">
                                    ${escaparHTML(codigo)}
                                </span>
                                <h4 class="font-black text-slate-900 text-sm leading-snug break-words">
                                    ${nombreSeguro}
                                </h4>
                                <p class="text-xs font-semibold text-slate-600 mt-0.5">
                                    DNI: <span class="font-bold text-slate-800">${escaparHTML(sol.dni || 'No registrado')}</span>
                                </p>
                            </div>
                        </div>

                        ${badgeEstadoMobile}
                    </div>

                    <div class="grid grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Nivel Solicitado</span>
                            <p class="font-bold text-blue-900 mt-0.5 break-words">${escaparHTML(sol.nivel || 'Sin nivel')}</p>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Fecha de Postulación</span>
                            <p class="font-bold text-slate-800 mt-0.5">${escaparHTML(fechaFormateada)}</p>
                        </div>
                        <div class="min-w-0 col-span-2">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Tutor y Contacto Principal</span>
                            <p class="font-semibold text-slate-800 mt-0.5 break-words">${escaparHTML(sol.tutor || 'Tutor responsable')}</p>
                            <p class="text-[11px] text-slate-600 mt-0.5 break-all">
                                <i class="fas fa-envelope mr-1 text-blue-700" aria-hidden="true"></i>${escaparHTML(sol.email || 'Sin correo')}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-0.5">
                        <button type="button"
                            data-solicitud-action="ver"
                            data-id="${idSeguro}"
                            aria-label="Ver detalle de ${nombreSeguro}"
                            class="min-h-[44px] min-w-[44px] px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition active:scale-95 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900">
                            <i class="fas fa-eye text-xs" aria-hidden="true"></i>
                            <span>Ver detalle</span>
                        </button>
                        <button type="button"
                            data-solicitud-action="estado"
                            data-estado="aprobada"
                            data-id="${idSeguro}"
                            ${yaAprobada ? 'disabled aria-disabled="true"' : ''}
                            aria-label="Aprobar solicitud de ${nombreSeguro}"
                            class="min-h-[44px] min-w-[44px] px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${yaAprobada ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200 opacity-60 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-95'}">
                            <i class="fas fa-check text-xs" aria-hidden="true"></i>
                            <span>${yaAprobada ? 'Aprobada' : 'Aprobar'}</span>
                        </button>
                        <button type="button"
                            data-solicitud-action="estado"
                            data-estado="rechazada"
                            data-id="${idSeguro}"
                            ${yaRechazada ? 'disabled aria-disabled="true"' : ''}
                            aria-label="Rechazar solicitud de ${nombreSeguro}"
                            class="min-h-[44px] min-w-[44px] px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${yaRechazada ? 'bg-amber-100/70 text-amber-800 border border-amber-200 opacity-60 cursor-not-allowed' : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 active:scale-95'}">
                            <i class="fas fa-times text-xs" aria-hidden="true"></i>
                            <span>${yaRechazada ? 'Rechazada' : 'Rechazar'}</span>
                        </button>
                        <button type="button"
                            data-solicitud-action="eliminar"
                            data-id="${idSeguro}"
                            aria-label="Eliminar solicitud de ${nombreSeguro}"
                            class="min-h-[44px] min-w-[44px] px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition active:scale-95 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600">
                            <i class="fas fa-trash-alt text-xs" aria-hidden="true"></i>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </article>
            `;
        }).join('');
    }
}

function limpiarBusquedaSolicitudes() {
    AdminState.busquedaSolicitud = '';
    AdminState.filtroSolicitudNivel = 'todos';
    AdminState.filtroSolicitudEstado = 'todos';

    const inputSearchSol = document.getElementById('searchSolicitudes');
    if (inputSearchSol) {
        inputSearchSol.value = '';
    }

    const btnNivelTodos = document.querySelector('.btn-filtro-sol-nivel');
    if (btnNivelTodos) {
        actualizarEstilosBotonesFiltro('.btn-filtro-sol-nivel', btnNivelTodos);
    }

    const btnEstadoTodos = document.querySelector('.btn-filtro-sol-estado');
    if (btnEstadoTodos) {
        actualizarEstilosBotonesFiltro('.btn-filtro-sol-estado', btnEstadoTodos);
    }

    renderizarTablaSolicitudes();
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
            mostrarToast("No se pudo actualizar el estado: " + error.message, "error");
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
        mostrarToast("Error de conexión al actualizar la solicitud.", "error");
    }
}

/**
 * Elimina una solicitud de admisión de forma persistente en Supabase previa confirmación
 */
async function eliminarSolicitud(id) {
    const sol = AdminState.solicitudes.find(s => String(s.id) === String(id));
    const nombreAspirante = sol?.nombreAspirante || sol?.nombre || 'esta solicitud';

    const confirmar = await pedirConfirmacionModal({
        titulo: '¿Eliminar solicitud de admisión?',
        mensaje: `¿Está seguro de eliminar permanentemente la solicitud de ${nombreAspirante}? Esta acción no se puede deshacer.`,
        textoConfirmar: 'Eliminar',
        textoCancelar: 'Cancelar',
        peligroso: true
    });
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
            mostrarToast("No se pudo eliminar la solicitud: " + error.message, "error");
            return;
        }

        // Éxito real en base de datos: remover de memoria y re-renderizar
        AdminState.solicitudes = AdminState.solicitudes.filter(s => String(s.id) !== String(id));
        renderizarContadoresDashboard();
        renderizarTablaSolicitudes();
        mostrarToast("Solicitud eliminada correctamente de Supabase.", "success");
    } catch (err) {
        console.error("Fallo inesperado al eliminar solicitud:", err);
        mostrarToast("Error de conexión al eliminar la solicitud.", "error");
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

    const confirmar = await pedirConfirmacionModal({
        titulo: '¿Dar de baja alumno?',
        mensaje: `¿Confirma la baja de ${nombreConfirm} (${legajo}) del padrón oficial?`,
        textoConfirmar: 'Dar de baja',
        textoCancelar: 'Cancelar',
        peligroso: true
    });
    if (!confirmar) return;

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
// MODAL DE CONFIRMACIÓN ACCESIBLE (REEMPLAZA WINDOW.CONFIRM)
// ====================================================================

function pedirConfirmacionModal({
    titulo = '¿Confirmar acción?',
    mensaje = '¿Está seguro de continuar? Esta acción no se puede deshacer.',
    textoConfirmar = 'Confirmar',
    textoCancelar = 'Cancelar',
    peligroso = true
} = {}) {
    return new Promise((resolve) => {
        const modal = document.getElementById('modalConfirmacionGenerica');
        const titEl = document.getElementById('modalConfirmacionTitulo');
        const msgEl = document.getElementById('modalConfirmacionMensaje');
        const btnAceptar = document.getElementById('btnModalConfirmacionAceptar');
        const btnCancelar = document.getElementById('btnModalConfirmacionCancelar');
        const iconEl = document.getElementById('modalConfirmacionIcono');

        if (!modal || !btnAceptar || !btnCancelar) {
            resolve(true);
            return;
        }

        if (titEl) titEl.textContent = titulo;
        if (msgEl) msgEl.textContent = mensaje;
        if (btnAceptar) {
            btnAceptar.textContent = textoConfirmar;
            if (peligroso) {
                btnAceptar.className = 'min-h-[44px] px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-xs transition active:scale-95 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600';
                if (iconEl) iconEl.className = 'w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-xl shadow-sm';
            } else {
                btnAceptar.className = 'min-h-[44px] px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-xl text-xs transition active:scale-95 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900';
                if (iconEl) iconEl.className = 'w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto text-xl shadow-sm';
            }
        }
        if (btnCancelar) btnCancelar.textContent = textoCancelar;

        const limpiar = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.removeEventListener('keydown', onKeyDown);
            btnAceptar.onclick = null;
            btnCancelar.onclick = null;
            modal.onclick = null;
        };

        const onAceptar = () => {
            limpiar();
            resolve(true);
        };

        const onCancelar = () => {
            limpiar();
            resolve(false);
        };

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onCancelar();
            }
        };

        btnAceptar.onclick = onAceptar;
        btnCancelar.onclick = onCancelar;
        modal.onclick = (e) => {
            if (e.target === modal) onCancelar();
        };
        document.addEventListener('keydown', onKeyDown);

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        requestAnimationFrame(() => btnCancelar?.focus());
    });
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
        contenedor.className = 'fixed z-[10050] flex flex-col gap-2 pointer-events-none left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm top-[max(0.75rem,calc(env(safe-area-inset-top)+0.5rem))] sm:top-auto bottom-auto sm:bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))]';
        contenedor.style.zIndex = '10050';
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
window.limpiarBusquedaSolicitudes = limpiarBusquedaSolicitudes;
window.pedirConfirmacionModal = pedirConfirmacionModal;

// ========================================================
// MÓDULO DE TESORERÍA, PAGOS Y RECORDATORIOS (RÚBRICA PARCIAL)
// ========================================================
// ====================================================================
// MÓDULO OFICIAL DE TESORERÍA, COBRANZAS Y LOS 5 LISTADOS DE RÚBRICA
// ====================================================================

const AdminTesoreria = {
    reporteActivo: 'ingresos',
    filtroPeriodo: 'todos',
    filtroCurso: 'todos',
    filtroDeporte: 'todos',
    filtroNivel: 'todos',
    filtroProfesor: 'todos',
    filtroRecorrido: 'todos',
    busqueda: '',
    cobroSeleccionadoId: null,

    // Destinatarios para Funcionalidad 1 (Recordatorio Fin de Mes con Desglose y Factura)
    destinatariosFinMes: [
        {
            tutor: 'Mariana Gómez de Acosta',
            email: 'mariana.acosta@gmail.com',
            alumno: 'Ignacio Benjamín Acosta',
            legajo: 'EPT-2026-001',
            curso: '3° Año "A" Secundario',
            base: 85000,
            idioma: 18000,
            idiomaDesc: 'Inglés Avanzado / Francés',
            deporte: 15000,
            deporteDesc: 'Natación y Vóley',
            comedor: 28000,
            transporte: 22000,
            transporteDesc: 'Línea 1 Norte',
            bonificacion: 8500,
            total: 159500
        },
        {
            tutor: 'Valeria Soledad Benítez',
            email: 'valeria.benitez@gmail.com',
            alumno: 'Tomás Valentín Benítez',
            legajo: 'EPT-2026-042',
            curso: '4to Grado "B" Primario',
            base: 75000,
            idioma: 14000,
            idiomaDesc: 'Inglés Inicial',
            deporte: 15000,
            deporteDesc: 'Básquetbol',
            comedor: 28000,
            transporte: 0,
            transporteDesc: 'Sin transporte',
            bonificacion: 7500,
            total: 124500
        },
        {
            tutor: 'Romina Vesconi',
            email: 'romi.vesconi@outlook.com',
            alumno: 'Mateo Bosch Vesconi',
            legajo: 'ET-2026-003',
            curso: 'Sala de 5 Años Inicial',
            base: 65000,
            idioma: 12000,
            idiomaDesc: 'Inglés Lúdico',
            deporte: 15000,
            deporteDesc: 'Gimnasia y Natación',
            comedor: 28000,
            transporte: 22000,
            transporteDesc: 'Línea 1 Norte',
            bonificacion: 6500,
            total: 135500
        },
        {
            tutor: 'Marcos Esquivel',
            email: 'marcos.esquivel@chaco.edu.ar',
            alumno: 'Lucía Milagros Esquivel',
            legajo: 'ALU-001',
            curso: '1er Año "C" Secundario',
            base: 85000,
            idioma: 18000,
            idiomaDesc: 'Inglés / Francés',
            deporte: 15000,
            deporteDesc: 'Atletismo',
            comedor: 0,
            transporte: 22000,
            transporteDesc: 'Línea 3 Este',
            bonificacion: 8500,
            total: 131500
        },
        {
            tutor: 'Jorge Fernández',
            email: 'jorge.fernandez@gmail.com',
            alumno: 'Camila Da Silva Fernández',
            legajo: 'EPT-2026-0119',
            curso: 'Sala de 4 Años Inicial',
            base: 65000,
            idioma: 12000,
            idiomaDesc: 'Inglés Lúdico',
            deporte: 15000,
            deporteDesc: 'Natación Inicial',
            comedor: 28000,
            transporte: 0,
            transporteDesc: 'Sin transporte',
            bonificacion: 6500,
            total: 113500
        }
    ],

    // Listado 1: Ingresos por Período de Tiempo (Marzo a Noviembre 2026)
    listadoIngresos: [
        { periodo: 'Marzo 2026', cuotasEmitidas: 48, completas: 48, incompletas: 0, ingresos: 1620000, deuda: 0, porcentaje: '100%', estado: 'Cerrado' },
        { periodo: 'Abril 2026', cuotasEmitidas: 48, completas: 48, incompletas: 0, ingresos: 1620000, deuda: 0, porcentaje: '100%', estado: 'Cerrado' },
        { periodo: 'Mayo 2026', cuotasEmitidas: 48, completas: 48, incompletas: 0, ingresos: 1620000, deuda: 0, porcentaje: '100%', estado: 'Cerrado' },
        { periodo: 'Junio 2026', cuotasEmitidas: 48, completas: 48, incompletas: 0, ingresos: 1650000, deuda: 0, porcentaje: '100%', estado: 'Cerrado' },
        { periodo: 'Julio 2026', cuotasEmitidas: 48, completas: 48, incompletas: 0, ingresos: 1650000, deuda: 0, porcentaje: '100%', estado: 'Cerrado' },
        { periodo: 'Agosto 2026', cuotasEmitidas: 48, completas: 48, incompletas: 0, ingresos: 1650000, deuda: 0, porcentaje: '100%', estado: 'Cerrado' },
        { periodo: 'Septiembre 2026', cuotasEmitidas: 48, completas: 47, incompletas: 1, ingresos: 1615000, deuda: 35000, porcentaje: '97.9%', estado: 'Cerrado' },
        { periodo: 'Octubre 2026', cuotasEmitidas: 48, completas: 40, incompletas: 5, ingresos: 1380000, deuda: 270000, porcentaje: '83.3%', estado: 'Mora Día 20' },
        { periodo: 'Noviembre 2026', cuotasEmitidas: 48, completas: 14, incompletas: 34, ingresos: 445000, deuda: 1215000, porcentaje: '26.8%', estado: 'En Término (10% Desc.)' }
    ],

    // Listado 2: Pagos Completos Realizados por Período de Tiempo y Alumno
    listadoCompletos: [
        {
            id: 'COMP-001',
            periodo: 'Octubre 2026',
            anioCurso: '3° Año "A" Secundario',
            alumnoNombre: 'Ignacio Benjamín Acosta',
            legajo: 'EPT-2026-001',
            dni: '45.123.456',
            fechaPago: '08/10/2026',
            numeroRecibo: 'REC-2026-10-0012',
            composicion: 'Arancel ($85k) + Idioma ($18k) + Deporte ($15k) + Comedor ($28k) + Transp. ($22k) - Desc. ($8.5k)',
            montoTotal: 159500,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-002',
            periodo: 'Octubre 2026',
            anioCurso: '4° Grado "B" Primario',
            alumnoNombre: 'Tomás Valentín Benítez',
            legajo: 'EPT-2026-042',
            dni: '48.921.340',
            fechaPago: '09/10/2026',
            numeroRecibo: 'REC-2026-10-0042',
            composicion: 'Arancel ($75k) + Idioma ($14k) + Deporte ($15k) + Comedor ($28k) - Desc. ($7.5k)',
            montoTotal: 124500,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-003',
            periodo: 'Octubre 2026',
            anioCurso: '1° Año "C" Secundario',
            alumnoNombre: 'Lucía Milagros Esquivel',
            legajo: 'ALU-001',
            dni: '47.112.980',
            fechaPago: '07/10/2026',
            numeroRecibo: 'REC-2026-10-0019',
            composicion: 'Arancel ($85k) + Idioma ($18k) + Deporte ($15k) + Transp. ($22k) - Desc. ($8.5k)',
            montoTotal: 131500,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-004',
            periodo: 'Octubre 2026',
            anioCurso: 'Sala de 5 Años Inicial',
            alumnoNombre: 'Mateo Bosch Vesconi',
            legajo: 'ET-2026-003',
            dni: '52.880.145',
            fechaPago: '06/10/2026',
            numeroRecibo: 'REC-2026-10-0005',
            composicion: 'Arancel ($65k) + Idioma ($12k) + Deporte ($15k) + Comedor ($28k) + Transp. ($22k) - Desc. ($6.5k)',
            montoTotal: 135500,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-005',
            periodo: 'Octubre 2026',
            anioCurso: '5° Grado "B" Primario',
            alumnoNombre: 'Lucía Pérez',
            legajo: 'EPT-2026-0042',
            dni: '49.120.440',
            fechaPago: '09/10/2026',
            numeroRecibo: 'REC-2026-10-0078',
            composicion: 'Arancel ($75k) + Natación ($15k) + Idioma ($14k) + Transp. ($22k)',
            montoTotal: 126000,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-006',
            periodo: 'Octubre 2026',
            anioCurso: '2° Año "B" Secundario',
            alumnoNombre: 'Lucas Romero',
            legajo: 'EPT-2026-0063',
            dni: '46.780.120',
            fechaPago: '08/10/2026',
            numeroRecibo: 'REC-2026-10-0091',
            composicion: 'Arancel ($85k) + Alemán ($18k) + Natación ($15k) + Transp. ($22k)',
            montoTotal: 140000,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-007',
            periodo: 'Octubre 2026',
            anioCurso: '6° Grado "C" Primario',
            alumnoNombre: 'Martina Silva',
            legajo: 'EPT-2026-0034',
            dni: '48.330.900',
            fechaPago: '10/10/2026',
            numeroRecibo: 'REC-2026-10-0104',
            composicion: 'Arancel ($75k) + Francés ($14k) + Atletismo ($15k) + Comedor ($28k)',
            montoTotal: 132000,
            estado: 'PAGO COMPLETO'
        },
        {
            id: 'COMP-008',
            periodo: 'Octubre 2026',
            anioCurso: '3° Grado "A" Primario',
            alumnoNombre: 'Joaquín Ignacio Gómez',
            legajo: 'EPT-2026-0018',
            dni: '50.114.776',
            fechaPago: '05/10/2026',
            numeroRecibo: 'REC-2026-10-0023',
            composicion: 'Arancel ($75k) + Fútbol ($15k) + Transp. ($22k) - Desc. ($7.5k)',
            montoTotal: 104500,
            estado: 'PAGO COMPLETO'
        }
    ],

    // Listado 3: Pagos Incompletos Realizados por Período y Familias con Deuda
    listadoIncompletos: [
        {
            id: 'INC-001',
            periodo: 'Octubre 2026',
            anioCurso: '2° Año "A" Secundario',
            alumnoNombre: 'Bruno Valenzuela',
            legajo: 'EPT-2026-0088',
            dni: '46.220.890',
            tutorNombre: 'Carlos Valenzuela',
            tutorEmail: 'carlos.valenzuela@gmail.com',
            montoTotal: 118000,
            montoAbonado: 0,
            saldoPendiente: 118000,
            recargoMora: 5900,
            estado: 'PAGO INCOMPLETO'
        },
        {
            id: 'INC-002',
            periodo: 'Octubre 2026',
            anioCurso: '4° Grado "B" Primario',
            alumnoNombre: 'Valentina Morales',
            legajo: 'EPT-2026-0054',
            dni: '49.880.112',
            tutorNombre: 'Andrea Morales',
            tutorEmail: 'andrea.morales@gmail.com',
            montoTotal: 116000,
            montoAbonado: 50000,
            saldoPendiente: 66000,
            recargoMora: 3300,
            estado: 'PAGO INCOMPLETO'
        },
        {
            id: 'INC-003',
            periodo: 'Octubre 2026',
            anioCurso: 'Sala de 5 Años Inicial',
            alumnoNombre: 'Santiago Giménez',
            legajo: 'EPT-2026-0022',
            dni: '52.110.340',
            tutorNombre: 'Esteban Giménez',
            tutorEmail: 'esteban.gimenez@gmail.com',
            montoTotal: 87000,
            montoAbonado: 0,
            saldoPendiente: 87000,
            recargoMora: 4350,
            estado: 'PAGO INCOMPLETO'
        },
        {
            id: 'INC-004',
            periodo: 'Octubre 2026',
            anioCurso: '3° Año "B" Secundario',
            alumnoNombre: 'Joaquín Ramos',
            legajo: 'EPT-2026-0071',
            dni: '45.890.334',
            tutorNombre: 'Patricia Ramos',
            tutorEmail: 'patricia.ramos@gmail.com',
            montoTotal: 125000,
            montoAbonado: 60000,
            saldoPendiente: 65000,
            recargoMora: 3250,
            estado: 'PAGO INCOMPLETO'
        },
        {
            id: 'INC-005',
            periodo: 'Octubre 2026',
            anioCurso: '6° Grado "A" Primario',
            alumnoNombre: 'Camila Benítez',
            legajo: 'EPT-2026-0033',
            dni: '48.900.215',
            tutorNombre: 'Martín Benítez',
            tutorEmail: 'martin.benitez@gmail.com',
            montoTotal: 110000,
            montoAbonado: 40000,
            saldoPendiente: 70000,
            recargoMora: 3500,
            estado: 'PAGO INCOMPLETO'
        }
    ],

    // Listado 4: Pagos por Alumnos por Deporte, Nivel, Horario y Profesor
    listadoDeportes: [
        { id: 'DEP-001', alumnoNombre: 'Ignacio Benjamín Acosta', legajo: 'EPT-2026-001', nivel: 'Secundario', curso: '3° Año "A"', deporte: 'Natación', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-002', alumnoNombre: 'Sofía Agustina Romero', legajo: 'EPT-2026-0004', nivel: 'Secundario', curso: '3° Año "A"', deporte: 'Vóley', horario: 'Mar y Jue 16:30 a 18:00 hs', profesor: 'Prof. Lucas Silva', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-003', alumnoNombre: 'Tomás Valentín Benítez', legajo: 'EPT-2026-042', nivel: 'Primario', curso: '4° Grado "B"', deporte: 'Básquet', horario: 'Mar y Jue 15:00 a 16:30 hs', profesor: 'Prof. Marcelo Gómez', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-004', alumnoNombre: 'Lucía Milagros Esquivel', legajo: 'ALU-001', nivel: 'Secundario', curso: '1° Año "C"', deporte: 'Natación', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-005', alumnoNombre: 'Joaquín Ignacio Gómez', legajo: 'EPT-2026-0018', nivel: 'Primario', curso: '3° Grado "A"', deporte: 'Fútbol', horario: 'Mar y Jue 08:30 a 10:00 hs', profesor: 'Prof. Marcelo Gómez', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-006', alumnoNombre: 'Mateo Bosch Vesconi', legajo: 'ET-2026-003', nivel: 'Inicial', curso: 'Sala de 5 Años', deporte: 'Gimnasia Artística', horario: 'Mar y Jue 10:00 a 11:30 hs', profesor: 'Prof. Elena Martínez', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-007', alumnoNombre: 'Bruno Valenzuela', legajo: 'EPT-2026-0088', nivel: 'Secundario', curso: '2° Año "A"', deporte: 'Fútbol', horario: 'Lun y Mié 17:30 a 19:00 hs', profesor: 'Prof. Marcelo Gómez', monto: 15000, estadoPago: 'Pago Incompleto' },
        { id: 'DEP-008', alumnoNombre: 'Valentina Morales', legajo: 'EPT-2026-0054', nivel: 'Primario', curso: '4° Grado "B"', deporte: 'Hockey', horario: 'Lun y Mié 15:00 a 16:30 hs', profesor: 'Prof. Daniela Ríos', monto: 15000, estadoPago: 'Pago Incompleto' },
        { id: 'DEP-009', alumnoNombre: 'Lucas Romero', legajo: 'EPT-2026-0063', nivel: 'Secundario', curso: '2° Año "B"', deporte: 'Natación', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000, estadoPago: 'Pagado' },
        { id: 'DEP-010', alumnoNombre: 'Martina Silva', legajo: 'EPT-2026-0034', nivel: 'Primario', curso: '6° Grado "C"', deporte: 'Ajedrez', horario: 'Sáb 10:00 a 12:00 hs', profesor: 'Prof. Alejandro Rossi', monto: 15000, estadoPago: 'Pagado' }
    ],

    // Listado 5: Pagos por Alumnos por Recorrido del Servicio de Transporte
    listadoTransporte: [
        { id: 'TRA-001', alumnoNombre: 'Ignacio Benjamín Acosta', legajo: 'EPT-2026-001', curso: '3° Año "A" Secundario', recorrido: 'Línea 1 - Zona Norte', parada: 'Av. Sarmiento y Av. Laprida', horario: '07:15 hs / 17:30 hs', movilChofer: 'Móvil 03 - Chofer: Roberto Benítez (AF 234 JK)', monto: 22000, estadoPago: 'Pagado' },
        { id: 'TRA-002', alumnoNombre: 'Lucía Milagros Esquivel', legajo: 'ALU-001', curso: '1° Año "C" Secundario', recorrido: 'Línea 3 - Zona Centro', parada: 'Av. 25 de Mayo 850', horario: '07:25 hs / 17:20 hs', movilChofer: 'Móvil 08 - Chofer: Mario Soto (AD 456 OP)', monto: 22000, estadoPago: 'Pagado' },
        { id: 'TRA-003', alumnoNombre: 'Mateo Bosch Vesconi', legajo: 'ET-2026-003', curso: 'Sala de 5 Años Inicial', recorrido: 'Línea 1 - Zona Norte', parada: 'Los Troncos • Calle 4 N° 320', horario: '08:00 hs / 16:45 hs', movilChofer: 'Móvil 03 - Chofer: Roberto Benítez (AF 234 JK)', monto: 22000, estadoPago: 'Pagado' },
        { id: 'TRA-004', alumnoNombre: 'Lucas Romero', legajo: 'EPT-2026-0063', curso: '2° Año "B" Secundario', recorrido: 'Línea 2 - Zona Sur', parada: 'Av. Castelli 1250', horario: '07:10 hs / 17:35 hs', movilChofer: 'Móvil 05 - Chofer: Claudio Peralta (AE 890 LM)', monto: 22000, estadoPago: 'Pagado' },
        { id: 'TRA-005', alumnoNombre: 'Joaquín Ignacio Gómez', legajo: 'EPT-2026-0018', curso: '3° Grado "A" Primario', recorrido: 'Línea 4 - Zona Este / Fontana', parada: 'Av. Alvear y Santa María de Oro', horario: '07:20 hs / 17:25 hs', movilChofer: 'Móvil 02 - Chofer: Aníbal Silva (AG 112 RS)', monto: 22000, estadoPago: 'Pagado' },
        { id: 'TRA-006', alumnoNombre: 'Bruno Valenzuela', legajo: 'EPT-2026-0088', curso: '2° Año "A" Secundario', recorrido: 'Línea 2 - Zona Sur', parada: 'Hospital Perrando • Entrada Este', horario: '07:30 hs / 17:15 hs', movilChofer: 'Móvil 05 - Chofer: Claudio Peralta (AE 890 LM)', monto: 22000, estadoPago: 'Pago Incompleto' },
        { id: 'TRA-007', alumnoNombre: 'Valentina Morales', legajo: 'EPT-2026-0054', curso: '4° Grado "B" Primario', recorrido: 'Línea 3 - Zona Centro', parada: 'Plaza 25 de Mayo • Esquina Güemes', horario: '07:35 hs / 17:10 hs', movilChofer: 'Móvil 08 - Chofer: Mario Soto (AD 456 OP)', monto: 22000, estadoPago: 'Pago Incompleto' }
    ]
};

// ====================================================================
// FUNCIONALIDAD 1: RECORDATORIO FIN DE MES (MODAL, DESGLOSE Y PDF)
// ====================================================================

function abrirModalRecordatorioFinMes() {
    actualizarPrevisualizacionFinMes(0);
    const modal = document.getElementById('modalRecordatorioFinMes');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function cerrarModalRecordatorioFinMes() {
    const modal = document.getElementById('modalRecordatorioFinMes');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function actualizarPrevisualizacionFinMes(indice) {
    const d = AdminTesoreria.destinatariosFinMes[Number(indice)] || AdminTesoreria.destinatariosFinMes[0];
    if (!d) return;

    const emailEl = document.getElementById('mailPreviewDestinatario');
    const tutorEl = document.getElementById('mailPreviewNombreTutor');
    const alumnoEl = document.getElementById('mailPreviewNombreAlumno');
    const legajoCursoEl = document.getElementById('mailPreviewLegajoCurso');
    const totalEl = document.getElementById('mailPreviewTotalAbonar');
    const conceptosEl = document.getElementById('mailPreviewDesgloseConceptos');

    if (emailEl) emailEl.textContent = d.email;
    if (tutorEl) tutorEl.textContent = d.tutor;
    if (alumnoEl) alumnoEl.textContent = d.alumno;
    if (legajoCursoEl) legajoCursoEl.textContent = `Legajo: ${d.legajo} • ${d.curso}`;
    if (totalEl) totalEl.textContent = `$ ${d.total.toLocaleString('es-AR')}`;

    if (conceptosEl) {
        conceptosEl.innerHTML = `
            <div class="flex justify-between"><span>(+) Arancel Base (${escaparHTML(d.curso.split(' ')[0])}):</span><span class="font-bold">$ ${d.base.toLocaleString('es-AR')}</span></div>
            <div class="flex justify-between"><span>(+) Cuota de Idioma (${escaparHTML(d.idiomaDesc)}):</span><span class="font-bold">$ ${d.idioma.toLocaleString('es-AR')}</span></div>
            <div class="flex justify-between"><span>(+) Arancel de Deporte (${escaparHTML(d.deporteDesc)}):</span><span class="font-bold">$ ${d.deporte.toLocaleString('es-AR')}</span></div>
            ${d.comedor > 0 ? `<div class="flex justify-between"><span>(+) Servicio de Comedor y Nutrición:</span><span class="font-bold">$ ${d.comedor.toLocaleString('es-AR')}</span></div>` : ''}
            ${d.transporte > 0 ? `<div class="flex justify-between"><span>(+) Recorrido Transporte (${escaparHTML(d.transporteDesc)}):</span><span class="font-bold">$ ${d.transporte.toLocaleString('es-AR')}</span></div>` : ''}
            <div class="flex justify-between text-emerald-700"><span>(-) Bonificación Especial Pago en Término (10%):</span><span class="font-bold">-$ ${d.bonificacion.toLocaleString('es-AR')}</span></div>
        `;
    }

    // Actualizar datos de previsualización de factura oficial
    const facTutor = document.getElementById('facturaTutorNombre');
    const facAlumno = document.getElementById('facturaAlumnoNombre');
    const facLegajo = document.getElementById('facturaLegajoCurso');
    if (facTutor) facTutor.textContent = d.tutor;
    if (facAlumno) facAlumno.textContent = d.alumno;
    if (facLegajo) facLegajo.textContent = `Legajo: ${d.legajo} • ${d.curso}`;
}

function abrirModalPrevisualizarFacturaAdjunta() {
    const modal = document.getElementById('modalPrevisualizarFacturaAdjunta');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function cerrarModalPrevisualizarFacturaAdjunta() {
    const modal = document.getElementById('modalPrevisualizarFacturaAdjunta');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function ejecutarEnvioRecordatorioFinMes() {
    cerrarModalRecordatorioFinMes();
    mostrarToast('📧 ¡Recordatorio de Fin de Mes despachado exitosamente a 48 familias con desglose y factura adjunta!', 'success');
}

// ====================================================================
// FUNCIONALIDAD 2: AVISO DÍA 20 POR DEUDA Y PAGO INCOMPLETO
// ====================================================================

function abrirModalAvisoDia20() {
    renderizarTablaDeudoresDia20();
    const modal = document.getElementById('modalAvisoDia20');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function cerrarModalAvisoDia20() {
    const modal = document.getElementById('modalAvisoDia20');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function renderizarTablaDeudoresDia20() {
    const tbody = document.getElementById('tablaDeudoresDia20Body');
    if (!tbody) return;

    tbody.innerHTML = AdminTesoreria.listadoIncompletos.map(inc => {
        const saldoFinal = inc.saldoPendiente + inc.recargoMora;
        return `
            <tr class="hover:bg-slate-50 transition">
                <td class="p-3">
                    <p class="font-bold text-slate-900">${escaparHTML(inc.tutorNombre)}</p>
                    <p class="text-[10px] text-slate-500 font-mono">${escaparHTML(inc.tutorEmail)}</p>
                </td>
                <td class="p-3">
                    <p class="font-bold text-slate-800">${escaparHTML(inc.alumnoNombre)}</p>
                    <p class="text-[10px] text-slate-500">${escaparHTML(inc.anioCurso)}</p>
                </td>
                <td class="p-3 text-right font-mono font-bold text-slate-700">$ ${inc.montoTotal.toLocaleString('es-AR')}</td>
                <td class="p-3 text-right font-mono font-bold text-emerald-700">$ ${inc.montoAbonado.toLocaleString('es-AR')}</td>
                <td class="p-3 text-right font-mono font-bold text-rose-700">$ ${inc.saldoPendiente.toLocaleString('es-AR')}</td>
                <td class="p-3 text-right font-mono font-bold text-amber-700">+$ ${inc.recargoMora.toLocaleString('es-AR')}</td>
                <td class="p-3 text-center">
                    <button type="button" onclick="enviarAvisoIndividualDia20('${escaparHTML(inc.tutorEmail)}', '${escaparHTML(inc.tutorNombre)}')"
                        class="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition active:scale-95 shadow-sm">
                        Reclamar Mail
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function enviarAvisoIndividualDia20(email, nombre) {
    mostrarToast(`⚠️ Intimación de deuda y recargo del 5% enviada a ${nombre} (${email})`, 'warning');
}

function ejecutarEnvioAvisoDia20() {
    cerrarModalAvisoDia20();
    mostrarToast('⚠️ Intimaciones del Día 20 enviadas a todos los tutores con saldo impago (recargo 5% aplicado).', 'warning');
}

// ====================================================================
// COMPLETAR PAGO / COBRAR SALDO EN LISTADO 3 (EN VIVO ANTE LA DOCENTE)
// ====================================================================

function abrirModalCobrarSaldo(incompletoId) {
    const inc = AdminTesoreria.listadoIncompletos.find(i => String(i.id) === String(incompletoId));
    if (!inc) return;

    AdminTesoreria.cobroSeleccionadoId = incompletoId;

    const alEl = document.getElementById('cobroAlumnoNombre');
    const curEl = document.getElementById('cobroAlumnoCurso');
    const tutEl = document.getElementById('cobroTutorNombre');
    const totEl = document.getElementById('cobroImporteTotal');
    const aboEl = document.getElementById('cobroMontoAbonado');
    const salEl = document.getElementById('cobroSaldoPendiente');

    if (alEl) alEl.textContent = `${inc.alumnoNombre} (${inc.legajo})`;
    if (curEl) curEl.textContent = inc.anioCurso;
    if (tutEl) tutEl.textContent = inc.tutorNombre;
    if (totEl) totEl.textContent = `$ ${inc.montoTotal.toLocaleString('es-AR')}`;
    if (aboEl) aboEl.textContent = `$ ${inc.montoAbonado.toLocaleString('es-AR')}`;
    if (salEl) salEl.textContent = `$ ${inc.saldoPendiente.toLocaleString('es-AR')}`;

    const modal = document.getElementById('modalCobrarSaldoIncompleto');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function cerrarModalCobrarSaldo() {
    const modal = document.getElementById('modalCobrarSaldoIncompleto');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    AdminTesoreria.cobroSeleccionadoId = null;
}

function confirmarCobroSaldoIncompleto() {
    const incId = AdminTesoreria.cobroSeleccionadoId;
    if (!incId) return;

    const idx = AdminTesoreria.listadoIncompletos.findIndex(i => String(i.id) === String(incId));
    if (idx === -1) return;

    const inc = AdminTesoreria.listadoIncompletos[idx];
    const medioCobro = document.getElementById('selectMedioCobroSaldo')?.value || 'Efectivo en Caja Tesorería';

    // Crear registro en Pagos Completos
    const nuevoCompleto = {
        id: `COMP-${Date.now()}`,
        periodo: inc.periodo,
        anioCurso: inc.anioCurso,
        alumnoNombre: inc.alumnoNombre,
        legajo: inc.legajo,
        dni: inc.dni || '45.000.000',
        fechaPago: new Date().toLocaleDateString('es-AR'),
        numeroRecibo: `REC-2026-10-${Math.floor(1000 + Math.random() * 9000)}`,
        composicion: `Cobro de Saldo Restante (${medioCobro})`,
        montoTotal: inc.montoTotal,
        estado: 'PAGO COMPLETO'
    };

    // Agregar a Completos y quitar de Incompletos
    AdminTesoreria.listadoCompletos.unshift(nuevoCompleto);
    AdminTesoreria.listadoIncompletos.splice(idx, 1);

    // Actualizar contador en tarjeta KPI
    const statMora = document.getElementById('adminStatMoraCantidad');
    if (statMora) {
        statMora.textContent = `${AdminTesoreria.listadoIncompletos.length} Alumnos`;
    }

    cerrarModalCobrarSaldo();
    renderizarReporteTesoreria(AdminTesoreria.reporteActivo);

    mostrarToast(`¡Cobro de saldo completado! ${inc.alumnoNombre} regularizó su situación y fue transferido a Pagos Completos.`, 'success');
}

// ====================================================================
// RENDERIZADO DINÁMICO DE LOS 5 LISTADOS DE RÚBRICA
// ====================================================================

function cambiarReporteTesoreria(tipo) {
    AdminTesoreria.reporteActivo = tipo;

    const botones = {
        ingresos: document.getElementById('btnReporteIngresos'),
        completos: document.getElementById('btnReporteCompletos'),
        incompletos: document.getElementById('btnReporteIncompletos'),
        deportes: document.getElementById('btnReporteDeportes'),
        transporte: document.getElementById('btnReporteTransporte')
    };

    const titulos = {
        ingresos: 'Listado 1: Ingresos por Período de Tiempo',
        completos: 'Listado 2: Pagos Completos por Año / Curso y Alumno',
        incompletos: 'Listado 3: Pagos Incompletos y Cobro de Saldos',
        deportes: 'Listado 4: Pagos por Deporte, Nivel, Horario y Profesor',
        transporte: 'Listado 5: Pagos por Recorrido del Servicio de Transporte'
    };

    const label = document.getElementById('labelReporteActivo');
    if (label && titulos[tipo]) {
        label.textContent = titulos[tipo];
    }

    Object.entries(botones).forEach(([k, btn]) => {
        if (!btn) return;
        const esActivo = k === tipo;
        if (esActivo) {
            btn.className = 'btn-reporte-tesoreria min-h-[44px] px-3 py-2.5 rounded-xl text-xs font-bold transition bg-blue-900 text-white shadow-sm flex items-center gap-1.5 active:scale-95 text-left';
        } else {
            btn.className = 'btn-reporte-tesoreria min-h-[44px] px-3 py-2.5 rounded-xl text-xs font-bold transition bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 active:scale-95 text-left';
        }
    });

    renderizarReporteTesoreria(tipo);
}

function filtrarReporteTesoreria(campo, valor) {
    AdminTesoreria[campo] = valor;
    renderizarReporteTesoreria(AdminTesoreria.reporteActivo);
}

function renderizarModuloTesoreriaAdmin() {
    renderizarReporteTesoreria(AdminTesoreria.reporteActivo);
}

function renderizarReporteTesoreria(tipo) {
    const contenedor = document.getElementById('contenedorReporteTesoreria');
    if (!contenedor) return;

    // ========================================================
    // LISTADO 1: INGRESOS POR PERÍODO DE TIEMPO
    // ========================================================
    if (tipo === 'ingresos') {
        const ingresos = AdminTesoreria.listadoIngresos;
        const totalIngresos = ingresos.reduce((a, b) => a + b.ingresos, 0);
        const totalDeuda = ingresos.reduce((a, b) => a + b.deuda, 0);

        contenedor.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                        <h4 class="font-black text-slate-900 text-sm sm:text-base">Listado 1: Ingresos por Período de Tiempo</h4>
                        <p class="text-xs text-slate-500">Evolución mensual de facturación oficial, cobranzas y porcentajes de cumplimiento.</p>
                    </div>
                    <span class="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                        Total Percibido: $ ${totalIngresos.toLocaleString('es-AR')}
                    </span>
                </div>

                <!-- Barra de Filtros del Listado 1 -->
                <div class="flex flex-wrap gap-2.5 items-center p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                    <span class="font-bold text-slate-700 uppercase text-[10px]">Filtros de Período:</span>
                    <select onchange="filtrarReporteTesoreria('filtroPeriodo', this.value)" class="p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-900">
                        <option value="todos">Ciclo Lectivo Completo (Marzo - Noviembre 2026)</option>
                        <option value="1sem">1° Semestre (Marzo a Julio)</option>
                        <option value="2sem">2° Semestre (Agosto a Noviembre)</option>
                    </select>
                </div>

                <!-- Tabla Desktop -->
                <div class="hidden md:block overflow-x-auto border border-slate-200 rounded-xl">
                    <table class="w-full text-left text-xs text-slate-700">
                        <thead>
                            <tr class="bg-slate-100 text-[11px] font-black uppercase text-slate-600 border-b">
                                <th class="p-3">Período / Mes</th>
                                <th class="p-3 text-center">Cuotas Emitidas</th>
                                <th class="p-3 text-center">Pagos Completos</th>
                                <th class="p-3 text-center">Incompletos / Parciales</th>
                                <th class="p-3 text-right">Ingresos Percibidos ($ ARS)</th>
                                <th class="p-3 text-right">Deuda Pendiente ($ ARS)</th>
                                <th class="p-3 text-center">% Cobranza</th>
                                <th class="p-3 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-sans">
                            ${ingresos.map(r => `
                                <tr class="hover:bg-slate-50/80 transition">
                                    <td class="p-3 font-bold text-slate-900">${escaparHTML(r.periodo)}</td>
                                    <td class="p-3 text-center font-mono">${r.cuotasEmitidas} cuotas</td>
                                    <td class="p-3 text-center font-bold text-emerald-700 font-mono">${r.completas}</td>
                                    <td class="p-3 text-center font-bold text-amber-700 font-mono">${r.incompletas}</td>
                                    <td class="p-3 text-right font-mono font-bold text-slate-900">$ ${r.ingresos.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-right font-mono font-bold text-rose-700">$ ${r.deuda.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-center font-mono font-bold text-blue-900">${r.porcentaje}</td>
                                    <td class="p-3 text-center">
                                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.deuda === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                                            ${escaparHTML(r.estado)}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr class="bg-slate-100 font-bold border-t-2 border-slate-300">
                                <td class="p-3 uppercase text-slate-800">Totales Acumulados:</td>
                                <td class="p-3 text-center font-mono">432 cuotas</td>
                                <td class="p-3 text-center font-mono text-emerald-700">388 completas</td>
                                <td class="p-3 text-center font-mono text-amber-700">44 parciales</td>
                                <td class="p-3 text-right font-mono text-emerald-900 text-sm">$ ${totalIngresos.toLocaleString('es-AR')}</td>
                                <td class="p-3 text-right font-mono text-rose-900 text-sm">$ ${totalDeuda.toLocaleString('es-AR')}</td>
                                <td class="p-3 text-center font-mono text-blue-900">89.8%</td>
                                <td class="p-3 text-center">—</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Tarjetas Mobile (< 768px) -->
                <div class="grid grid-cols-1 gap-3 md:hidden">
                    ${ingresos.map(r => `
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <div class="flex justify-between items-center pb-2 border-b border-slate-200">
                                <span class="font-black text-slate-900 text-sm">${escaparHTML(r.periodo)}</span>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${r.deuda === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${escaparHTML(r.estado)}</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-[11px]">
                                <div><span class="text-slate-500">Cobradas:</span> <strong class="text-emerald-700">${r.completas}</strong> / ${r.cuotasEmitidas}</div>
                                <div><span class="text-slate-500">Incompletas:</span> <strong class="text-amber-700">${r.incompletas}</strong></div>
                                <div><span class="text-slate-500">Percibido:</span> <strong class="font-mono text-slate-900">$ ${r.ingresos.toLocaleString('es-AR')}</strong></div>
                                <div><span class="text-slate-500">Deuda:</span> <strong class="font-mono text-rose-700">$ ${r.deuda.toLocaleString('es-AR')}</strong></div>
                            </div>
                            <div class="pt-1 border-t border-slate-200 flex justify-between font-bold text-blue-900">
                                <span>Porcentaje de Cobranza:</span>
                                <span>${r.porcentaje}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return;
    }

    // ========================================================
    // LISTADO 2: PAGOS COMPLETOS POR AÑO Y ALUMNO
    // ========================================================
    if (tipo === 'completos') {
        const busq = (AdminTesoreria.busqueda || '').toLowerCase();
        const cursoFiltro = AdminTesoreria.filtroCurso || 'todos';

        const filtrados = AdminTesoreria.listadoCompletos.filter(item => {
            const coincideBusq = !busq ||
                item.alumnoNombre.toLowerCase().includes(busq) ||
                item.legajo.toLowerCase().includes(busq) ||
                item.dni.includes(busq);
            const coincideCurso = cursoFiltro === 'todos' || item.anioCurso.toLowerCase().includes(cursoFiltro.toLowerCase());
            return coincideBusq && coincideCurso;
        });

        contenedor.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                        <h4 class="font-black text-slate-900 text-sm sm:text-base">Listado 2: Pagos Completos Realizados por Período y Alumno</h4>
                        <p class="text-xs text-slate-500">Alumnos con cuota cancelada en conformidad, discriminados por año, curso y comprobante.</p>
                    </div>
                    <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                        ${filtrados.length} Pagos Completos Registrados
                    </span>
                </div>

                <!-- Barra de Filtros y Búsqueda -->
                <div class="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                    <div class="relative flex-1">
                        <i class="fas fa-search absolute left-3 top-3 text-slate-400" aria-hidden="true"></i>
                        <input type="text" placeholder="Buscar por alumno, legajo o DNI..." value="${escaparHTML(AdminTesoreria.busqueda)}"
                            oninput="filtrarReporteTesoreria('busqueda', this.value)"
                            class="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-900 min-h-[38px]">
                    </div>
                    <select onchange="filtrarReporteTesoreria('filtroCurso', this.value)" class="p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-900 min-h-[38px]">
                        <option value="todos" ${cursoFiltro === 'todos' ? 'selected' : ''}>Todos los Años / Cursos</option>
                        <option value="Secundario" ${cursoFiltro === 'Secundario' ? 'selected' : ''}>Nivel Secundario</option>
                        <option value="Primario" ${cursoFiltro === 'Primario' ? 'selected' : ''}>Nivel Primario</option>
                        <option value="Inicial" ${cursoFiltro === 'Inicial' ? 'selected' : ''}>Nivel Inicial</option>
                    </select>
                </div>

                <!-- Tabla Desktop -->
                <div class="hidden md:block overflow-x-auto border border-slate-200 rounded-xl">
                    <table class="w-full text-left text-xs text-slate-700">
                        <thead>
                            <tr class="bg-slate-100 text-[11px] font-black uppercase text-slate-600 border-b">
                                <th class="p-3">Período</th>
                                <th class="p-3">Año / Curso</th>
                                <th class="p-3">Alumno (Nombre y Legajo)</th>
                                <th class="p-3">DNI</th>
                                <th class="p-3">Fecha de Pago</th>
                                <th class="p-3">N.º Recibo</th>
                                <th class="p-3 text-right">Importe Abonado</th>
                                <th class="p-3 text-center">Estado</th>
                                <th class="p-3 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${filtrados.map(item => `
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="p-3 font-semibold text-slate-800">${escaparHTML(item.periodo)}</td>
                                    <td class="p-3 font-bold text-blue-950">${escaparHTML(item.anioCurso)}</td>
                                    <td class="p-3">
                                        <p class="font-bold text-slate-900">${escaparHTML(item.alumnoNombre)}</p>
                                        <p class="text-[10px] text-slate-500 font-mono">${escaparHTML(item.legajo)}</p>
                                    </td>
                                    <td class="p-3 font-mono text-slate-600">${escaparHTML(item.dni)}</td>
                                    <td class="p-3 text-slate-600">${escaparHTML(item.fechaPago)}</td>
                                    <td class="p-3 font-mono font-bold text-blue-900">${escaparHTML(item.numeroRecibo)}</td>
                                    <td class="p-3 text-right font-mono font-bold text-slate-900">$ ${item.montoTotal.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-center">
                                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            PAGO COMPLETO
                                        </span>
                                    </td>
                                    <td class="p-3 text-center">
                                        <button type="button" onclick="mostrarToast('Visualizando recibo oficial ${escaparHTML(item.numeroRecibo)} para ${escaparHTML(item.alumnoNombre)}', 'info')"
                                            class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition active:scale-95">
                                            Ver Recibo
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Tarjetas Mobile (< 768px) -->
                <div class="grid grid-cols-1 gap-3 md:hidden">
                    ${filtrados.map(item => `
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                            <div class="flex justify-between items-start pb-2 border-b border-slate-100">
                                <div>
                                    <p class="font-black text-slate-900 text-sm">${escaparHTML(item.alumnoNombre)}</p>
                                    <p class="text-[10px] font-mono text-slate-500">${escaparHTML(item.legajo)} • DNI: ${escaparHTML(item.dni)}</p>
                                </div>
                                <span class="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">PAGO COMPLETO</span>
                            </div>
                            <div class="space-y-1 text-[11px] text-slate-600">
                                <div><span class="text-slate-500">Curso:</span> <strong>${escaparHTML(item.anioCurso)}</strong></div>
                                <div><span class="text-slate-500">Período:</span> ${escaparHTML(item.periodo)} • Pagado el ${escaparHTML(item.fechaPago)}</div>
                                <div><span class="text-slate-500">Recibo:</span> <code class="font-mono font-bold text-blue-900">${escaparHTML(item.numeroRecibo)}</code></div>
                                <div class="pt-1 flex justify-between font-bold text-slate-900 text-xs">
                                    <span>Total Abonado:</span>
                                    <span class="font-mono text-sm">$ ${item.montoTotal.toLocaleString('es-AR')}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return;
    }

    // ========================================================
    // LISTADO 3: PAGOS INCOMPLETOS Y COBRO DE SALDOS
    // ========================================================
    if (tipo === 'incompletos') {
        const busq = (AdminTesoreria.busqueda || '').toLowerCase();
        const filtrados = AdminTesoreria.listadoIncompletos.filter(item => {
            return !busq ||
                item.alumnoNombre.toLowerCase().includes(busq) ||
                item.legajo.toLowerCase().includes(busq) ||
                item.tutorNombre.toLowerCase().includes(busq);
        });

        const deudaTotal = filtrados.reduce((a, b) => a + b.saldoPendiente, 0);

        contenedor.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                        <h4 class="font-black text-rose-900 text-sm sm:text-base">Listado 3: Pagos Incompletos Realizados por Período y Alumno</h4>
                        <p class="text-xs text-slate-500">Familias con cuota impaga o pago parcial. Permite completar el cobro en vivo y transferir el alumno a Pagos Completos.</p>
                    </div>
                    <span class="text-xs font-bold font-mono text-rose-800 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 self-start sm:self-auto">
                        Deuda Total: $ ${deudaTotal.toLocaleString('es-AR')}
                    </span>
                </div>

                <!-- Buscador -->
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div class="relative">
                        <i class="fas fa-search absolute left-3 top-3 text-slate-400" aria-hidden="true"></i>
                        <input type="text" placeholder="Buscar por alumno, legajo o tutor..." value="${escaparHTML(AdminTesoreria.busqueda)}"
                            oninput="filtrarReporteTesoreria('busqueda', this.value)"
                            class="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-rose-500 min-h-[38px]">
                    </div>
                </div>

                <!-- Tabla Desktop -->
                <div class="hidden md:block overflow-x-auto border border-rose-200 rounded-xl">
                    <table class="w-full text-left text-xs text-slate-700">
                        <thead>
                            <tr class="bg-rose-50/80 text-[11px] font-black uppercase text-rose-950 border-b border-rose-200">
                                <th class="p-3">Período</th>
                                <th class="p-3">Año / Curso</th>
                                <th class="p-3">Alumno (Nombre y Legajo)</th>
                                <th class="p-3">Tutor Responsable</th>
                                <th class="p-3 text-right">Importe Cuota</th>
                                <th class="p-3 text-right">Monto Abonado</th>
                                <th class="p-3 text-right">Saldo Pendiente</th>
                                <th class="p-3 text-center">Estado</th>
                                <th class="p-3 text-center">Acción Interactiva</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${filtrados.map(item => `
                                <tr class="hover:bg-rose-50/40 transition">
                                    <td class="p-3 font-semibold text-slate-800">${escaparHTML(item.periodo)}</td>
                                    <td class="p-3 font-bold text-slate-900">${escaparHTML(item.anioCurso)}</td>
                                    <td class="p-3">
                                        <p class="font-bold text-slate-900">${escaparHTML(item.alumnoNombre)}</p>
                                        <p class="text-[10px] text-slate-500 font-mono">${escaparHTML(item.legajo)}</p>
                                    </td>
                                    <td class="p-3">
                                        <p class="font-semibold text-slate-800">${escaparHTML(item.tutorNombre)}</p>
                                        <p class="text-[10px] text-slate-500 font-mono">${escaparHTML(item.tutorEmail)}</p>
                                    </td>
                                    <td class="p-3 text-right font-mono font-bold text-slate-700">$ ${item.montoTotal.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-right font-mono font-bold text-emerald-700">$ ${item.montoAbonado.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-right font-mono font-black text-rose-700 text-sm">$ ${item.saldoPendiente.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-center">
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-900 border border-rose-200">
                                            PAGO INCOMPLETO
                                        </span>
                                    </td>
                                    <td class="p-3 text-center">
                                        <button type="button" onclick="abrirModalCobrarSaldo('${item.id}')"
                                            class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition active:scale-95 shadow flex items-center gap-1 mx-auto">
                                            <i class="fas fa-hand-holding-usd text-amber-300"></i>
                                            <span>Cobrar Saldo</span>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Tarjetas Mobile (< 768px) -->
                <div class="grid grid-cols-1 gap-3 md:hidden">
                    ${filtrados.map(item => `
                        <div class="bg-white p-4 rounded-xl border border-rose-200 shadow-sm space-y-2.5 text-xs">
                            <div class="flex justify-between items-start pb-2 border-b border-rose-100">
                                <div>
                                    <p class="font-black text-slate-900 text-sm">${escaparHTML(item.alumnoNombre)}</p>
                                    <p class="text-[10px] font-mono text-slate-500">${escaparHTML(item.legajo)} • ${escaparHTML(item.anioCurso)}</p>
                                </div>
                                <span class="px-2 py-0.5 rounded text-[9px] font-black bg-rose-100 text-rose-900 border border-rose-200">PAGO INCOMPLETO</span>
                            </div>
                            <div class="space-y-1 text-[11px] text-slate-700">
                                <div><span class="text-slate-500">Tutor:</span> <strong>${escaparHTML(item.tutorNombre)}</strong> (${escaparHTML(item.tutorEmail)})</div>
                                <div class="flex justify-between"><span>Total Cuota:</span> <span class="font-mono font-bold">$ ${item.montoTotal.toLocaleString('es-AR')}</span></div>
                                <div class="flex justify-between"><span>Abonado Parcial:</span> <span class="font-mono font-bold text-emerald-700">$ ${item.montoAbonado.toLocaleString('es-AR')}</span></div>
                                <div class="flex justify-between border-t border-rose-100 pt-1 font-bold text-rose-900 text-xs">
                                    <span>Saldo Restante Adeudado:</span>
                                    <span class="font-mono text-sm">$ ${item.saldoPendiente.toLocaleString('es-AR')}</span>
                                </div>
                            </div>
                            <button type="button" onclick="abrirModalCobrarSaldo('${item.id}')"
                                class="w-full min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition active:scale-95 shadow flex items-center justify-center gap-1.5 mt-2">
                                <i class="fas fa-cash-register text-amber-300"></i>
                                <span>💳 Completar Pago / Cobrar Saldo</span>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return;
    }

    // ========================================================
    // LISTADO 4: PAGOS POR DEPORTE, NIVEL, HORARIO Y PROFESOR
    // ========================================================
    if (tipo === 'deportes') {
        const deporteFiltro = AdminTesoreria.filtroDeporte || 'todos';
        const nivelFiltro = AdminTesoreria.filtroNivel || 'todos';
        const profFiltro = AdminTesoreria.filtroProfesor || 'todos';

        const filtrados = AdminTesoreria.listadoDeportes.filter(item => {
            const matchDep = deporteFiltro === 'todos' || item.deporte === deporteFiltro;
            const matchNiv = nivelFiltro === 'todos' || item.nivel === nivelFiltro;
            const matchProf = profFiltro === 'todos' || item.profesor === profFiltro;
            return matchDep && matchNiv && matchProf;
        });

        contenedor.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                        <h4 class="font-black text-slate-900 text-sm sm:text-base">Listado 4: Pagos de Alumnos por Deporte, Nivel, Horario y Profesor a Cargo</h4>
                        <p class="text-xs text-slate-500">Arancel deportivo adicional de $ 15.000/mes por disciplina extracurricular.</p>
                    </div>
                    <span class="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 self-start sm:self-auto">
                        ${filtrados.length} Registros Deportivos
                    </span>
                </div>

                <!-- Filtros Combinables del Listado 4 -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                    <div>
                        <label class="block text-[10px] font-black uppercase text-slate-600 mb-1">Deporte:</label>
                        <select onchange="filtrarReporteTesoreria('filtroDeporte', this.value)" class="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-900 min-h-[38px]">
                            <option value="todos">Todos los Deportes</option>
                            <option value="Natación" ${deporteFiltro === 'Natación' ? 'selected' : ''}>Natación</option>
                            <option value="Fútbol" ${deporteFiltro === 'Fútbol' ? 'selected' : ''}>Fútbol</option>
                            <option value="Vóley" ${deporteFiltro === 'Vóley' ? 'selected' : ''}>Vóley</option>
                            <option value="Básquet" ${deporteFiltro === 'Básquet' ? 'selected' : ''}>Básquet</option>
                            <option value="Hockey" ${deporteFiltro === 'Hockey' ? 'selected' : ''}>Hockey</option>
                            <option value="Gimnasia Artística" ${deporteFiltro === 'Gimnasia Artística' ? 'selected' : ''}>Gimnasia Artística</option>
                            <option value="Ajedrez" ${deporteFiltro === 'Ajedrez' ? 'selected' : ''}>Ajedrez</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase text-slate-600 mb-1">Nivel Educativo:</label>
                        <select onchange="filtrarReporteTesoreria('filtroNivel', this.value)" class="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-900 min-h-[38px]">
                            <option value="todos">Todos los Niveles</option>
                            <option value="Secundario" ${nivelFiltro === 'Secundario' ? 'selected' : ''}>Nivel Secundario</option>
                            <option value="Primario" ${nivelFiltro === 'Primario' ? 'selected' : ''}>Nivel Primario</option>
                            <option value="Inicial" ${nivelFiltro === 'Inicial' ? 'selected' : ''}>Nivel Inicial</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase text-slate-600 mb-1">Profesor a Cargo:</label>
                        <select onchange="filtrarReporteTesoreria('filtroProfesor', this.value)" class="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-900 min-h-[38px]">
                            <option value="todos">Todos los Profesores</option>
                            <option value="Prof. Lucas Silva" ${profFiltro === 'Prof. Lucas Silva' ? 'selected' : ''}>Prof. Lucas Silva</option>
                            <option value="Prof. Marcelo Gómez" ${profFiltro === 'Prof. Marcelo Gómez' ? 'selected' : ''}>Prof. Marcelo Gómez</option>
                            <option value="Prof. Daniela Ríos" ${profFiltro === 'Prof. Daniela Ríos' ? 'selected' : ''}>Prof. Daniela Ríos</option>
                            <option value="Prof. Elena Martínez" ${profFiltro === 'Prof. Elena Martínez' ? 'selected' : ''}>Prof. Elena Martínez</option>
                            <option value="Prof. Alejandro Rossi" ${profFiltro === 'Prof. Alejandro Rossi' ? 'selected' : ''}>Prof. Alejandro Rossi</option>
                        </select>
                    </div>
                </div>

                <!-- Tabla Desktop -->
                <div class="hidden md:block overflow-x-auto border border-slate-200 rounded-xl">
                    <table class="w-full text-left text-xs text-slate-700">
                        <thead>
                            <tr class="bg-slate-100 text-[11px] font-black uppercase text-slate-600 border-b">
                                <th class="p-3">Alumno (Nombre y Legajo)</th>
                                <th class="p-3">Nivel y Curso</th>
                                <th class="p-3">Deporte</th>
                                <th class="p-3">Horario de Práctica</th>
                                <th class="p-3">Profesor a Cargo</th>
                                <th class="p-3 text-right">Arancel Deportivo</th>
                                <th class="p-3 text-center">Estado de Pago</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${filtrados.map(item => `
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="p-3">
                                        <p class="font-bold text-slate-900">${escaparHTML(item.alumnoNombre)}</p>
                                        <p class="text-[10px] text-slate-500 font-mono">${escaparHTML(item.legajo)}</p>
                                    </td>
                                    <td class="p-3 font-semibold text-slate-800">${escaparHTML(item.nivel)} • ${escaparHTML(item.curso)}</td>
                                    <td class="p-3 font-bold text-blue-900">${escaparHTML(item.deporte)}</td>
                                    <td class="p-3 text-slate-600">${escaparHTML(item.horario)}</td>
                                    <td class="p-3 font-semibold text-slate-800">${escaparHTML(item.profesor)}</td>
                                    <td class="p-3 text-right font-mono font-bold text-slate-900">$ ${item.monto.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-center">
                                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.estadoPago === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                                            ${escaparHTML(item.estadoPago)}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Tarjetas Mobile (< 768px) -->
                <div class="grid grid-cols-1 gap-3 md:hidden">
                    ${filtrados.map(item => `
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                            <div class="flex justify-between items-start pb-2 border-b border-slate-100">
                                <div>
                                    <p class="font-black text-slate-900 text-sm">${escaparHTML(item.alumnoNombre)}</p>
                                    <p class="text-[10px] font-mono text-slate-500">${escaparHTML(item.legajo)} • ${escaparHTML(item.curso)}</p>
                                </div>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.estadoPago === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${escaparHTML(item.estadoPago)}</span>
                            </div>
                            <div class="space-y-1 text-[11px] text-slate-600">
                                <div><span class="text-slate-500">Deporte:</span> <strong class="text-blue-900">${escaparHTML(item.deporte)}</strong> (${escaparHTML(item.nivel)})</div>
                                <div><span class="text-slate-500">Profesor:</span> <strong>${escaparHTML(item.profesor)}</strong></div>
                                <div><span class="text-slate-500">Horario:</span> ${escaparHTML(item.horario)}</div>
                                <div class="pt-1 flex justify-between font-bold text-slate-900 text-xs">
                                    <span>Arancel Mensual:</span>
                                    <span class="font-mono text-sm">$ ${item.monto.toLocaleString('es-AR')}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return;
    }

    // ========================================================
    // LISTADO 5: PAGOS POR RECORRIDO DEL SERVICIO DE TRANSPORTE
    // ========================================================
    if (tipo === 'transporte') {
        const recorridoFiltro = AdminTesoreria.filtroRecorrido || 'todos';

        const filtrados = AdminTesoreria.listadoTransporte.filter(item => {
            return recorridoFiltro === 'todos' || item.recorrido === recorridoFiltro;
        });

        contenedor.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                        <h4 class="font-black text-slate-900 text-sm sm:text-base">Listado 5: Pagos de Alumnos por Recorrido del Servicio de Transporte</h4>
                        <p class="text-xs text-slate-500">Arancel institucional de micro escolar puerta a puerta ($ 22.000/mes).</p>
                    </div>
                    <span class="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 self-start sm:self-auto">
                        ${filtrados.length} Alumnos en Transporte
                    </span>
                </div>

                <!-- Filtro por Recorrido -->
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs">
                    <label class="font-black text-slate-700 uppercase text-[10px] shrink-0">Filtrar por Recorrido:</label>
                    <select onchange="filtrarReporteTesoreria('filtroRecorrido', this.value)" class="p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-900 min-h-[38px] w-full sm:w-auto">
                        <option value="todos">Todas las Líneas y Recorridos</option>
                        <option value="Línea 1 - Zona Norte" ${recorridoFiltro === 'Línea 1 - Zona Norte' ? 'selected' : ''}>Línea 1 - Zona Norte</option>
                        <option value="Línea 2 - Zona Sur" ${recorridoFiltro === 'Línea 2 - Zona Sur' ? 'selected' : ''}>Línea 2 - Zona Sur</option>
                        <option value="Línea 3 - Zona Centro" ${recorridoFiltro === 'Línea 3 - Zona Centro' ? 'selected' : ''}>Línea 3 - Zona Centro</option>
                        <option value="Línea 4 - Zona Este / Fontana" ${recorridoFiltro === 'Línea 4 - Zona Este / Fontana' ? 'selected' : ''}>Línea 4 - Zona Este / Fontana</option>
                    </select>
                </div>

                <!-- Tabla Desktop -->
                <div class="hidden md:block overflow-x-auto border border-slate-200 rounded-xl">
                    <table class="w-full text-left text-xs text-slate-700">
                        <thead>
                            <tr class="bg-slate-100 text-[11px] font-black uppercase text-slate-600 border-b">
                                <th class="p-3">Alumno (Nombre y Legajo)</th>
                                <th class="p-3">Año / Curso</th>
                                <th class="p-3">Recorrido del Transporte</th>
                                <th class="p-3">Parada / Dirección</th>
                                <th class="p-3">Horario Retiro / Regreso</th>
                                <th class="p-3">Móvil y Chofer Asignado</th>
                                <th class="p-3 text-right">Importe Mensual</th>
                                <th class="p-3 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${filtrados.map(item => `
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="p-3">
                                        <p class="font-bold text-slate-900">${escaparHTML(item.alumnoNombre)}</p>
                                        <p class="text-[10px] text-slate-500 font-mono">${escaparHTML(item.legajo)}</p>
                                    </td>
                                    <td class="p-3 font-semibold text-slate-800">${escaparHTML(item.curso)}</td>
                                    <td class="p-3 font-bold text-blue-900">${escaparHTML(item.recorrido)}</td>
                                    <td class="p-3 text-slate-600">${escaparHTML(item.parada)}</td>
                                    <td class="p-3 text-slate-600">${escaparHTML(item.horario)}</td>
                                    <td class="p-3 font-semibold text-slate-800">${escaparHTML(item.movilChofer)}</td>
                                    <td class="p-3 text-right font-mono font-bold text-slate-900">$ ${item.monto.toLocaleString('es-AR')}</td>
                                    <td class="p-3 text-center">
                                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.estadoPago === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                                            ${escaparHTML(item.estadoPago)}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Tarjetas Mobile (< 768px) -->
                <div class="grid grid-cols-1 gap-3 md:hidden">
                    ${filtrados.map(item => `
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                            <div class="flex justify-between items-start pb-2 border-b border-slate-100">
                                <div>
                                    <p class="font-black text-slate-900 text-sm">${escaparHTML(item.alumnoNombre)}</p>
                                    <p class="text-[10px] font-mono text-slate-500">${escaparHTML(item.legajo)} • ${escaparHTML(item.curso)}</p>
                                </div>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.estadoPago === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${escaparHTML(item.estadoPago)}</span>
                            </div>
                            <div class="space-y-1 text-[11px] text-slate-600">
                                <div><span class="text-slate-500">Recorrido:</span> <strong class="text-blue-900">${escaparHTML(item.recorrido)}</strong></div>
                                <div><span class="text-slate-500">Parada:</span> ${escaparHTML(item.parada)}</div>
                                <div><span class="text-slate-500">Móvil/Chofer:</span> <strong>${escaparHTML(item.movilChofer)}</strong></div>
                                <div><span class="text-slate-500">Horario:</span> ${escaparHTML(item.horario)}</div>
                                <div class="pt-1 flex justify-between font-bold text-slate-900 text-xs">
                                    <span>Cuota Mensual:</span>
                                    <span class="font-mono text-sm">$ ${item.monto.toLocaleString('es-AR')}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return;
    }
}

// Exportar al objeto global window para uso interactivo y pruebas
window.AdminTesoreria = AdminTesoreria;
window.enviarRecordatorioFinMes = abrirModalRecordatorioFinMes;
window.enviarAvisoDia20 = abrirModalAvisoDia20;
window.abrirModalRecordatorioFinMes = abrirModalRecordatorioFinMes;
window.cerrarModalRecordatorioFinMes = cerrarModalRecordatorioFinMes;
window.actualizarPrevisualizacionFinMes = actualizarPrevisualizacionFinMes;
window.abrirModalPrevisualizarFacturaAdjunta = abrirModalPrevisualizarFacturaAdjunta;
window.cerrarModalPrevisualizarFacturaAdjunta = cerrarModalPrevisualizarFacturaAdjunta;
window.ejecutarEnvioRecordatorioFinMes = ejecutarEnvioRecordatorioFinMes;
window.abrirModalAvisoDia20 = abrirModalAvisoDia20;
window.cerrarModalAvisoDia20 = cerrarModalAvisoDia20;
window.renderizarTablaDeudoresDia20 = renderizarTablaDeudoresDia20;
window.enviarAvisoIndividualDia20 = enviarAvisoIndividualDia20;
window.ejecutarEnvioAvisoDia20 = ejecutarEnvioAvisoDia20;
window.abrirModalCobrarSaldo = abrirModalCobrarSaldo;
window.cerrarModalCobrarSaldo = cerrarModalCobrarSaldo;
window.confirmarCobroSaldoIncompleto = confirmarCobroSaldoIncompleto;
window.cambiarReporteTesoreria = cambiarReporteTesoreria;
window.filtrarReporteTesoreria = filtrarReporteTesoreria;
window.renderizarModuloTesoreriaAdmin = renderizarModuloTesoreriaAdmin;
window.renderizarReporteTesoreria = renderizarReporteTesoreria;
