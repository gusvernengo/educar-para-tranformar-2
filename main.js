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

    // Gestión dinámica de vistas según el rol del usuario (public.profiles.role)
    async function gestionarVistasPorRol(usuario) {
        const vistaLanding = document.getElementById('vistaLanding');
        const vistaPanel = document.getElementById('vistaPanel');
        const vistaAdmin = document.getElementById('vistaAdmin');

        if (!usuario) {
            // Usuario no autenticado: mostrar únicamente la Landing Page
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

            // Sincronizar solicitudes reales de admisión desde Supabase
            if (typeof window.cargarSolicitudesAdmin === 'function') {
                await window.cargarSolicitudesAdmin();
            }
        } else if (rol === 'estudiante') {
            // Rol Estudiante: acceso al Campus del Estudiante
            vistaLanding?.classList.add('hidden');
            vistaAdmin?.classList.add('hidden');
            vistaPanel?.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const emailElement = document.getElementById('panelUserEmail');
            const avatarElement = document.getElementById('userAvatarInitials');
            const userEmail = usuario.email || perfil?.email;

            if (emailElement) {
                emailElement.innerText = userEmail || 'Usuario';
            }

            if (avatarElement) {
                avatarElement.innerText = userEmail
                    ? userEmail.charAt(0).toUpperCase()
                    : 'U';
            }
        } else {
            // Perfil inexistente, error de consulta o rol desconocido
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
    }

    // Toggle de navegación del panel de estudiante en móviles
    function toggleNavEstudiante() {
        const navMenu = document.getElementById('navEstudianteMenu');
        const navFooter = document.getElementById('navEstudianteFooter');
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

    // Control de pestañas del panel con legibilidad mejorada y soporte para cursos/pagos
    function cambiarTab(tabSeleccionada) {
        const pestanasDisponibles = ['inicio', 'cursos', 'pagos', 'certificados'];

        pestanasDisponibles.forEach(nombrePestana => {
            const containerPestana = document.getElementById(`tab${nombrePestana.charAt(0).toUpperCase() + nombrePestana.slice(1)}`);
            const botonPestana = document.getElementById(`btn-tab-${nombrePestana}`);

            if (nombrePestana === tabSeleccionada) {
                if (containerPestana) containerPestana.classList.remove('hidden');
                if (botonPestana) {
                    botonPestana.classList.add('bg-blue-800', 'text-white');
                    botonPestana.classList.remove('text-blue-200', 'hover:bg-blue-800');
                }
            } else {
                if (containerPestana) containerPestana.classList.add('hidden');
                if (botonPestana) {
                    botonPestana.classList.remove('bg-blue-800', 'text-white');
                    botonPestana.classList.add('text-blue-200', 'hover:bg-blue-800');
                }
            }
        });

        // En pantallas móviles, colapsar el menú al cambiar de pestaña
        if (window.innerWidth < 768) {
            const navMenu = document.getElementById('navEstudianteMenu');
            const navFooter = document.getElementById('navEstudianteFooter');
            if (navMenu) navMenu.classList.add('hidden');
            if (navFooter) navFooter.classList.add('hidden');
        }
    }

    // Mejora A: Módulo de certificados - Responsabilidad única
    function validarDocumentoEstudiante(numeroDocumentoOLegajo) {
        return numeroDocumentoOLegajo.trim() !== "";
    }

    function verificarEstadoAcademico(numeroDocumentoOLegajo) {
        // En un entorno real, esto consultaría la BD
        return true; // Simula que el estudiante es regular
    }

    function mostrarResultadoCertificado(esValido) {
        const resultadoDiv = document.getElementById('resultadoCertificado');
        if (esValido) {
            resultadoDiv.classList.remove('hidden');
        } else {
            resultadoDiv.classList.add('hidden');
        }
    }

    // Mejora B: Procesamiento de certificado con responsabilidad única
    function procesarCertificado() {
        const numeroDocumentoOLegajo = document.getElementById('certDocumento').value;

        if (!validarDocumentoEstudiante(numeroDocumentoOLegajo)) {
            alert("Por favor, ingrese su número de documento o legajo.");
            return;
        }

        const estadoEsRegular = verificarEstadoAcademico(numeroDocumentoOLegajo);
        if (!estadoEsRegular) {
            alert("Error: El alumno no posee estado regular. No se puede emitir certificado.");
            mostrarResultadoCertificado(false);
            return;
        }

        mostrarResultadoCertificado(true);
    }

    // Mejora D: Legibilidad - función clara con propósito único
    function descargarPDF() {
        alert("Generando documento PDF con firma digital institucional...\nSu descarga comenzará en breve.");
    }

    // Exposición global en window para eventos inline HTML y compatibilidad móvil
    window.toggleModal = toggleModal;
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
    window.gestionarVistasPorRol = gestionarVistasPorRol;

