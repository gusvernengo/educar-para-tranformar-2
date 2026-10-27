    // 1. Inicializar Supabase (Mantenemos tus credenciales reales)
    const supabaseUrl = 'https://qynsmxiarnanqtxefltu.supabase.co';
    const supabaseKey = 'sb_publishable_iy7O34nEqp_zVcWzet7tCQ_1mGOgGQy';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    window.supabaseClient = supabaseClient;

    // Mejora C y A: Función única para gestionar todos los modales
    function toggleModal(mostrar) {
        const modalLogin = document.getElementById('modalLogin');
        if (mostrar) {
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
            document.body.style.overflow = 'hidden';
        } else {
            elemento.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // 2. Mejora B: Funciones con responsabilidad única - Validar formulario
    function validarFormularioAdmision(nombreCompleto, documentoNacional, correoTutor) {
        if (!nombreCompleto || !documentoNacional || !correoTutor) {
            alert('Por favor, completa los campos obligatorios (Nombre, DNI, Email).');
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

        alert(resultado.mensaje);
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

        // 5. Pestaña Certificados (#tabCertificados) — Reiniciar estado hasta verificación explícita
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
        EstadoEstudiante.cargando = false;
        renderizarCampusEstudiante();
    }

    async function recargarDatosEstudiante() {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (!session?.user) {
                await gestionarVistasPorRol(null);
                return;
            }
            await cargarCampusEstudiante(session.user, EstadoEstudiante.perfil);
        } catch (err) {
            console.error("Error al recargar datos del estudiante:", err);
        }
    }

    // Gestión dinámica de vistas según el rol del usuario (public.profiles.role)
    async function gestionarVistasPorRol(usuario) {
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

            alert("No se pudo determinar el perfil de acceso. Contacte al administrador.");
        }
    }

    // Alias para compatibilidad con llamadas existentes
    function gestionarVistas(usuario) {
        return gestionarVistasPorRol(usuario);
    }

    // ========================================================
    // Autenticación con nombres significativos y roles
    // ========================================================
    async function iniciarSesion() {
        const correoUsuario = document.getElementById('loginEmail').value.trim();
        const contraseñaUsuario = document.getElementById('loginPassword').value;

        if (!correoUsuario || !contraseñaUsuario) {
            alert('Por favor, ingresa tu correo y contraseña.');
            return;
        }

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: correoUsuario,
                password: contraseñaUsuario,
            });

            if (error) throw error;

            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            toggleModal(false);
            await gestionarVistasPorRol(data.user);

        } catch (error) {
            console.error("Error de autenticación:", error.message);
            const mensajeError = error.message === "Invalid login credentials" 
                ? 'Credenciales inválidas. Verifica el correo o la contraseña.'
                : 'Error al intentar ingresar: ' + error.message;
            alert(mensajeError);
        }
    }

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
            alert("Por favor, introduce tu dirección de correo electrónico.");
            return;
        }

        alternarVisibilidadModal('modalOlvidePassword', false);
        alternarVisibilidadModal('modalExitoRecuperacion', true);
    }

    // Cerrar sesión del usuario de forma completa
    async function cerrarSesion() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
            await gestionarVistasPorRol(null);
            alert('Sesión cerrada correctamente.');
        } catch (error) {
            alert('Error al cerrar sesión: ' + error.message);
        }
    }

    // Persistencia de sesión al recargar la página basada en Supabase Auth y Profiles
    window.addEventListener('DOMContentLoaded', async () => {
        try {
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

    // Soporte de tecla Escape para modales públicos
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
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
        }
    });

    // Toggle de navegación del panel de estudiante en móviles
    function toggleNavEstudiante() {
        const navMenu = document.getElementById('navEstudianteMenu');
        const navFooter = document.getElementById('navEstudianteFooter');
        const btnToggle = document.getElementById('btnToggleNavEstudiante');
        if (!navMenu) return;

        const estaOculto = navMenu.classList.contains('hidden');
        if (estaOculto) {
            navMenu.classList.remove('hidden');
            if (navFooter) navFooter.classList.remove('hidden');
            if (btnToggle) btnToggle.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.classList.add('hidden');
            if (navFooter) navFooter.classList.add('hidden');
            if (btnToggle) btnToggle.setAttribute('aria-expanded', 'false');
        }
    }

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

        // En pantallas móviles, colapsar el menú al cambiar de pestaña
        if (window.innerWidth < 768) {
            const navMenu = document.getElementById('navEstudianteMenu');
            const navFooter = document.getElementById('navEstudianteFooter');
            const btnToggle = document.getElementById('btnToggleNavEstudiante');
            if (navMenu) navMenu.classList.add('hidden');
            if (navFooter) navFooter.classList.add('hidden');
            if (btnToggle) btnToggle.setAttribute('aria-expanded', 'false');
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
    }

    function descargarPDF() {
        alert("Aviso institucional: La emisión de certificados con firma digital y descarga PDF no se encuentra habilitada en esta versión. Solicite la constancia sellada en Secretaría Académica.");
    }

    // Exposición global en window para eventos inline HTML y compatibilidad móvil
    window.EstadoEstudiante = EstadoEstudiante;
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
    window.obtenerPerfilUsuario = obtenerPerfilUsuario;
    window.obtenerMatriculaEstudianteAutenticado = obtenerMatriculaEstudianteAutenticado;
    window.cargarCampusEstudiante = cargarCampusEstudiante;
    window.recargarDatosEstudiante = recargarDatosEstudiante;
    window.renderizarCampusEstudiante = renderizarCampusEstudiante;
    window.gestionarVistasPorRol = gestionarVistasPorRol;

