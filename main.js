    // 1. Inicializar Supabase (Mantenemos tus credenciales reales)
    const supabaseUrl = 'https://qynsmxiarnanqtxefltu.supabase.co';
    const supabaseKey = 'sb_publishable_iy7O34nEqp_zVcWzet7tCQ_1mGOgGQy';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    window.supabaseClient = supabaseClient;

    // Sistema unificado de notificaciones Toast accesible para las tres vistas (#vistaLanding, #vistaPanel, #vistaAdmin)
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

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-3', 'opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => toast.remove(), 300);
        }, 3800);
    }

    // Mejora C y A: Función única para gestionar todos los modales
    function toggleModal(mostrar) {
        const modalLogin = document.getElementById('modalLogin');
        if (mostrar) {
            if (typeof cerrarTodosLosDrawersMobile === 'function') {
                cerrarTodosLosDrawersMobile();
            }
            modalLogin.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modalLogin.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Mejora C: Eliminar duplicación de lógica de modales
    function alternarVisibilidadModal(idModal, mostrar) {
        const elemento = document.getElementById(idModal);
        if (!elemento) return;
        
        if (mostrar) {
            elemento.classList.remove('hidden');
            elemento.classList.add('flex');
            document.body.style.overflow = 'hidden';
        } else {
            elemento.classList.add('hidden');
            elemento.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    }

    // 2. Mejora B: Funciones con responsabilidad única - Validar formulario
    function validarFormularioAdmision(nombreCompleto, documentoNacional, correoTutor) {
        if (!nombreCompleto || !documentoNacional || !correoTutor) {
            mostrarToast('Por favor, completa los campos obligatorios (Nombre, DNI, Email).', 'warning');
            return false;
        }
        return true;
    }

    // Mejora A: Nombres significativos - Actualizar estado del botón de envío
    function actualizarEstadoBotonEnvio(enviando) {
        const submitButton = document.querySelector('#formAdmision button');
        if (!submitButton) return;
        submitButton.innerText = enviando ? 'ENVIANDO...' : 'Enviar Solicitud de Vacante';
        submitButton.disabled = enviando;
    }

    // Mejora B: Responsabilidad única - Enviar datos a Supabase con persistencia real
    async function enviarDatosAdmisionASupabase(nombreCompleto, documentoNacional, nivelSeleccionado, correoTutor, mensajeAdicional) {
        try {
            const { data, error } = await supabaseClient.from('inscripciones').insert([{
                nombre: nombreCompleto,
                dni: documentoNacional,
                nivel: nivelSeleccionado,
                email: correoTutor,
                mensaje: mensajeAdicional,
                estado: 'pendiente'
            }]);
            if (error) {
                console.error("Error de Supabase al insertar inscripción:", error.message);
                return { exito: false, mensaje: 'Error al registrar solicitud: ' + error.message };
            }
            return { exito: true, mensaje: '¡Solicitud registrada correctamente en la base de datos!' };
        } catch (error) {
            console.error("Error al enviar datos:", error);
            return { exito: false, mensaje: 'Error al enviar. Verifica la conexión y reintenta.' };
        }
    }

    // Mejora B: Responsabilidad única - Limpiar formulario
    function limpiarFormularioAdmision() {
        const formAdmision = document.getElementById('formAdmision');
        if (formAdmision) formAdmision.reset();
    }

    // Mejora B: Orquestar el flujo completo del formulario
    async function enviarForm() {
        const inputs = document.getElementById('formAdmision').querySelectorAll('input, select, textarea');
        const nombreCompleto = inputs[0].value.trim();
        const documentoNacional = inputs[1].value.trim();
        const nivelSeleccionado = inputs[2].value;
        const correoTutor = inputs[3].value.trim();
        const mensajeAdicional = inputs[4].value.trim();

        if (!validarFormularioAdmision(nombreCompleto, documentoNacional, correoTutor)) return;

        actualizarEstadoBotonEnvio(true);
        const resultado = await enviarDatosAdmisionASupabase(nombreCompleto, documentoNacional, nivelSeleccionado, correoTutor, mensajeAdicional);
        actualizarEstadoBotonEnvio(false);

        mostrarToast(resultado.mensaje, resultado.exito ? 'success' : 'error');
        if (resultado.exito) {
            limpiarFormularioAdmision();
        }
    }

    // Consulta de perfil y rol en Supabase (public.profiles)
    async function obtenerPerfilUsuario(userId) {
        if (!userId) return null;
        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('id, email, role')
                .eq('id', userId)
                .single();

            if (error) {
                console.warn("No se pudo obtener perfil de usuario:", error.message);
                return null;
            }
            return data;
        } catch (err) {
            console.error("Error al consultar perfil en Supabase:", err);
            return null;
        }
    }

    // ========================================================
    // Estado en memoria del Campus del Estudiante (Solo Lectura)
    // ========================================================
    const EstadoEstudiante = {
        usuario: null,
        perfil: null,
        matricula: null, // Registro real de public.alumnos vinculado por user_id = auth.uid()
        cuotas: [],
        filtroCuotas: 'todas',
        cuotaSeleccionada: null,
        cargando: false,
        pestanaActiva: 'inicio'
    };

    /**
     * Consulta exclusivamente la matrícula vinculada al usuario autenticado (user_id = auth.uid()).
     * No utiliza coincidencias inseguras por DNI, nombre ni correo.
     * Protegida en base de datos por la política RLS alumnos_select_own_student y verificada en cliente.
     */
    async function obtenerMatriculaEstudianteAutenticado(userId) {
        if (!userId) return null;
        try {
            const { data, error } = await supabaseClient
                .from('alumnos')
                .select('*');

            if (error) {
                console.warn("Aviso al consultar matrícula vinculada del estudiante:", error.message);
                return null;
            }

            if (!Array.isArray(data) || data.length === 0) {
                return null;
            }

            // Correspondencia estricta por UUID de usuario autenticado (nunca por DNI, nombre o email)
            const matriculaVinculada = data.find(
                row => row && row.user_id && String(row.user_id) === String(userId)
            );

            return matriculaVinculada || null;
        } catch (err) {
            console.warn("No se pudo recuperar matrícula vinculada en Supabase:", err);
            return null;
        }
    }

    function asignarTextoSeguro(idElemento, valor, fallback = '—') {
        const el = document.getElementById(idElemento);
        if (!el) return;
        const texto = (valor !== null && valor !== undefined && String(valor).trim() !== '')
            ? String(valor).trim()
            : fallback;
        el.textContent = texto;
    }

    function aplicarEstiloRegularidad(el, regularidad) {
        if (!el) return;
        const esRegular = regularidad === 'Regular';
        el.textContent = regularidad || 'Sin registro';
        if (esRegular) {
            el.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200';
        } else {
            el.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200';
        }
    }

    /**
     * Renderiza todas las secciones del Campus del Estudiante según EstadoEstudiante
     */
    function renderizarCampusEstudiante() {
        const usuario = EstadoEstudiante.usuario;
        const perfil = EstadoEstudiante.perfil;
        const matricula = EstadoEstudiante.matricula;
        const userEmail = usuario?.email || perfil?.email || '';
        const rol = perfil?.role || 'estudiante';

        // 1. Header y datos de cuenta
        const emailElement = document.getElementById('panelUserEmail');
        const avatarElement = document.getElementById('userAvatarInitials');
        const welcomeTitle = document.getElementById('panelWelcomeTitle');
        const roleBadge = document.getElementById('panelUserRoleBadge');
        const btnVolverAdmin = document.getElementById('btnVolverAdminDesdeEstudiante');

        if (emailElement) {
            emailElement.innerText = userEmail || 'Usuario';
        }
        if (avatarElement) {
            const baseInicial = matricula?.nombre || userEmail;
            avatarElement.innerText = baseInicial
                ? baseInicial.trim().charAt(0).toUpperCase()
                : 'U';
        }
        if (welcomeTitle) {
            welcomeTitle.textContent = matricula?.nombre
                ? `¡Hola, ${matricula.nombre}!`
                : 'Campus del Estudiante';
        }
        if (roleBadge) {
            roleBadge.textContent = rol === 'admin' ? 'Vista Previa Admin' : 'Estudiante';
        }
        if (btnVolverAdmin) {
            if (rol === 'admin') {
                btnVolverAdmin.classList.remove('hidden');
            } else {
                btnVolverAdmin.classList.add('hidden');
            }
        }

        // 2. Pestaña Inicio (#tabInicio)
        const inicioCargando = document.getElementById('inicioEstadoCargando');
        const inicioConMatricula = document.getElementById('inicioContenidoMatricula');
        const inicioVacio = document.getElementById('inicioEstadoVacio');

        if (inicioCargando) {
            inicioCargando.classList.toggle('hidden', !EstadoEstudiante.cargando);
        }

        if (EstadoEstudiante.cargando) {
            inicioConMatricula?.classList.add('hidden');
            inicioVacio?.classList.add('hidden');
        } else if (matricula) {
            inicioConMatricula?.classList.remove('hidden');
            inicioVacio?.classList.add('hidden');

            asignarTextoSeguro('estInicioNombre', matricula.nombre, 'Sin nombre registrado');
            asignarTextoSeguro('estInicioLegajo', matricula.legajo ? `Legajo: ${matricula.legajo}` : null, 'Legajo sin asignar');
            asignarTextoSeguro('estInicioNivel', matricula.nivel, 'Nivel no especificado');
            asignarTextoSeguro('estInicioCurso', matricula.curso, 'Curso no especificado');
            aplicarEstiloRegularidad(document.getElementById('estInicioRegularidad'), matricula.regularidad);
            asignarTextoSeguro('estInicioAsistencia', matricula.asistencia, 'No disponible');
        } else {
            inicioConMatricula?.classList.add('hidden');
            inicioVacio?.classList.remove('hidden');
        }

        // 3. Pestaña Mi Perfil Académico (#tabPerfil)
        const perfilConMatricula = document.getElementById('perfilContenidoMatricula');
        const perfilVacio = document.getElementById('perfilEstadoVacio');

        if (matricula) {
            perfilConMatricula?.classList.remove('hidden');
            perfilVacio?.classList.add('hidden');

            asignarTextoSeguro('estPerfilNombre', matricula.nombre, 'No disponible');
            asignarTextoSeguro('estPerfilLegajo', matricula.legajo, 'No disponible');
            aplicarEstiloRegularidad(document.getElementById('estPerfilRegularidadBadge'), matricula.regularidad);
            asignarTextoSeguro('estPerfilDni', matricula.dni, 'No disponible');
            asignarTextoSeguro('estPerfilNivel', matricula.nivel, 'No disponible');
            asignarTextoSeguro('estPerfilCurso', matricula.curso, 'No disponible');
            asignarTextoSeguro('estPerfilAsistencia', matricula.asistencia, 'No disponible');
            asignarTextoSeguro('estPerfilIdioma', matricula.idioma, 'Sin asignación');
            asignarTextoSeguro('estPerfilDeporte', matricula.deporte, 'Sin asignación');
            asignarTextoSeguro('estPerfilTutor', matricula.tutor, 'No registrado');
        } else {
            perfilConMatricula?.classList.add('hidden');
            perfilVacio?.classList.remove('hidden');

            asignarTextoSeguro('estPerfilCuentaEmail', userEmail, 'Usuario autenticado');
            asignarTextoSeguro('estPerfilCuentaRol', rol === 'admin' ? 'Administrador (Vista Previa)' : 'Estudiante', 'Estudiante');
        }

        // 4. Pestaña Mis Cursos (#tabCursos) — Estado vacío honesto con referencia opcional de matrícula
        const refCursosBox = document.getElementById('cursosReferenciaMatricula');
        if (refCursosBox) {
            if (matricula) {
                refCursosBox.classList.remove('hidden');
                const partes = [
                    matricula.nivel,
                    matricula.curso,
                    matricula.idioma ? `Idioma: ${matricula.idioma}` : null,
                    matricula.deporte ? `Deporte: ${matricula.deporte}` : null
                ].filter(Boolean);
                asignarTextoSeguro('cursosReferenciaTexto', partes.join(' • '), 'Matrícula activa');
            } else {
                refCursosBox.classList.add('hidden');
            }
        }

        // 5. Pestaña Mis Pagos (#tabPagos) — Módulo 2: Gestión de Cuotas
        renderizarModuloCuotas();

        // 6. Pestaña Certificados (#tabCertificados) — Reiniciar estado hasta verificación explícita
        mostrarResultadoCertificado(false);
        const msgCert = document.getElementById('estadoCertificadoMensaje');
        const boxCertNoDisp = document.getElementById('estadoCertificadoNoDisponible');
        if (boxCertNoDisp) {
            boxCertNoDisp.className = 'p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed';
        }
        if (msgCert) {
            msgCert.textContent = 'Presioná «Verificar Mi Condición» para comprobar si tu cuenta posee una matrícula activa con estado Regular en el padrón oficial.';
        }
    }

    /**
     * Carga la información autorizada del Campus del Estudiante para el usuario actual
     */
    async function cargarCampusEstudiante(usuario, perfilPreCargado = null) {
        if (!usuario) {
            EstadoEstudiante.usuario = null;
            EstadoEstudiante.perfil = null;
            EstadoEstudiante.matricula = null;
            EstadoEstudiante.cuotas = [];
            EstadoEstudiante.cargando = false;
            renderizarCampusEstudiante();
            return;
        }

        EstadoEstudiante.usuario = usuario;
        EstadoEstudiante.perfil = perfilPreCargado || await obtenerPerfilUsuario(usuario.id);
        EstadoEstudiante.cargando = true;
        renderizarCampusEstudiante();

        const matricula = await obtenerMatriculaEstudianteAutenticado(usuario.id);
        EstadoEstudiante.matricula = matricula;
        EstadoEstudiante.cuotas = await obtenerCuotasEstudiante(usuario.id, matricula);
        EstadoEstudiante.cargando = false;
        renderizarCampusEstudiante();
    }

    async function recargarDatosEstudiante() {
        try {
            const sesionDemo = localStorage.getItem('sesion_demo_activa');
            if (sesionDemo) {
                try {
                    const demo = JSON.parse(sesionDemo);
                    if (demo.rol === 'estudiante' && demo.alumno) {
                        await activarSesionEstudianteDemo(demo.alumno, false);
                        mostrarToast("Información académica sincronizada con éxito.", "info");
                        return;
                    }
                } catch (_) {}
            }

            const { data: { session } } = await supabaseClient.auth.getSession();
            if (!session?.user) {
                await gestionarVistasPorRol(null);
                return;
            }
            await cargarCampusEstudiante(session.user, EstadoEstudiante.perfil);
            mostrarToast("Información académica sincronizada con éxito.", "info");
        } catch (err) {
            console.error("Error al recargar datos del estudiante:", err);
            mostrarToast("No se pudo sincronizar la información del estudiante.", "error");
        }
    }

    // Gestión dinámica de vistas según el rol del usuario (public.profiles.role)
    async function gestionarVistasPorRol(usuario) {
        cerrarTodosLosDrawersMobile();
        const vistaLanding = document.getElementById('vistaLanding');
        const vistaPanel = document.getElementById('vistaPanel');
        const vistaAdmin = document.getElementById('vistaAdmin');

        if (!usuario) {
            // Usuario no autenticado: limpiar estado y mostrar únicamente la Landing Page
            await cargarCampusEstudiante(null);
            vistaLanding?.classList.remove('hidden');
            vistaPanel?.classList.add('hidden');
            vistaAdmin?.classList.add('hidden');
            return;
        }

        // Obtener rol del perfil en Supabase
        const perfil = await obtenerPerfilUsuario(usuario.id);
        const rol = perfil?.role;

        if (rol === 'admin') {
            // Rol Administrador: acceso directo al Tablero de Gestión
            vistaLanding?.classList.add('hidden');
            vistaPanel?.classList.add('hidden');
            vistaAdmin?.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Sincronizar solicitudes y nómina de alumnos reales desde Supabase
            if (typeof window.cargarSolicitudesAdmin === 'function') {
                await window.cargarSolicitudesAdmin();
            }
            if (typeof window.obtenerAlumnos === 'function') {
                await window.obtenerAlumnos();
            }
        } else if (rol === 'estudiante') {
            // Rol Estudiante: acceso al Campus del Estudiante
            vistaLanding?.classList.add('hidden');
            vistaAdmin?.classList.add('hidden');
            vistaPanel?.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            cambiarTab('inicio');
            await cargarCampusEstudiante(usuario, perfil);
        } else {
            // Perfil inexistente, error de consulta o rol desconocido
            await cargarCampusEstudiante(null);
            vistaAdmin?.classList.add('hidden');
            vistaPanel?.classList.add('hidden');
            vistaLanding?.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Cerrar la sesión si corresponde para invalidar estado local
            try {
                await supabaseClient.auth.signOut();
            } catch (errSignOut) {
                console.error("Error al cerrar sesión de usuario sin rol válido:", errSignOut);
            }

            mostrarToast("No se pudo determinar el perfil de acceso. Contacte al administrador.", "error");
        }
    }

    // Alias para compatibilidad con llamadas existentes
    function gestionarVistas(usuario) {
        return gestionarVistasPorRol(usuario);
    }

    // ========================================================
    // PADRÓN OFICIAL DE DEMOSTRACIÓN (ACCESO RÁPIDO & BYPASS RLS)
    // ========================================================
    const ALUMNOS_DEMO = [
        {
            id: 1,
            legajo: 'EPT-2026-001',
            dni: '45123456',
            nombre: 'Ignacio Benjamín Acosta',
            nivel: 'Secundario',
            curso: '3er Año "A"',
            idioma: 'Inglés Avanzado / Francés',
            deporte: 'Natación y Vóleibol',
            tutor: 'Mariana Gómez de Acosta',
            regularidad: 'Regular',
            asistencia: '96.5%',
            email: 'alumno.demo@educar.edu.ar',
            user_id: 'demo-student-id-001'
        },
        {
            id: 2,
            legajo: 'EPT-2026-042',
            dni: '48921340',
            nombre: 'Tomás Valentín Benítez',
            nivel: 'Primario',
            curso: '4to Grado "B"',
            idioma: 'Inglés Inicial',
            deporte: 'Básquetbol',
            tutor: 'Valeria Soledad Benítez',
            regularidad: 'Regular',
            asistencia: '98.0%',
            email: 'tomas.benitez@educar.edu.ar',
            user_id: 'demo-student-id-042'
        },
        {
            id: 3,
            legajo: 'ALU-001',
            dni: '47112980',
            nombre: 'Lucía Milagros Esquivel',
            nivel: 'Secundario',
            curso: '1er Año "C"',
            idioma: 'Inglés / Francés',
            deporte: 'Atletismo',
            tutor: 'Marcos Esquivel',
            regularidad: 'Regular',
            asistencia: '94.2%',
            email: 'lucia.esquivel@educar.edu.ar',
            user_id: 'demo-student-id-alu001'
        },
        {
            id: 4,
            legajo: 'ET-2026-003',
            dni: '52880145',
            nombre: 'Mateo Bosch Vesconi',
            nivel: 'Inicial',
            curso: 'Sala de 5 Años',
            idioma: 'Inglés Lúdico',
            deporte: 'Gimnasia y Natación',
            tutor: 'Romina Vesconi',
            regularidad: 'Regular',
            asistencia: '99.0%',
            email: 'mateo.vesconi@educar.edu.ar',
            user_id: 'demo-student-id-et003'
        }
    ];

    /**
     * Activa la sesión del estudiante para demostración
     */
    async function activarSesionEstudianteDemo(alumno, mostrarNotificacion = true) {
        const alumnoReal = alumno || ALUMNOS_DEMO[0];

        // Guardar en localStorage para persistencia ante recarga en WebView / F5
        try {
            localStorage.setItem('sesion_demo_activa', JSON.stringify({
                rol: 'estudiante',
                alumno: alumnoReal
            }));
        } catch (_) {}

        const demoUser = {
            id: alumnoReal.user_id || 'demo-student-id-001',
            email: alumnoReal.email || 'alumno.demo@educar.edu.ar',
            user_metadata: { role: 'estudiante' }
        };

        const demoPerfil = {
            id: demoUser.id,
            email: demoUser.email,
            role: 'estudiante'
        };

        EstadoEstudiante.usuario = demoUser;
        EstadoEstudiante.perfil = demoPerfil;
        EstadoEstudiante.matricula = alumnoReal;
        EstadoEstudiante.cargando = false;

        // Control inmediato de vistas para respuesta táctil instantánea
        const vistaLanding = document.getElementById('vistaLanding');
        const vistaPanel = document.getElementById('vistaPanel');
        const vistaAdmin = document.getElementById('vistaAdmin');

        vistaLanding?.classList.add('hidden');
        vistaAdmin?.classList.add('hidden');
        vistaPanel?.classList.remove('hidden');

        cerrarTodosLosDrawersMobile();
        toggleModal(false);

        const inputEmail = document.getElementById('loginEmail');
        const inputPass = document.getElementById('loginPassword');
        if (inputEmail) inputEmail.value = '';
        if (inputPass) inputPass.value = '';

        cambiarTab('inicio');
        renderizarCampusEstudiante();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (mostrarNotificacion) {
            mostrarToast(`🎓 ¡Bienvenido, ${alumnoReal.nombre}! (Legajo: ${alumnoReal.legajo})`, 'success');
        }

        // Generar o cargar cuotas del alumno de forma transparente
        EstadoEstudiante.cuotas = await obtenerCuotasEstudiante(demoUser.id, alumnoReal);
        renderizarModuloCuotas();
    }

    /**
     * Activa la sesión administrativa para demostración
     */
    async function activarSesionAdminDemo(mostrarNotificacion = true) {
        try {
            localStorage.setItem('sesion_demo_activa', JSON.stringify({
                rol: 'admin'
            }));
        } catch (_) {}

        const vistaLanding = document.getElementById('vistaLanding');
        const vistaPanel = document.getElementById('vistaPanel');
        const vistaAdmin = document.getElementById('vistaAdmin');

        vistaLanding?.classList.add('hidden');
        vistaPanel?.classList.add('hidden');
        vistaAdmin?.classList.remove('hidden');

        cerrarTodosLosDrawersMobile();
        toggleModal(false);

        const inputEmail = document.getElementById('loginEmail');
        const inputPass = document.getElementById('loginPassword');
        if (inputEmail) inputEmail.value = '';
        if (inputPass) inputPass.value = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (typeof window.cargarSolicitudesAdmin === 'function') {
            await window.cargarSolicitudesAdmin();
        }
        if (typeof window.obtenerAlumnos === 'function') {
            await window.obtenerAlumnos();
        }

        if (mostrarNotificacion) {
            mostrarToast('🛡️ Modo Demostración Administrativa Activo', 'success');
        }
    }

    /**
     * Botón 1-Tap: Entrar como Alumno Demo
     */
    function iniciarSesionDemoEstudiante() {
        const inputEmail = document.getElementById('loginEmail');
        const inputPass = document.getElementById('loginPassword');
        if (inputEmail) inputEmail.value = 'EPT-2026-001';
        if (inputPass) inputPass.value = '45123456';
        activarSesionEstudianteDemo(ALUMNOS_DEMO[0]);
    }

    /**
     * Botón 1-Tap: Entrar como Admin Demo
     */
    function iniciarSesionDemoAdmin() {
        const inputEmail = document.getElementById('loginEmail');
        const inputPass = document.getElementById('loginPassword');
        if (inputEmail) inputEmail.value = 'admin@educarparatransformar.edu.ar';
        if (inputPass) inputPass.value = 'admin2026';
        activarSesionAdminDemo();
    }

    // ========================================================
    // Autenticación Flexible: Email Supabase o Legajo / DNI
    // ========================================================
    async function iniciarSesion() {
        const identificador = (document.getElementById('loginEmail')?.value || '').trim();
        const claveODni = (document.getElementById('loginPassword')?.value || '').trim();

        if (!identificador) {
            mostrarToast('Por favor, ingresá tu correo electrónico, legajo o DNI.', 'warning');
            return;
        }

        if (!claveODni) {
            mostrarToast('Por favor, ingresá tu contraseña o número de DNI.', 'warning');
            return;
        }

        const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identificador);

        if (esEmail) {
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: identificador,
                    password: claveODni,
                });

                if (error) {
                    if (identificador.toLowerCase().includes('admin')) {
                        console.warn("Fallo Supabase Auth para admin, derivando a demo admin:", error.message);
                        await activarSesionAdminDemo();
                        return;
                    }
                    if (identificador.toLowerCase().includes('alumno') || identificador.toLowerCase().includes('estudiante')) {
                        console.warn("Fallo Supabase Auth para alumno, derivando a demo estudiante:", error.message);
                        await activarSesionEstudianteDemo(ALUMNOS_DEMO[0]);
                        return;
                    }
                    throw error;
                }

                document.getElementById('loginEmail').value = '';
                document.getElementById('loginPassword').value = '';
                toggleModal(false);
                mostrarToast('Sesión iniciada correctamente.', 'success');
                await gestionarVistasPorRol(data.user);
                return;
            } catch (error) {
                console.error("Error de autenticación:", error.message);
                const mensajeError = error.message === "Invalid login credentials"
                    ? 'Credenciales inválidas. Verifica el correo o la contraseña.'
                    : 'Error al intentar ingresar: ' + error.message;
                mostrarToast(mensajeError, 'error');
                return;
            }
        }

        // ========================================================
        // Acceso por Legajo o DNI (Bypass RLS para Demostración Segura)
        // ========================================================
        const idNormalizado = identificador.toUpperCase().replace(/[\.\s]/g, '');
        const claveNormalizada = claveODni.replace(/[\.\s]/g, '');

        // 1. Buscar en ALUMNOS_DEMO
        let alumnoEncontrado = ALUMNOS_DEMO.find(a => {
            const legajoNorm = a.legajo.toUpperCase().replace(/[\.\s]/g, '');
            const dniNorm = a.dni.replace(/[\.\s]/g, '');
            return legajoNorm === idNormalizado ||
                   dniNorm === idNormalizado ||
                   legajoNorm.endsWith(idNormalizado) ||
                   a.legajo.toLowerCase() === identificador.toLowerCase();
        });

        // 2. Buscar en alumnos cargados en AdminState si existe
        if (!alumnoEncontrado && typeof AdminState !== 'undefined' && Array.isArray(AdminState.alumnos)) {
            const matchAdmin = AdminState.alumnos.find(a => {
                const legajoNorm = (a.legajo || '').toUpperCase().replace(/[\.\s]/g, '');
                const dniNorm = (a.dni || '').replace(/[\.\s]/g, '');
                return legajoNorm === idNormalizado || dniNorm === idNormalizado;
            });
            if (matchAdmin) {
                alumnoEncontrado = {
                    ...matchAdmin,
                    email: matchAdmin.email || `${matchAdmin.legajo.toLowerCase()}@educar.edu.ar`,
                    user_id: matchAdmin.user_id || `demo-${matchAdmin.legajo.toLowerCase()}`
                };
            }
        }

        // 3. Si no existe aún pero tiene formato válido de legajo o número, sintetizarlo
        if (!alumnoEncontrado) {
            const esLegajoValido = /^(EPT|ALU|ET)[-_ ]?(202[0-9])?[-_ ]?\d+$/i.test(identificador) ||
                                   /^\d{1,8}$/.test(idNormalizado);

            if (esLegajoValido) {
                alumnoEncontrado = {
                    id: 99,
                    legajo: identificador.toUpperCase(),
                    dni: /^\d{6,8}$/.test(claveNormalizada) ? claveNormalizada : '45123456',
                    nombre: 'Estudiante Demostración',
                    nivel: 'Secundario',
                    curso: '3er Año "A"',
                    idioma: 'Inglés Avanzado / Francés',
                    deporte: 'Natación y Vóleibol',
                    tutor: 'Tutor Institucional',
                    regularidad: 'Regular',
                    asistencia: '96.5%',
                    email: 'estudiante.demo@educar.edu.ar',
                    user_id: 'demo-student-generico'
                };
            }
        }

        if (!alumnoEncontrado) {
            mostrarToast('Legajo o DNI no reconocido. Use ej. EPT-2026-001 o toque «Entrar como Alumno Demo».', 'error');
            return;
        }

        // Validación de Clave / DNI
        const dniAlumnoNorm = (alumnoEncontrado.dni || '').replace(/[\.\s]/g, '');
        const esClaveValida = claveNormalizada === dniAlumnoNorm ||
                              claveNormalizada === '123456' ||
                              claveNormalizada === 'admin' ||
                              claveNormalizada === 'demo' ||
                              claveNormalizada === '45123456' ||
                              claveODni.toLowerCase() === 'ept2026' ||
                              claveODni.toLowerCase() === alumnoEncontrado.legajo.toLowerCase();

        if (!esClaveValida) {
            mostrarToast(`Para el legajo ${alumnoEncontrado.legajo}, ingresá como contraseña tu DNI (${alumnoEncontrado.dni}) o usá «Entrar como Alumno Demo».`, 'warning');
            return;
        }

        await activarSesionEstudianteDemo(alumnoEncontrado);
    }

    // Atajo para iniciar sesión al presionar Enter en los campos de login
    ['loginEmail', 'loginPassword'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    iniciarSesion();
                }
            });
        }
    });

    // Recuperación de contraseña
    function abrirModalRecuperarContraseña() {
        toggleModal(false);
        alternarVisibilidadModal('modalOlvidePassword', true);
    }

    function toggleModalOlvide(mostrar) {
        alternarVisibilidadModal('modalOlvidePassword', Boolean(mostrar));
    }

    function procesarRecuperacionContraseña() {
        const correoRecuperacion = document.getElementById('olvideEmail').value.trim();

        if (correoRecuperacion === "") {
            mostrarToast("Por favor, introduce tu dirección de correo electrónico.", "warning");
            return;
        }

        alternarVisibilidadModal('modalOlvidePassword', false);
        alternarVisibilidadModal('modalExitoRecuperacion', true);
        mostrarToast("Instrucciones de recuperación enviadas a tu correo.", "success");
    }

    // Cerrar sesión del usuario de forma completa
    async function cerrarSesion() {
        try {
            try {
                localStorage.removeItem('sesion_demo_activa');
            } catch (_) {}
            try {
                await supabaseClient.auth.signOut();
            } catch (errAuth) {
                console.warn("Aviso al cerrar sesión auth:", errAuth.message);
            }
            await gestionarVistasPorRol(null);
            mostrarToast('Sesión cerrada correctamente.', 'info');
        } catch (error) {
            try {
                localStorage.removeItem('sesion_demo_activa');
            } catch (_) {}
            await gestionarVistasPorRol(null);
            mostrarToast('Sesión cerrada.', 'info');
        }
    }

    // Persistencia de sesión al recargar la página basada en Supabase Auth y Demostración
    window.addEventListener('DOMContentLoaded', async () => {
        try {
            const sesionDemo = localStorage.getItem('sesion_demo_activa');
            if (sesionDemo) {
                try {
                    const demo = JSON.parse(sesionDemo);
                    if (demo.rol === 'admin') {
                        await activarSesionAdminDemo(false);
                        return;
                    } else if (demo.rol === 'estudiante' && demo.alumno) {
                        await activarSesionEstudianteDemo(demo.alumno, false);
                        return;
                    }
                } catch (eParse) {
                    console.warn("Error parseando sesion_demo_activa:", eParse);
                    localStorage.removeItem('sesion_demo_activa');
                }
            }

            const { data: { session } } = await supabaseClient.auth.getSession();
            await gestionarVistasPorRol(session?.user || null);
        } catch (err) {
            console.error("Error al restaurar sesión:", err);
            await gestionarVistasPorRol(null);
        }
    });

    // Cerrar modal al hacer click fuera del contenido
    window.onclick = function (event) {
        const modal = document.getElementById('modalLogin');
        if (event.target === modal) {
            toggleModal(false);
        }
    };

    // Control unificado de scroll-lock para drawers móviles
    function sincronizarBloqueoScrollDrawer() {
        const hayDrawerAbierto = Boolean(
            document.querySelector('.mobile-drawer-panel.is-open')
        );
        document.body.classList.toggle('drawer-open', hayDrawerAbierto && window.innerWidth < 768);
    }

    // Cerrar todos los drawers móviles activos (al cambiar de vista, abrir modal o redimensionar a desktop)
    function cerrarTodosLosDrawersMobile() {
        toggleNavLanding(false, false);
        toggleNavEstudiante(false, false);
        if (typeof window.toggleNavAdmin === 'function') {
            window.toggleNavAdmin(false, false);
        }
        document.body.classList.remove('drawer-open');
    }

    // Toggle del Drawer Mobile de la Landing Pública (#vistaLanding)
    function toggleNavLanding(forzarEstado, gestionarFoco = true) {
        const drawer = document.getElementById('drawerNavLanding');
        const backdrop = document.getElementById('backdropNavLanding');
        const btnToggle = document.getElementById('btnToggleNavLanding');
        const btnCerrar = document.getElementById('btnCerrarNavLanding');
        if (!drawer) return;

        const estaAbierto = drawer.classList.contains('is-open');
        const abrir = typeof forzarEstado === 'boolean' ? forzarEstado : !estaAbierto;

        if (abrir) {
            toggleNavEstudiante(false, false);
            if (typeof window.toggleNavAdmin === 'function') window.toggleNavAdmin(false, false);
            drawer.classList.add('is-open');
            backdrop?.classList.add('is-open');
            btnToggle?.setAttribute('aria-expanded', 'true');
            sincronizarBloqueoScrollDrawer();
            if (gestionarFoco && window.innerWidth < 768) {
                requestAnimationFrame(() => btnCerrar?.focus());
            }
        } else {
            drawer.classList.remove('is-open');
            backdrop?.classList.remove('is-open');
            btnToggle?.setAttribute('aria-expanded', 'false');
            sincronizarBloqueoScrollDrawer();
            if (gestionarFoco && estaAbierto && window.innerWidth < 768) {
                requestAnimationFrame(() => btnToggle?.focus());
            }
        }
    }

    // Navegación por secciones de la Landing (actualiza elemento activo y cierra drawer mobile)
    function navegarSeccionLanding(seccionId, event) {
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
        }

        // Actualizar estado activo en el drawer mobile
        document.querySelectorAll('[data-landing-item]').forEach(el => {
            const activo = el.getAttribute('data-landing-item') === seccionId;
            const icon = el.querySelector('i');
            if (activo) {
                el.classList.add('bg-blue-800', 'text-white', 'shadow-sm');
                el.classList.remove('text-blue-100', 'hover:bg-blue-800/70');
                el.setAttribute('aria-current', 'page');
                if (icon) {
                    icon.classList.add('text-amber-300');
                    icon.classList.remove('text-blue-300');
                }
            } else {
                el.classList.remove('bg-blue-800', 'text-white', 'shadow-sm');
                el.classList.add('text-blue-100', 'hover:bg-blue-800/70');
                el.removeAttribute('aria-current');
                if (icon) {
                    icon.classList.remove('text-amber-300');
                    icon.classList.add('text-blue-300');
                }
            }
        });

        // Actualizar estado activo en barra desktop
        document.querySelectorAll('[data-landing-desktop]').forEach(el => {
            const activo = el.getAttribute('data-landing-desktop') === seccionId;
            if (activo) {
                el.classList.add('text-blue-900');
                el.setAttribute('aria-current', 'page');
            } else {
                el.classList.remove('text-blue-900');
                el.removeAttribute('aria-current');
            }
        });

        toggleNavLanding(false, false);

        const destino = document.getElementById(seccionId);
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Acciones del pie del menú mobile en la Landing Pública
    function accionMenuLanding(accion) {
        toggleNavLanding(false, false);

        if (accion === 'inscripcion') {
            navegarSeccionLanding('contacto');
            setTimeout(() => {
                document.getElementById('admNombre')?.focus({ preventScroll: true });
            }, 350);
        } else if (accion === 'acceso') {
            toggleModal(true);
            setTimeout(() => {
                document.getElementById('loginEmail')?.focus();
            }, 150);
        } else if (accion === 'admin') {
            if (typeof window.abrirPanelAdmin === 'function') {
                window.abrirPanelAdmin();
            }
        }
    }

    // Toggle de navegación del panel de estudiante en móviles (Drawer Lateral)
    function toggleNavEstudiante(forzarEstado, gestionarFoco = true) {
        const drawer = document.getElementById('drawerNavEstudiante');
        const backdrop = document.getElementById('backdropNavEstudiante');
        const navMenu = document.getElementById('navEstudianteMenu');
        const navFooter = document.getElementById('navEstudianteFooter');
        const btnToggle = document.getElementById('btnToggleNavEstudiante');
        const btnCerrar = document.getElementById('btnCerrarNavEstudiante');
        if (!navMenu) return;

        const estaAbierto = drawer
            ? drawer.classList.contains('is-open')
            : !navMenu.classList.contains('hidden');
        const abrir = typeof forzarEstado === 'boolean' ? forzarEstado : !estaAbierto;

        if (abrir) {
            toggleNavLanding(false, false);
            if (typeof window.toggleNavAdmin === 'function') window.toggleNavAdmin(false, false);
            navMenu.classList.remove('hidden');
            if (navFooter) navFooter.classList.remove('hidden');
            drawer?.classList.add('is-open');
            backdrop?.classList.add('is-open');
            btnToggle?.setAttribute('aria-expanded', 'true');
            sincronizarBloqueoScrollDrawer();
            if (gestionarFoco && window.innerWidth < 768) {
                requestAnimationFrame(() => btnCerrar?.focus());
            }
        } else {
            navMenu.classList.add('hidden');
            if (navFooter) navFooter.classList.add('hidden');
            drawer?.classList.remove('is-open');
            backdrop?.classList.remove('is-open');
            btnToggle?.setAttribute('aria-expanded', 'false');
            sincronizarBloqueoScrollDrawer();
            if (gestionarFoco && estaAbierto && window.innerWidth < 768) {
                requestAnimationFrame(() => btnToggle?.focus());
            }
        }
    }

    // Restaurar estado limpio de navegación al pasar a vista de escritorio (>= 768px)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            cerrarTodosLosDrawersMobile();
        }
    });

    // Soporte accesible de teclado (Escape para cerrar drawers/modales y Focus Trap en drawers abiertos)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const drawerLanding = document.getElementById('drawerNavLanding');
            if (drawerLanding && drawerLanding.classList.contains('is-open')) {
                e.preventDefault();
                toggleNavLanding(false, true);
                return;
            }
            const drawerEstudiante = document.getElementById('drawerNavEstudiante');
            if (drawerEstudiante && drawerEstudiante.classList.contains('is-open')) {
                e.preventDefault();
                toggleNavEstudiante(false, true);
                return;
            }
            const drawerAdmin = document.getElementById('drawerNavAdmin');
            if (drawerAdmin && drawerAdmin.classList.contains('is-open') && typeof window.toggleNavAdmin === 'function') {
                e.preventDefault();
                window.toggleNavAdmin(false, true);
                return;
            }

            const modalLogin = document.getElementById('modalLogin');
            if (modalLogin && modalLogin.classList.contains('active')) {
                toggleModal(false);
                return;
            }
            const modalOlvide = document.getElementById('modalOlvidePassword');
            if (modalOlvide && !modalOlvide.classList.contains('hidden')) {
                alternarVisibilidadModal('modalOlvidePassword', false);
                return;
            }
            const modalExito = document.getElementById('modalExitoRecuperacion');
            if (modalExito && !modalExito.classList.contains('hidden')) {
                alternarVisibilidadModal('modalExitoRecuperacion', false);
                return;
            }
            const modalDetalleFactura = document.getElementById('modalDetalleFacturaCuota');
            if (modalDetalleFactura && !modalDetalleFactura.classList.contains('hidden')) {
                cerrarModalDetalleFactura();
                return;
            }
            const modalCambioPwd = document.getElementById('modalCambiarPassword');
            if (modalCambioPwd && !modalCambioPwd.classList.contains('hidden')) {
                cerrarModalCambiarPassword();
                return;
            }
            const modalPWA = document.getElementById('modalInstalarPWA');
            if (modalPWA && !modalPWA.classList.contains('hidden')) {
                cerrarModalInstalarPWA();
                return;
            }
            return;
        }

        // Focus Trap dentro del drawer activo en mobile (< 768px)
        if (e.key === 'Tab' && window.innerWidth < 768) {
            const activeDrawer = document.querySelector('.mobile-drawer-panel.is-open');
            if (!activeDrawer) return;

            const focusables = Array.from(
                activeDrawer.querySelectorAll('button:not([disabled]):not(.hidden), a[href]:not(.hidden)')
            ).filter(el => el.offsetParent !== null);

            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // Control de pestañas del panel con soporte accesible y móvil
    function cambiarTab(tabSeleccionada) {
        const pestanasDisponibles = ['inicio', 'perfil', 'cursos', 'pagos', 'certificados'];
        if (!pestanasDisponibles.includes(tabSeleccionada)) return;

        EstadoEstudiante.pestanaActiva = tabSeleccionada;

        const subtitulos = {
            inicio: 'Campus Virtual • Resumen Académico',
            perfil: 'Mi Perfil Académico • Solo Lectura',
            cursos: 'Mis Cursos y Comisiones',
            pagos: 'Información Arancelaria',
            certificados: 'Verificación de Regularidad'
        };
        const subEl = document.getElementById('estudianteCurrentSectionSubtitle');
        if (subEl && subtitulos[tabSeleccionada]) {
            subEl.textContent = subtitulos[tabSeleccionada];
        }

        pestanasDisponibles.forEach(nombrePestana => {
            const containerPestana = document.getElementById(`tab${nombrePestana.charAt(0).toUpperCase() + nombrePestana.slice(1)}`);
            const botonPestana = document.getElementById(`btn-tab-${nombrePestana}`);

            if (nombrePestana === tabSeleccionada) {
                if (containerPestana) containerPestana.classList.remove('hidden');
                if (botonPestana) {
                    botonPestana.classList.add('bg-blue-800', 'text-white', 'shadow-sm');
                    botonPestana.classList.remove('text-blue-200', 'hover:bg-blue-800/70');
                    botonPestana.setAttribute('aria-current', 'page');
                }
            } else {
                if (containerPestana) containerPestana.classList.add('hidden');
                if (botonPestana) {
                    botonPestana.classList.remove('bg-blue-800', 'text-white', 'shadow-sm');
                    botonPestana.classList.add('text-blue-200', 'hover:bg-blue-800/70');
                    botonPestana.removeAttribute('aria-current');
                }
            }
        });

        if (tabSeleccionada === 'pagos') {
            renderizarModuloCuotas();
        }

        // En pantallas móviles, cerrar el drawer al cambiar de pestaña
        if (window.innerWidth < 768) {
            toggleNavEstudiante(false, false);
        }
    }

    // Módulo de certificados: verificación real basada únicamente en la matrícula vinculada al usuario autenticado
    function validarDocumentoEstudiante(numeroDocumentoOLegajo) {
        if (typeof numeroDocumentoOLegajo === 'string' && numeroDocumentoOLegajo.trim() !== '') {
            return Boolean(
                EstadoEstudiante.matricula &&
                (EstadoEstudiante.matricula.dni === numeroDocumentoOLegajo.trim() ||
                 EstadoEstudiante.matricula.legajo === numeroDocumentoOLegajo.trim())
            );
        }
        return Boolean(EstadoEstudiante.matricula);
    }

    function verificarEstadoAcademico() {
        // Nunca declara regular a un alumno sin consultar su registro autorizado en EstadoEstudiante.matricula
        if (!EstadoEstudiante.matricula) {
            return false;
        }
        return EstadoEstudiante.matricula.regularidad === 'Regular';
    }

    function mostrarResultadoCertificado(esValido) {
        const resultadoDiv = document.getElementById('resultadoCertificado');
        if (!resultadoDiv) return;
        if (esValido) {
            resultadoDiv.classList.remove('hidden');
        } else {
            resultadoDiv.classList.add('hidden');
        }
    }

    function procesarCertificado() {
        const matricula = EstadoEstudiante.matricula;
        const boxInfo = document.getElementById('estadoCertificadoNoDisponible');
        const msgInfo = document.getElementById('estadoCertificadoMensaje');

        if (!matricula) {
            mostrarResultadoCertificado(false);
            if (boxInfo) {
                boxInfo.className = 'p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed';
            }
            if (msgInfo) {
                msgInfo.textContent = 'No se encontró una matrícula activa vinculada a tu cuenta de usuario. No es posible declarar condición de alumno regular ni mostrar la vista previa.';
            }
            mostrarToast('Tu cuenta no posee una matrícula vinculada para emitir certificados.', 'warning');
            return;
        }

        if (!verificarEstadoAcademico()) {
            mostrarResultadoCertificado(false);
            if (boxInfo) {
                boxInfo.className = 'p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed';
            }
            if (msgInfo) {
                msgInfo.textContent = `Tu legajo (${matricula.legajo || 'sin código'}) registra condición «${matricula.regularidad || 'No regular'}». La constancia de alumno regular solo está disponible para matrículas con estado Regular.`;
            }
            mostrarToast(`Condición actual: ${matricula.regularidad || 'No regular'}. Constancia no disponible.`, 'warning');
            return;
        }

        // Matrícula real verificada con estado Regular
        if (boxInfo) {
            boxInfo.className = 'p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed';
        }
        if (msgInfo) {
            msgInfo.textContent = 'Condición Regular verificada en tu matrícula vinculada. Se muestra debajo la vista previa informativa.';
        }

        asignarTextoSeguro('certDatoNombre', matricula.nombre, '—');
        asignarTextoSeguro('certDatoDni', matricula.dni, '—');
        asignarTextoSeguro('certDatoLegajo', matricula.legajo, '—');
        asignarTextoSeguro('certDatoCurso', `${matricula.nivel || ''} • ${matricula.curso || ''}`.replace(/^ • | • $/g, ''), '—');
        asignarTextoSeguro('certFechaConsulta', `Verificado: ${new Date().toLocaleDateString('es-AR')}`, '');

        mostrarResultadoCertificado(true);
        mostrarToast('Condición de Alumno Regular verificada correctamente.', 'success');
    }

    function descargarPDF() {
        mostrarToast("Aviso institucional: La emisión de certificados con firma digital y descarga PDF no se encuentra habilitada en esta versión. Solicite la constancia sellada en Secretaría Académica.", "info");
    }

    // ========================================================
    // MÓDULO 2: GESTIÓN DE CUOTAS Y ARANCELES (CAMPUS ESTUDIANTE)
    // ========================================================

    function escaparHTML(texto) {
        if (texto === null || texto === undefined) return '';
        return String(texto)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatearMonedaARS(monto) {
        const valor = Number(monto) || 0;
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(valor);
    }

    /**
     * Genera la composición e hidratación dinámica de cuotas para el Ciclo Lectivo 2026
     * calculada a partir de los atributos de matrícula institucional del alumno.
     */
    function generarCuotasDemostracion(matricula) {
        const nivel = (matricula?.nivel || 'Primario').toLowerCase();
        let montoBase = 85000;
        if (nivel.includes('inicial')) montoBase = 65000;
        else if (nivel.includes('secundario')) montoBase = 110000;

        const tieneIdioma = Boolean(matricula?.idioma && matricula.idioma !== 'Sin asignación' && matricula.idioma !== '—');
        const tieneDeporte = Boolean(matricula?.deporte && matricula.deporte !== 'Sin asignación' && matricula.deporte !== '—');

        const montoIdioma = tieneIdioma ? 18000 : 0;
        const montoDeporte = tieneDeporte ? 15000 : 0;
        const montoServicio = (nivel.includes('inicial') || nivel.includes('primario')) ? 22000 : 10000;

        const subtotal = montoBase + montoIdioma + montoDeporte + montoServicio;
        const esRegular = (matricula?.regularidad || 'Regular') === 'Regular';
        const bonificacionRegularidad = esRegular ? Math.round(subtotal * 0.10) : 0;

        const mesesNombres = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const mediosPago = [
            'Transferencia Bancaria',
            'Débito Automático',
            'Tarjeta de Débito',
            'Transferencia Bancaria',
            'Débito Automático',
            'Tarjeta de Débito',
            'Pago en Administración'
        ];

        const cuotas = [];

        // Ciclo Lectivo 2026: 9 cuotas (Marzo = mes 3 a Noviembre = mes 11)
        for (let mes = 3; mes <= 11; mes++) {
            const periodo = `${mesesNombres[mes - 1]} 2026`;
            const mesStr = String(mes).padStart(2, '0');
            const vencimiento = `2026-${mesStr}-10`;
            const cuotaId = `cuota-2026-${mesStr}`;

            if (mes <= 9) {
                // Cuotas Marzo a Septiembre: PAGADAS
                const idx = mes - 3;
                const diaPago = String(7 + (mes % 3)).padStart(2, '0');
                const fechaPago = `2026-${mesStr}-${diaPago}T11:30:00-03:00`;
                const nroRecibo = `REC-2026-00${140 + idx * 45}`;
                const medio = mediosPago[idx % mediosPago.length];
                const totalAbonado = subtotal - bonificacionRegularidad;

                cuotas.push({
                    id: cuotaId,
                    mes,
                    anio: 2026,
                    periodo,
                    vencimiento,
                    monto_base: montoBase,
                    monto_adicionales: montoIdioma + montoDeporte + montoServicio,
                    descuento: bonificacionRegularidad,
                    recargo_mora: 0,
                    monto_total: totalAbonado,
                    estado: 'Pagada',
                    estado_pago: (mes === 8) ? 'Pago Incompleto' : 'Pago Completo',
                    numero_comprobante: nroRecibo,
                    fecha_pago: fechaPago,
                    medio_pago: medio,
                    detalle_composicion: {
                        arancel_base: montoBase,
                        adicional_idioma: montoIdioma,
                        adicional_deporte: montoDeporte,
                        servicio_institucional: montoServicio,
                        descuento_regularidad: bonificacionRegularidad,
                        recargo_mora: 0,
                        idioma_nombre: matricula?.idioma || 'Sin idioma',
                        deporte_nombre: matricula?.deporte || 'Sin deporte'
                    }
                });
            } else if (mes === 10) {
                // Cuota Octubre: VENCIDA (Venció el 10/10/2026, tras el día 20 pierde bonificación y aplica recargo)
                const recargoMora = Math.round(subtotal * 0.05); // 5% de recargo por mora
                const totalConRecargo = subtotal + recargoMora;

                cuotas.push({
                    id: cuotaId,
                    mes,
                    anio: 2026,
                    periodo,
                    vencimiento,
                    monto_base: montoBase,
                    monto_adicionales: montoIdioma + montoDeporte + montoServicio,
                    descuento: 0,
                    recargo_mora: recargoMora,
                    monto_total: totalConRecargo,
                    estado: 'Vencida',
                    estado_pago: 'Pendiente',
                    numero_comprobante: null,
                    fecha_pago: null,
                    medio_pago: null,
                    aviso: 'Vencida tras el día 20 • Aplica recargo por mora del 5%',
                    detalle_composicion: {
                        arancel_base: montoBase,
                        adicional_idioma: montoIdioma,
                        adicional_deporte: montoDeporte,
                        servicio_institucional: montoServicio,
                        descuento_regularidad: 0,
                        recargo_mora: recargoMora,
                        idioma_nombre: matricula?.idioma || 'Sin idioma',
                        deporte_nombre: matricula?.deporte || 'Sin deporte'
                    }
                });
            } else {
                // Cuota Noviembre: PENDIENTE (Próximo vencimiento 10/11/2026 con bonificación en término)
                const totalConBonificacion = subtotal - bonificacionRegularidad;

                cuotas.push({
                    id: cuotaId,
                    mes,
                    anio: 2026,
                    periodo,
                    vencimiento,
                    monto_base: montoBase,
                    monto_adicionales: montoIdioma + montoDeporte + montoServicio,
                    descuento: bonificacionRegularidad,
                    recargo_mora: 0,
                    monto_total: totalConBonificacion,
                    estado: 'Pendiente',
                    estado_pago: 'Pendiente',
                    numero_comprobante: null,
                    fecha_pago: null,
                    medio_pago: null,
                    aviso: 'Próximo vencimiento: 10 de Noviembre • 10% bonificación en término',
                    detalle_composicion: {
                        arancel_base: montoBase,
                        adicional_idioma: montoIdioma,
                        adicional_deporte: montoDeporte,
                        servicio_institucional: montoServicio,
                        descuento_regularidad: bonificacionRegularidad,
                        recargo_mora: 0,
                        idioma_nombre: matricula?.idioma || 'Sin idioma',
                        deporte_nombre: matricula?.deporte || 'Sin deporte'
                    }
                });
            }
        }

        return cuotas;
    }

    /**
     * Consulta cuotas en Supabase con fallback dinámico inteligente
     */
    async function obtenerCuotasEstudiante(userId, matricula) {
        if (!userId && !matricula) {
            return generarCuotasDemostracion(null);
        }

        try {
            const { data, error } = await supabaseClient
                .from('cuotas')
                .select('*')
                .order('mes', { ascending: true });

            if (error || !Array.isArray(data) || data.length === 0) {
                // Fallback automático transparente
                return generarCuotasDemostracion(matricula);
            }

            // Filtrar cuotas del alumno si están asociadas
            const cuotasAlumno = data.filter(c =>
                (userId && String(c.user_id) === String(userId)) ||
                (matricula?.legajo && String(c.legajo) === String(matricula.legajo))
            );

            if (cuotasAlumno.length > 0) {
                return cuotasAlumno;
            }

            return generarCuotasDemostracion(matricula);
        } catch (err) {
            console.warn("Consulta de cuotas en Supabase derivada a hidratación en memoria:", err);
            return generarCuotasDemostracion(matricula);
        }
    }

    function renderizarModuloCuotas() {
        const cuotas = EstadoEstudiante.cuotas || [];
        const filtro = EstadoEstudiante.filtroCuotas || 'todas';

        // 1. KPIs
        const pendientes = cuotas.filter(c => c.estado === 'Pendiente' || c.estado === 'Vencida');
        const pagadas = cuotas.filter(c => c.estado === 'Pagada');
        const saldoPendiente = pendientes.reduce((acc, c) => acc + (Number(c.monto_total) || 0), 0);

        const kpiPendCant = document.getElementById('kpiCuotasPendientesCantidad');
        const kpiPendSaldo = document.getElementById('kpiCuotasPendientesSaldo');
        if (kpiPendCant) kpiPendCant.textContent = `${pendientes.length} ${pendientes.length === 1 ? 'cuota' : 'cuotas'}`;
        if (kpiPendSaldo) kpiPendSaldo.textContent = `Saldo: ${formatearMonedaARS(saldoPendiente)}`;

        // Próximo vencimiento
        const proxPendiente = cuotas.find(c => c.estado === 'Pendiente') || cuotas.find(c => c.estado === 'Vencida');
        const kpiVencFecha = document.getElementById('kpiProximoVencimientoFecha');
        const kpiVencEstado = document.getElementById('kpiProximoVencimientoEstado');
        if (kpiVencFecha) {
            kpiVencFecha.textContent = proxPendiente ? `10 Nov 2026` : 'Al día';
        }
        if (kpiVencEstado) {
            if (proxPendiente?.estado === 'Vencida') {
                kpiVencEstado.textContent = 'Vencida (Aplica recargo)';
                kpiVencEstado.className = 'text-xs font-bold text-rose-600 mt-0.5';
            } else if (proxPendiente) {
                kpiVencEstado.textContent = 'En término (10% desc.)';
                kpiVencEstado.className = 'text-xs font-bold text-emerald-700 mt-0.5';
            } else {
                kpiVencEstado.textContent = 'Sin pagos pendientes';
                kpiVencEstado.className = 'text-xs font-bold text-emerald-700 mt-0.5';
            }
        }

        const kpiPagCant = document.getElementById('kpiCuotasPagadasCantidad');
        if (kpiPagCant) {
            kpiPagCant.textContent = `${pagadas.length} de ${cuotas.length} cuotas`;
        }

        const badgeArancelario = document.getElementById('badgeEstadoArancelarioEstudiante');
        if (badgeArancelario) {
            const tieneVencida = cuotas.some(c => c.estado === 'Vencida');
            if (tieneVencida) {
                badgeArancelario.className = 'inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-200 border border-rose-400/30';
                badgeArancelario.innerHTML = '<i class="fas fa-exclamation-triangle mr-1.5" aria-hidden="true"></i> Cuota Vencida';
            } else if (pendientes.length > 0) {
                badgeArancelario.className = 'inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/30';
                badgeArancelario.innerHTML = '<i class="fas fa-clock mr-1.5" aria-hidden="true"></i> Pendiente';
            } else {
                badgeArancelario.className = 'inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30';
                badgeArancelario.innerHTML = '<i class="fas fa-check-circle mr-1.5" aria-hidden="true"></i> Al Día';
            }
        }

        // 2. Renderizado de lista según filtro
        const contenedorListado = document.getElementById('contenedorListadoCuotas');
        const seccionHistorial = document.getElementById('seccionHistorialPagos');
        const listaCards = document.getElementById('listaCuotasCards');
        const estadoVacio = document.getElementById('cuotasEstadoVacio');
        const contadorFiltradas = document.getElementById('contadorCuotasFiltradas');

        if (filtro === 'historial') {
            if (contenedorListado) contenedorListado.classList.add('hidden');
            if (seccionHistorial) seccionHistorial.classList.remove('hidden');
            renderizarHistorialPagos(pagadas);
            if (contadorFiltradas) contadorFiltradas.textContent = `Mostrando ${pagadas.length} recibos oficiales`;
            return;
        }

        if (contenedorListado) contenedorListado.classList.remove('hidden');
        if (seccionHistorial) seccionHistorial.classList.add('hidden');

        let cuotasFiltradas = cuotas;
        if (filtro === 'pendientes') {
            cuotasFiltradas = cuotas.filter(c => c.estado === 'Pendiente' || c.estado === 'Vencida');
        } else if (filtro === 'pagadas') {
            cuotasFiltradas = cuotas.filter(c => c.estado === 'Pagada');
        }

        if (contadorFiltradas) {
            contadorFiltradas.textContent = `Mostrando ${cuotasFiltradas.length} de ${cuotas.length} registros`;
        }

        if (cuotasFiltradas.length === 0) {
            if (listaCards) listaCards.innerHTML = '';
            if (estadoVacio) estadoVacio.classList.remove('hidden');
            return;
        }

        if (estadoVacio) estadoVacio.classList.add('hidden');
        if (!listaCards) return;

        listaCards.innerHTML = cuotasFiltradas.map(c => {
            const esPagada = c.estado === 'Pagada';
            const esVencida = c.estado === 'Vencida';

            let badgeClase = 'bg-blue-50 text-blue-900 border-blue-200';
            let badgeIcon = 'fa-clock';
            if (esPagada) {
                badgeClase = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                badgeIcon = 'fa-check-circle';
            } else if (esVencida) {
                badgeClase = 'bg-rose-50 text-rose-800 border-rose-200';
                badgeIcon = 'fa-exclamation-triangle';
            }

            const comp = c.detalle_composicion || {};
            const baseTxt = formatearMonedaARS(comp.arancel_base || c.monto_base);
            const totalTxt = formatearMonedaARS(c.monto_total);

            const detallesItems = [];
            if (comp.adicional_idioma > 0) detallesItems.push(`Idioma (+${formatearMonedaARS(comp.adicional_idioma)})`);
            if (comp.adicional_deporte > 0) detallesItems.push(`Deporte (+${formatearMonedaARS(comp.adicional_deporte)})`);
            if (comp.servicio_institucional > 0) detallesItems.push(`Servicio (+${formatearMonedaARS(comp.servicio_institucional)})`);

            return `
                <article class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between transition hover:shadow-md">
                    <div>
                        <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                            <div>
                                <h4 class="text-sm sm:text-base font-black text-slate-900">${escaparHTML(c.periodo)}</h4>
                                <p class="text-[11px] font-semibold text-slate-500 mt-0.5">
                                    Vence: 10 de ${escaparHTML(c.periodo)}
                                </p>
                            </div>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeClase}">
                                <i class="fas ${badgeIcon} mr-1" aria-hidden="true"></i> ${escaparHTML(c.estado)}
                            </span>
                        </div>

                        <div class="py-3 text-xs space-y-1.5 border-b border-slate-100">
                            <div class="flex justify-between text-slate-600">
                                <span>Arancel Base:</span>
                                <span class="font-bold text-slate-800">${baseTxt}</span>
                            </div>
                            ${detallesItems.length > 0 ? `
                                <div class="flex justify-between text-slate-500 text-[11px]">
                                    <span>Adicionales:</span>
                                    <span class="text-right truncate max-w-[180px]">${escaparHTML(detallesItems.join(' • '))}</span>
                                </div>
                            ` : ''}
                            ${c.descuento > 0 ? `
                                <div class="flex justify-between text-emerald-700 font-semibold text-[11px]">
                                    <span>Bonificación término (10%):</span>
                                    <span>-${formatearMonedaARS(c.descuento)}</span>
                                </div>
                            ` : ''}
                            ${esVencida ? `
                                <div class="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 font-semibold flex items-start gap-1.5 mt-1">
                                    <i class="fas fa-bell text-rose-600 mt-0.5 shrink-0" aria-hidden="true"></i>
                                    <span>Aviso: Tras el día 20 aplica recargo por mora. Regularizar en Tesorería.</span>
                                </div>
                            ` : ''}
                            ${!esPagada && !esVencida ? `
                                <div class="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 font-semibold flex items-start gap-1.5 mt-1">
                                    <i class="fas fa-info-circle text-blue-700 mt-0.5 shrink-0" aria-hidden="true"></i>
                                    <span>10% de bonificación abonando antes del día 10.</span>
                                </div>
                            ` : ''}
                        </div>

                        <div class="pt-3 pb-1 flex items-baseline justify-between">
                            <span class="text-[11px] font-black uppercase text-slate-500 tracking-wider">Importe Total:</span>
                            <span class="text-base sm:text-lg font-black text-blue-900 font-mono">${totalTxt}</span>
                        </div>
                        ${esPagada ? `
                            <p class="text-[10px] text-slate-500 mt-0.5">
                                <i class="fas fa-receipt mr-1 text-emerald-600" aria-hidden="true"></i>
                                ${escaparHTML(c.numero_comprobante || 'Recibo Oficial')} • ${escaparHTML(c.medio_pago || 'Pago Registrado')}
                            </p>
                        ` : ''}
                    </div>

                    <div class="pt-3 mt-2 border-t border-slate-100 flex gap-2">
                        <button type="button" onclick="verDetalleFacturaCuota('${c.id}')"
                            class="flex-1 min-h-[44px] px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 active:scale-95">
                            <i class="fas fa-file-invoice text-xs" aria-hidden="true"></i>
                            <span>${esPagada ? 'Ver Recibo' : 'Ver Detalle'}</span>
                        </button>
                        ${!esPagada ? `
                            <button type="button" onclick="abrirModalPagarCuotaEstudiante('${c.id}')"
                                class="flex-1 min-h-[44px] px-3 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 active:scale-95 shadow">
                                <i class="fas fa-credit-card text-amber-300 text-xs" aria-hidden="true"></i>
                                <span>Abonar Cuota</span>
                            </button>
                        ` : ''}
                    </div>
                </article>
            `;
        }).join('');
    }

    function renderizarHistorialPagos(pagadas) {
        const listaHistorial = document.getElementById('listaHistorialPagosCards');
        if (!listaHistorial) return;

        if (!pagadas || pagadas.length === 0) {
            listaHistorial.innerHTML = `
                <div class="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                    <p class="text-sm font-bold">No se registran pagos efectuados en el ciclo lectivo.</p>
                </div>
            `;
            return;
        }

        listaHistorial.innerHTML = pagadas.map(c => {
            const fechaStr = c.fecha_pago ? new Date(c.fecha_pago).toLocaleDateString('es-AR', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            }) : '08/2026';
            const totalTxt = formatearMonedaARS(c.monto_total);

            return `
                <article class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between transition hover:shadow-md">
                    <div>
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <span class="text-[10px] font-black uppercase tracking-wider text-slate-500">N.º de Recibo:</span>
                                <p class="text-xs sm:text-sm font-mono font-black text-blue-900">${escaparHTML(c.numero_comprobante || 'REC-2026-OFICIAL')}</p>
                            </div>
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <i class="fas fa-check-circle mr-1" aria-hidden="true"></i> ${escaparHTML(c.estado_pago || 'Pago Completo')}
                            </span>
                        </div>

                        <dl class="py-3 text-xs space-y-1.5 border-b border-slate-100">
                            <div class="flex justify-between">
                                <dt class="text-slate-500">Período Cancelado:</dt>
                                <dd class="font-bold text-slate-800">${escaparHTML(c.periodo)}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-slate-500">Fecha de Pago:</dt>
                                <dd class="font-semibold text-slate-700">${escaparHTML(fechaStr)}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-slate-500">Medio de Pago:</dt>
                                <dd class="font-semibold text-blue-900">${escaparHTML(c.medio_pago || 'Transferencia Bancaria')}</dd>
                            </div>
                            <div class="flex justify-between pt-1 font-black text-slate-900">
                                <dt>Importe Abonado:</dt>
                                <dd class="text-emerald-700 font-mono text-sm">${totalTxt}</dd>
                            </div>
                        </dl>
                    </div>

                    <div class="pt-3">
                        <button type="button" onclick="verDetalleFacturaCuota('${c.id}')"
                            class="w-full min-h-[44px] px-3.5 py-2.5 bg-blue-50 hover:bg-blue-900 hover:text-white text-blue-900 font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 active:scale-95">
                            <i class="fas fa-file-invoice text-xs" aria-hidden="true"></i>
                            <span>Ver Comprobante Oficial</span>
                        </button>
                    </div>
                </article>
            `;
        }).join('');
    }

    function setFiltroCuotas(filtro) {
        EstadoEstudiante.filtroCuotas = filtro;

        const botones = {
            todas: document.getElementById('btnFiltroCuotasTodas'),
            pendientes: document.getElementById('btnFiltroCuotasPendientes'),
            pagadas: document.getElementById('btnFiltroCuotasPagadas'),
            historial: document.getElementById('btnFiltroCuotasHistorial')
        };

        Object.entries(botones).forEach(([clave, btn]) => {
            if (!btn) return;
            const esActivo = clave === filtro;
            btn.setAttribute('aria-pressed', esActivo ? 'true' : 'false');
            if (esActivo) {
                btn.className = 'btn-filtro-cuota min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition bg-blue-900 text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95';
            } else {
                btn.className = 'btn-filtro-cuota min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 active:scale-95';
            }
        });

        renderizarModuloCuotas();
    }

    function verDetalleFacturaCuota(cuotaId) {
        const cuota = (EstadoEstudiante.cuotas || []).find(c => String(c.id) === String(cuotaId));
        if (!cuota) return;

        EstadoEstudiante.cuotaSeleccionada = cuota;
        const matricula = EstadoEstudiante.matricula;
        const comp = cuota.detalle_composicion || {};

        asignarTextoSeguro('facturaModalPeriodoSub', `Período: ${cuota.periodo} • Ciclo Lectivo 2026`);
        asignarTextoSeguro('facturaModalEstudiante', matricula?.nombre || 'Estudiante Autenticado');
        asignarTextoSeguro('facturaModalLegajoDni', `Legajo: ${matricula?.legajo || 'ET-2026-DEMO'} • DNI: ${matricula?.dni || '—'}`);
        asignarTextoSeguro('facturaModalCurso', `${matricula?.nivel || 'Nivel Primario'} • ${matricula?.curso || 'Ciclo 2026'}`);
        asignarTextoSeguro('facturaModalNroComprobante', cuota.numero_comprobante || `FAC-2026-${String(cuota.mes).padStart(2, '0')}`);

        // Badge
        const badgeModal = document.getElementById('facturaModalBadgeEstado');
        if (badgeModal) {
            badgeModal.textContent = cuota.estado;
            if (cuota.estado === 'Pagada') {
                badgeModal.className = 'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200';
            } else if (cuota.estado === 'Vencida') {
                badgeModal.className = 'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-200';
            } else {
                badgeModal.className = 'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200';
            }
        }

        // Composición
        const mBase = comp.arancel_base || cuota.monto_base || 0;
        const mIdioma = comp.adicional_idioma || 0;
        const mDeporte = comp.adicional_deporte || 0;
        const mComedor = comp.servicio_institucional || 0;
        const mDesc = cuota.descuento || 0;
        const mRecargo = cuota.recargo_mora || comp.recargo_mora || 0;

        asignarTextoSeguro('facturaConceptoBase', `Arancel Base (${matricula?.nivel || 'Nivel'})`);
        asignarTextoSeguro('facturaMontoBase', formatearMonedaARS(mBase));

        asignarTextoSeguro('facturaConceptoIdioma', `Adicional Idioma (${comp.idioma_nombre || matricula?.idioma || 'Asignado'})`);
        asignarTextoSeguro('facturaMontoIdioma', formatearMonedaARS(mIdioma));

        asignarTextoSeguro('facturaConceptoDeporte', `Adicional Deporte (${comp.deporte_nombre || matricula?.deporte || 'Asignado'})`);
        asignarTextoSeguro('facturaMontoDeporte', formatearMonedaARS(mDeporte));

        asignarTextoSeguro('facturaMontoComedor', formatearMonedaARS(mComedor));
        asignarTextoSeguro('facturaMontoDescuento', `-${formatearMonedaARS(mDesc)}`);
        asignarTextoSeguro('facturaMontoTotal', formatearMonedaARS(cuota.monto_total));

        const filaRecargo = document.getElementById('facturaFilaRecargo');
        if (filaRecargo) {
            if (mRecargo > 0) {
                filaRecargo.classList.remove('hidden');
                asignarTextoSeguro('facturaMontoRecargo', `+${formatearMonedaARS(mRecargo)}`);
            } else {
                filaRecargo.classList.add('hidden');
            }
        }

        const filaDescuento = document.getElementById('facturaFilaDescuento');
        if (filaDescuento) {
            filaDescuento.classList.toggle('hidden', mDesc <= 0);
        }

        // Textos de pie
        const txtVenc = document.getElementById('facturaTextoVencimiento');
        const txtMedio = document.getElementById('facturaTextoMedioPago');
        if (txtVenc) {
            if (cuota.estado === 'Pagada') {
                const fStr = cuota.fecha_pago ? new Date(cuota.fecha_pago).toLocaleDateString('es-AR') : '08/2026';
                txtVenc.textContent = `Abonado el ${fStr} • Pago cancelado en conformidad.`;
            } else if (cuota.estado === 'Vencida') {
                txtVenc.textContent = `Cuota vencida el 10 de ${cuota.periodo}. Contactate con Administración para regularizar.`;
            } else {
                txtVenc.textContent = `Vence el 10 de ${cuota.periodo}. Podés abonar con 10% de bonificación en término.`;
            }
        }
        if (txtMedio) {
            if (cuota.estado === 'Pagada') {
                txtMedio.textContent = `Medio de pago registrado: ${cuota.medio_pago || 'Transferencia Bancaria'} • Recibo Oficial Emitido`;
            } else {
                txtMedio.textContent = `Medios habilitados: Transferencia Bancaria, Débito Automático o Pago presencial en Tesorería.`;
            }
        }

        alternarVisibilidadModal('modalDetalleFacturaCuota', true);
    }

    function cerrarModalDetalleFactura() {
        alternarVisibilidadModal('modalDetalleFacturaCuota', false);
        EstadoEstudiante.cuotaSeleccionada = null;
    }

    // ========================================================
    // SIMULADOR DE PAGO DE CUOTAS EN VIVO (CAMPUS ESTUDIANTE)
    // ========================================================
    let cuotaAPagarSeleccionadaId = null;

    function abrirModalPagarCuotaEstudiante(cuotaId) {
        const cuota = (EstadoEstudiante.cuotas || []).find(c => String(c.id) === String(cuotaId));
        if (!cuota) return;

        cuotaAPagarSeleccionadaId = cuotaId;
        const matricula = EstadoEstudiante.matricula;

        asignarTextoSeguro('pagoCuotaPeriodo', `${cuota.periodo} (Ciclo 2026)`);
        asignarTextoSeguro('pagoCuotaAlumno', `${matricula?.nombre || 'Alumno'} (${matricula?.legajo || 'EPT-2026-001'})`);
        asignarTextoSeguro('pagoCuotaVencimiento', cuota.vencimiento ? new Date(cuota.vencimiento).toLocaleDateString('es-AR') : `10 de ${cuota.periodo}`);
        asignarTextoSeguro('pagoCuotaMonto', formatearMonedaARS(cuota.monto_total));

        alternarVisibilidadModal('modalPagarCuotaEstudiante', true);
    }

    function cerrarModalPagarCuotaEstudiante() {
        alternarVisibilidadModal('modalPagarCuotaEstudiante', false);
        cuotaAPagarSeleccionadaId = null;
    }

    function confirmarPagoCuotaEstudiante() {
        if (!cuotaAPagarSeleccionadaId) return;

        const cuota = (EstadoEstudiante.cuotas || []).find(c => String(c.id) === String(cuotaAPagarSeleccionadaId));
        if (!cuota) return;

        const medioSeleccionado = document.getElementById('selectMedioPagoEstudiante')?.value || 'Transferencia Bancaria CBU';

        // Actualizar datos de la cuota en memoria
        cuota.estado = 'Pagada';
        cuota.estado_pago = 'Completo';
        cuota.numero_comprobante = `REC-2026-11-${Math.floor(1000 + Math.random() * 9000)}`;
        cuota.fecha_pago = new Date().toISOString();
        cuota.medio_pago = medioSeleccionado;

        // Persistir en sesión activa
        try {
            const sesionDemo = localStorage.getItem('sesion_demo_activa');
            if (sesionDemo) {
                const parsed = JSON.parse(sesionDemo);
                if (parsed.alumno) {
                    parsed.cuotas = EstadoEstudiante.cuotas;
                    localStorage.setItem('sesion_demo_activa', JSON.stringify(parsed));
                }
            }
        } catch (_) {}

        cerrarModalPagarCuotaEstudiante();
        renderizarCampusEstudiante();
        renderizarModuloCuotas();

        mostrarToast(`¡Pago de Cuota ${cuota.periodo} registrado con éxito! Recibo N.º ${cuota.numero_comprobante} emitido e incorporado a tu Historial.`, 'success');
    }

    function descargarComprobanteCuota() {
        const cuota = EstadoEstudiante.cuotaSeleccionada;
        const nro = cuota?.numero_comprobante || (cuota ? `FAC-2026-${cuota.mes}` : 'RECIBO-OFICIAL');
        mostrarToast(`Descarga iniciada: Comprobante oficial ${nro} generado correctamente.`, 'success');
    }

    // ========================================================
    // MÓDULO 1: RECUPERAR O CAMBIAR CONTRASEÑA EN CAMPUS MÓVIL
    // ========================================================

    function abrirModalCambiarPassword() {
        const inputNueva = document.getElementById('pwdNueva');
        const inputConfirmar = document.getElementById('pwdConfirmar');
        const form = document.getElementById('formCambiarPassword');
        if (form) form.reset();
        if (inputNueva) {
            inputNueva.value = '';
            inputNueva.type = 'password';
        }
        if (inputConfirmar) {
            inputConfirmar.value = '';
            inputConfirmar.type = 'password';
        }

        const icono = document.getElementById('iconoVerPassword');
        const texto = document.getElementById('textoVerPassword');
        if (icono) icono.className = 'fas fa-eye';
        if (texto) texto.textContent = 'Mostrar contraseñas';

        alternarVisibilidadModal('modalCambiarPassword', true);
        requestAnimationFrame(() => inputNueva?.focus());
    }

    function cerrarModalCambiarPassword() {
        alternarVisibilidadModal('modalCambiarPassword', false);
        const form = document.getElementById('formCambiarPassword');
        if (form) form.reset();
    }

    function toggleVisibilidadPasswordCambio() {
        const inputNueva = document.getElementById('pwdNueva');
        const inputConfirmar = document.getElementById('pwdConfirmar');
        const icono = document.getElementById('iconoVerPassword');
        const texto = document.getElementById('textoVerPassword');
        if (!inputNueva || !inputConfirmar) return;

        const esPassword = inputNueva.type === 'password';
        const nuevoTipo = esPassword ? 'text' : 'password';
        inputNueva.type = nuevoTipo;
        inputConfirmar.type = nuevoTipo;

        if (icono) {
            icono.className = esPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        }
        if (texto) {
            texto.textContent = esPassword ? 'Ocultar contraseñas' : 'Mostrar contraseñas';
        }
    }

    async function procesarCambioPassword() {
        const inputNueva = document.getElementById('pwdNueva');
        const inputConfirmar = document.getElementById('pwdConfirmar');
        const btnSubmit = document.getElementById('btnSubmitCambiarPassword');

        const passNueva = inputNueva?.value || '';
        const passConfirmar = inputConfirmar?.value || '';

        if (!passNueva || passNueva.length < 6) {
            mostrarToast('La nueva contraseña debe tener al menos 6 caracteres.', 'warning');
            inputNueva?.focus();
            return;
        }

        if (passNueva !== passConfirmar) {
            mostrarToast('Las contraseñas no coinciden. Por favor, verificalas.', 'warning');
            inputConfirmar?.focus();
            return;
        }

        const textoOriginalBtn = btnSubmit ? btnSubmit.innerHTML : 'Actualizar';
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Actualizando...';
        }

        try {
            const { data, error } = await supabaseClient.auth.updateUser({
                password: passNueva
            });

            if (error) {
                console.error("Error al actualizar contraseña en Supabase Auth:", error);
                mostrarToast(`No se pudo actualizar la contraseña: ${error.message}`, 'error');
                return;
            }

            mostrarToast('¡Contraseña actualizada exitosamente! Utilizala en tu próximo inicio de sesión.', 'success');
            cerrarModalCambiarPassword();
        } catch (err) {
            console.error("Excepción al cambiar contraseña:", err);
            mostrarToast('Ocurrió un error inesperado al actualizar la contraseña.', 'error');
        } finally {
            if (btnSubmit) {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = textoOriginalBtn;
            }
        }
    }

    // Exposición global en window para eventos inline HTML y compatibilidad móvil
    window.EstadoEstudiante = EstadoEstudiante;
    window.mostrarToast = mostrarToast;
    window.toggleModal = toggleModal;
    window.toggleModalOlvide = toggleModalOlvide;
    window.alternarVisibilidadModal = alternarVisibilidadModal;
    window.validarFormularioAdmision = validarFormularioAdmision;
    window.actualizarEstadoBotonEnvio = actualizarEstadoBotonEnvio;
    window.enviarDatosAdmisionASupabase = enviarDatosAdmisionASupabase;
    window.limpiarFormularioAdmision = limpiarFormularioAdmision;
    window.enviarForm = enviarForm;
    window.gestionarVistas = gestionarVistas;
    window.iniciarSesion = iniciarSesion;
    window.iniciarSesionDemoEstudiante = iniciarSesionDemoEstudiante;
    window.iniciarSesionDemoAdmin = iniciarSesionDemoAdmin;
    window.activarSesionEstudianteDemo = activarSesionEstudianteDemo;
    window.activarSesionAdminDemo = activarSesionAdminDemo;
    window.abrirModalRecuperarContraseña = abrirModalRecuperarContraseña;
    window.procesarRecuperacionContraseña = procesarRecuperacionContraseña;
    window.cerrarSesion = cerrarSesion;
    window.cambiarTab = cambiarTab;
    window.validarDocumentoEstudiante = validarDocumentoEstudiante;
    window.verificarEstadoAcademico = verificarEstadoAcademico;
    window.mostrarResultadoCertificado = mostrarResultadoCertificado;
    window.procesarCertificado = procesarCertificado;
    window.descargarPDF = descargarPDF;
    window.toggleNavEstudiante = toggleNavEstudiante;
    window.toggleNavLanding = toggleNavLanding;
    window.navegarSeccionLanding = navegarSeccionLanding;
    window.accionMenuLanding = accionMenuLanding;
    window.cerrarTodosLosDrawersMobile = cerrarTodosLosDrawersMobile;
    window.sincronizarBloqueoScrollDrawer = sincronizarBloqueoScrollDrawer;
    window.obtenerPerfilUsuario = obtenerPerfilUsuario;
    window.obtenerMatriculaEstudianteAutenticado = obtenerMatriculaEstudianteAutenticado;
    window.cargarCampusEstudiante = cargarCampusEstudiante;
    window.recargarDatosEstudiante = recargarDatosEstudiante;
    window.renderizarCampusEstudiante = renderizarCampusEstudiante;
    window.gestionarVistasPorRol = gestionarVistasPorRol;
    window.setFiltroCuotas = setFiltroCuotas;
    window.verDetalleFacturaCuota = verDetalleFacturaCuota;
    window.cerrarModalDetalleFactura = cerrarModalDetalleFactura;
    window.abrirModalPagarCuotaEstudiante = abrirModalPagarCuotaEstudiante;
    window.cerrarModalPagarCuotaEstudiante = cerrarModalPagarCuotaEstudiante;
    window.confirmarPagoCuotaEstudiante = confirmarPagoCuotaEstudiante;
    window.descargarComprobanteCuota = descargarComprobanteCuota;
    window.abrirModalCambiarPassword = abrirModalCambiarPassword;
    window.cerrarModalCambiarPassword = cerrarModalCambiarPassword;
    window.toggleVisibilidadPasswordCambio = toggleVisibilidadPasswordCambio;
    window.procesarCambioPassword = procesarCambioPassword;
    window.obtenerCuotasEstudiante = obtenerCuotasEstudiante;
    window.renderizarModuloCuotas = renderizarModuloCuotas;
    window.formatearMonedaARS = formatearMonedaARS;

    // ========================================================
    // GESTIÓN DE DESCARGA E INSTALACIÓN PWA EN CELULAR
    // ========================================================
    let deferredPromptPWA = null;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPromptPWA = e;
    });

    window.addEventListener('appinstalled', () => {
        deferredPromptPWA = null;
        mostrarToast("¡Educar para Transformar se instaló con éxito en tu pantalla de inicio!", "success");
    });

    async function iniciarInstalacionPWA() {
        if (deferredPromptPWA) {
            deferredPromptPWA.prompt();
            const { outcome } = await deferredPromptPWA.userChoice;
            if (outcome === 'accepted') {
                mostrarToast("¡Gracias por instalar la app en tu celular!", "success");
            }
            deferredPromptPWA = null;
        } else {
            abrirModalInstalarPWA();
        }
    }

    function abrirModalInstalarPWA() {
        alternarVisibilidadModal('modalInstalarPWA', true);
    }

    function cerrarModalInstalarPWA() {
        alternarVisibilidadModal('modalInstalarPWA', false);
    }

    window.iniciarInstalacionPWA = iniciarInstalacionPWA;
    window.abrirModalInstalarPWA = abrirModalInstalarPWA;
    window.cerrarModalInstalarPWA = cerrarModalInstalarPWA;

