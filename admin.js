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

    // Alumnos regulares del Centro (Hidratados con RF-10, RF-11, RF-12, RF-14 y RF-20)
    alumnos: [
        {
            id: 1,
            legajo: 'EPT-2026-001',
            nombre: 'Ignacio Benjamín Acosta',
            dni: '45.123.456',
            nivel: 'Secundario',
            curso: '3° Año "A"',
            horarioCursado: 'Lun a Vie 07:30 a 15:30 hs',
            tutor: 'Mariana Gómez de Acosta',
            tutorDni: '32.114.560',
            tutorEmail: 'mariana.acosta@gmail.com',
            hermanos: ['Sofía Acosta (Sala de 4 Años)'],
            idioma: 'Inglés Avanzado / Francés',
            deporte: 'Natación, Vóleibol',
            deportesAsignados: [
                { grupoId: 'GRP-SEC-NAT', deporte: 'Natación', nivel: 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000 },
                { grupoId: 'GRP-SEC-VOL', deporte: 'Vóleibol', nivel: 'Secundario', horario: 'Mar y Jue 16:00 a 17:30 hs', profesor: 'Prof. Daniela Ríos', monto: 15000 }
            ],
            transporte: 'Línea 1 - Zona Norte',
            parada: 'Av. Sarmiento y Av. Laprida',
            comedor: 'Menú General Balanceado',
            materiasCursado: ['Matemática III', 'Lengua y Literatura', 'Física y Química', 'Historia Moderna', 'Robótica y Programación', 'Inglés Bilingüe'],
            regularidad: 'Regular',
            asistencia: '96.5%'
        },
        {
            id: 2,
            legajo: 'A123456',
            nombre: 'Agustín Gómez Valenzuela',
            dni: '46.963.180',
            nivel: 'Secundario',
            curso: '2° Año "A"',
            horarioCursado: 'Lun a Vie 07:30 a 15:30 hs',
            tutor: 'Carlos Gómez',
            tutorDni: '29.884.120',
            tutorEmail: 'carlos.gomez@gmail.com',
            hermanos: ['Joaquín Ignacio Gómez (EPT-2026-0018)'],
            idioma: 'Inglés Avanzado',
            deporte: 'Fútbol',
            deportesAsignados: [
                { grupoId: 'GRP-SEC-FUT', deporte: 'Fútbol', nivel: 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Marcelo Gómez', monto: 15000 }
            ],
            transporte: 'Línea 2 - Zona Sur',
            parada: 'Av. Castelli 1250',
            comedor: 'Menú General Balanceado',
            materiasCursado: ['Matemática II', 'Lengua y Literatura', 'Biología', 'Geografía Argentina', 'Informática Aplicada', 'Inglés Bilingüe'],
            regularidad: 'Regular',
            asistencia: '97.5%'
        },
        {
            id: 3,
            legajo: 'EPT-2026-042',
            nombre: 'Tomás Valentín Benítez',
            dni: '48.921.340',
            nivel: 'Primario',
            curso: '4° Grado "B"',
            horarioCursado: 'Lun a Vie 07:45 a 15:15 hs',
            tutor: 'Valeria Soledad Benítez',
            tutorDni: '34.550.210',
            tutorEmail: 'valeria.benitez@gmail.com',
            hermanos: ['Camila Benítez (EPT-2026-0033)'],
            idioma: 'Inglés Inicial',
            deporte: 'Básquet',
            deportesAsignados: [
                { grupoId: 'GRP-PRI-BAS', deporte: 'Básquet', nivel: 'Primario', horario: 'Mar y Jue 16:00 a 17:30 hs', profesor: 'Prof. Alejandro Rossi', monto: 15000 }
            ],
            transporte: 'Sin transporte',
            parada: 'Retiro particular',
            comedor: 'Menú General Balanceado',
            materiasCursado: ['Matemática', 'Prácticas del Lenguaje', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés Intensivo', 'Educación Artística'],
            regularidad: 'Regular',
            asistencia: '98.0%'
        },
        {
            id: 4,
            legajo: 'ALU-001',
            nombre: 'Lucía Milagros Esquivel',
            dni: '47.112.980',
            nivel: 'Secundario',
            curso: '1° Año "C"',
            horarioCursado: 'Lun a Vie 07:30 a 15:30 hs',
            tutor: 'Marcos Esquivel',
            tutorDni: '31.009.442',
            tutorEmail: 'marcos.esquivel@chaco.edu.ar',
            hermanos: [],
            idioma: 'Inglés / Francés',
            deporte: 'Natación',
            deportesAsignados: [
                { grupoId: 'GRP-SEC-NAT', deporte: 'Natación', nivel: 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000 }
            ],
            transporte: 'Línea 3 - Zona Centro',
            parada: 'Av. 25 de Mayo 850',
            comedor: 'Menú 100% Vegetariano',
            materiasCursado: ['Matemática I', 'Lengua y Literatura', 'Ciencias de la Tierra', 'Historia Antigua', 'Francés I', 'Inglés I'],
            regularidad: 'Regular',
            asistencia: '94.2%'
        },
        {
            id: 5,
            legajo: 'ET-2026-003',
            nombre: 'Mateo Bosch Vesconi',
            dni: '52.880.145',
            nivel: 'Inicial',
            curso: 'Sala de 5 Años',
            horarioCursado: 'Lun a Vie 08:00 a 15:00 hs',
            tutor: 'Romina Vesconi',
            tutorDni: '35.780.900',
            tutorEmail: 'romi.vesconi@outlook.com',
            hermanos: ['Bautista Bosch Vesconi (Sala de 3 Años)'],
            idioma: 'Inglés Lúdico',
            deporte: 'Gimnasia Artística',
            deportesAsignados: [
                { grupoId: 'GRP-INI-GIM', deporte: 'Gimnasia Artística', nivel: 'Inicial', horario: 'Mar y Jue 16:00 a 17:30 hs', profesor: 'Prof. Elena Martínez', monto: 15000 }
            ],
            transporte: 'Línea 1 - Zona Norte',
            parada: 'Los Troncos • Calle 4 N° 320',
            comedor: 'Menú Apto Celíaco (Sin TACC)',
            materiasCursado: ['Expresión Corporal y Motricidad', 'Iniciación Musical', 'Inglés Lúdico Audio-Oral', 'Exploración del Ambiente', 'Taller de Arte'],
            regularidad: 'Regular',
            asistencia: '99.0%'
        },
        {
            id: 6,
            legajo: 'EPT-2026-0088',
            nombre: 'Bruno Valenzuela',
            dni: '46.220.890',
            nivel: 'Secundario',
            curso: '2° Año "A"',
            horarioCursado: 'Lun a Vie 07:30 a 15:30 hs',
            tutor: 'Carlos Valenzuela',
            tutorDni: '28.440.110',
            tutorEmail: 'carlos.valenzuela@gmail.com',
            hermanos: [],
            idioma: 'Portugués',
            deporte: 'Fútbol',
            deportesAsignados: [
                { grupoId: 'GRP-SEC-FUT', deporte: 'Fútbol', nivel: 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Marcelo Gómez', monto: 15000 }
            ],
            transporte: 'Línea 2 - Zona Sur',
            parada: 'Hospital Perrando • Entrada Este',
            comedor: 'Menú General Balanceado',
            materiasCursado: ['Matemática II', 'Lengua y Literatura', 'Biología', 'Portugués Cultural', 'Informática Aplicada'],
            regularidad: 'Condicional',
            asistencia: '88.5%'
        },
        {
            id: 7,
            legajo: 'EPT-2026-0054',
            nombre: 'Valentina Morales',
            dni: '49.310.220',
            nivel: 'Primario',
            curso: '4° Grado "B"',
            horarioCursado: 'Lun a Vie 07:45 a 15:15 hs',
            tutor: 'Andrea Morales',
            tutorDni: '33.190.450',
            tutorEmail: 'andrea.morales@gmail.com',
            hermanos: [],
            idioma: 'Inglés',
            deporte: 'Natación',
            deportesAsignados: [
                { grupoId: 'GRP-PRI-NAT', deporte: 'Natación', nivel: 'Primario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000 }
            ],
            transporte: 'Línea 3 - Zona Centro',
            parada: 'Plaza 25 de Mayo • Esquina Güemes',
            comedor: 'Menú General Balanceado',
            materiasCursado: ['Matemática', 'Prácticas del Lenguaje', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés Intensivo'],
            regularidad: 'Regular',
            asistencia: '95.0%'
        },
        {
            id: 8,
            legajo: 'EPT-2026-0018',
            nombre: 'Joaquín Ignacio Gómez',
            dni: '50.114.776',
            nivel: 'Primario',
            curso: '3° Grado "A"',
            horarioCursado: 'Lun a Vie 07:45 a 15:15 hs',
            tutor: 'Carlos Gómez',
            tutorDni: '29.884.120',
            tutorEmail: 'carlos.gomez@gmail.com',
            hermanos: ['Agustín Gómez Valenzuela (A123456)'],
            idioma: 'Inglés',
            deporte: 'Ajedrez Formativo',
            deportesAsignados: [
                { grupoId: 'GRP-PRI-AJE', deporte: 'Ajedrez Formativo', nivel: 'Primario', horario: 'Sáb 10:00 a 12:00 hs', profesor: 'Prof. Alejandro Rossi', monto: 15000 }
            ],
            transporte: 'Línea 4 - Zona Este / Fontana',
            parada: 'Av. Alvear y Santa María de Oro',
            comedor: 'Sin Comedor',
            materiasCursado: ['Matemática', 'Lengua', 'Ciencias Naturales', 'Inglés', 'Ajedrez Escolar'],
            regularidad: 'Regular',
            asistencia: '97.2%'
        }
    ],

    filtroDocenteNivel: 'todos',

    // Docentes, autoridades y especialistas (RF-05, RF-06, RF-07)
    docentes: [
        {
            legajo: 'DOC-2026-01',
            dni: '27.450.112',
            nombre: 'Lic. Carolina Ileana Vargas',
            rol: 'Directora General / Gestión Académica',
            area: 'Autoridades',
            nivel: 'Todos los niveles',
            email: 'direccion@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-02',
            dni: '30.118.920',
            nombre: 'Prof. Martín Aranda',
            rol: 'Profesor de Matemática, Física y Robótica',
            area: 'Tecnología y Ciencias',
            nivel: 'Secundario',
            email: 'm.aranda@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-03',
            dni: '32.890.441',
            nombre: 'Prof. Laura Giménez',
            rol: 'Jefa de Cátedra Lenguas Extranjeras (Inglés)',
            area: 'Idiomas',
            nivel: 'Primario',
            email: 'l.gimenez@educarparatransformar.edu.ar',
            dedicacion: 'Jornada Extendida',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-04',
            dni: '29.340.510',
            nombre: 'Prof. Pierre Dupont',
            rol: 'Profesor de Francés Institucional',
            area: 'Idiomas',
            nivel: 'Secundario',
            email: 'p.dupont@educarparatransformar.edu.ar',
            dedicacion: 'Jornada Parcial',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-05',
            dni: '33.710.882',
            nombre: 'Prof. Lucas Silva',
            rol: 'Profesor Responsable de Natación y Educación Física',
            area: 'Educación Física',
            nivel: 'Todos los niveles',
            email: 'l.silva@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-06',
            dni: '28.990.123',
            nombre: 'Prof. Alejandro Rossi',
            rol: 'Profesor de Básquet, Atletismo y Ajedrez',
            area: 'Educación Física',
            nivel: 'Primario',
            email: 'a.rossi@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-07',
            dni: '31.445.670',
            nombre: 'Prof. Marcelo Gómez',
            rol: 'Profesor Responsable de Fútbol Formativo y Competitivo',
            area: 'Educación Física',
            nivel: 'Secundario',
            email: 'm.gomez@educarparatransformar.edu.ar',
            dedicacion: 'Jornada Extendida',
            estado: 'Activo'
        },
        {
            legajo: 'DOC-2026-08',
            dni: '34.220.915',
            nombre: 'Prof. Elena Martínez',
            rol: 'Docente de Nivel Inicial y Gimnasia Artística',
            area: 'Humanidades',
            nivel: 'Inicial',
            email: 'e.martinez@educarparatransformar.edu.ar',
            dedicacion: 'Tiempo Completo',
            estado: 'Activo'
        }
    ],

    // Cursos Institucionales por Nivel Educativo Único (RF-16, RF-17, RF-18, RF-19)
    cursosInstitucionales: [
        { id: 'CUR-INI-4', nivel: 'Inicial', nombre: 'Sala de 4 Años', horarioCursado: 'Lun a Vie 08:00 a 15:00 hs', materias: ['Expresión Corporal', 'Iniciación Musical', 'Inglés Lúdico', 'Exploración del Ambiente'] },
        { id: 'CUR-INI-5', nivel: 'Inicial', nombre: 'Sala de 5 Años', horarioCursado: 'Lun a Vie 08:00 a 15:00 hs', materias: ['Expresión Corporal y Motricidad', 'Iniciación Musical', 'Inglés Lúdico Audio-Oral', 'Exploración del Ambiente', 'Taller de Arte'] },
        { id: 'CUR-PRI-3A', nivel: 'Primario', nombre: '3° Grado "A"', horarioCursado: 'Lun a Vie 07:45 a 15:15 hs', materias: ['Matemática', 'Lengua', 'Ciencias Naturales', 'Inglés', 'Ajedrez Escolar'] },
        { id: 'CUR-PRI-4B', nivel: 'Primario', nombre: '4° Grado "B"', horarioCursado: 'Lun a Vie 07:45 a 15:15 hs', materias: ['Matemática', 'Prácticas del Lenguaje', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés Intensivo', 'Educación Artística'] },
        { id: 'CUR-SEC-1C', nivel: 'Secundario', nombre: '1° Año "C"', horarioCursado: 'Lun a Vie 07:30 a 15:30 hs', materias: ['Matemática I', 'Lengua y Literatura', 'Ciencias de la Tierra', 'Historia Antigua', 'Francés I', 'Inglés I'] },
        { id: 'CUR-SEC-2A', nivel: 'Secundario', nombre: '2° Año "A"', horarioCursado: 'Lun a Vie 07:30 a 15:30 hs', materias: ['Matemática II', 'Lengua y Literatura', 'Biología', 'Geografía Argentina', 'Informática Aplicada', 'Inglés Bilingüe'] },
        { id: 'CUR-SEC-3A', nivel: 'Secundario', nombre: '3° Año "A"', horarioCursado: 'Lun a Vie 07:30 a 15:30 hs', materias: ['Matemática III', 'Lengua y Literatura', 'Física y Química', 'Historia Moderna', 'Robótica y Programación', 'Inglés Bilingüe'] }
    ],

    // Asignaciones de Profesor a Materia, Curso y Horario (RF-21)
    asignacionesDocentes: [
        { id: 'ASG-01', docenteLegajo: 'DOC-2026-02', docenteNombre: 'Prof. Martín Aranda', nivel: 'Secundario', curso: '3° Año "A"', materia: 'Robótica y Programación', horario: 'Lun y Mié 07:30 a 09:30 hs' },
        { id: 'ASG-02', docenteLegajo: 'DOC-2026-02', docenteNombre: 'Prof. Martín Aranda', nivel: 'Secundario', curso: '2° Año "A"', materia: 'Matemática II', horario: 'Mar y Jue 07:30 a 09:30 hs' },
        { id: 'ASG-03', docenteLegajo: 'DOC-2026-03', docenteNombre: 'Prof. Laura Giménez', nivel: 'Primario', curso: '4° Grado "B"', materia: 'Inglés Intensivo', horario: 'Lun y Mié 09:45 a 11:45 hs' },
        { id: 'ASG-04', docenteLegajo: 'DOC-2026-04', docenteNombre: 'Prof. Pierre Dupont', nivel: 'Secundario', curso: '1° Año "C"', materia: 'Francés I', horario: 'Mar y Jue 10:00 a 12:00 hs' },
        { id: 'ASG-05', docenteLegajo: 'DOC-2026-08', docenteNombre: 'Prof. Elena Martínez', nivel: 'Inicial', curso: 'Sala de 5 Años', materia: 'Expresión Corporal y Motricidad', horario: 'Vie 08:00 a 11:30 hs' }
    ],

    // Rutas de Micros de Traslado (Servicio de Transporte - RF-11)
    rutasMicros: [
        {
            linea: 'Línea 1 - Zona Norte',
            recorrido: 'Fontana Centro - Av. Alvear - Av. Sarmiento - Campus Educativo',
            chofer: 'Roberto Benítez',
            patente: 'AF 234 JK',
            alumnosAsignados: 28,
            capacidadTotal: 30,
            horarioArribo: '07:15 hs / 17:30 hs',
            arancel: 22000
        },
        {
            linea: 'Línea 2 - Zona Sur',
            recorrido: 'Barranqueras - Av. Castelli - Hospital Perrando - Campus',
            chofer: 'Claudio Peralta',
            patente: 'AE 890 LM',
            alumnosAsignados: 26,
            capacidadTotal: 30,
            horarioArribo: '07:10 hs / 17:35 hs',
            arancel: 22000
        },
        {
            linea: 'Línea 3 - Zona Centro',
            recorrido: 'Plaza 25 de Mayo - Av. 25 de Mayo - Av. Italia - Campus',
            chofer: 'Mario Soto',
            patente: 'AD 456 OP',
            alumnosAsignados: 27,
            capacidadTotal: 30,
            horarioArribo: '07:25 hs / 17:20 hs',
            arancel: 22000
        },
        {
            linea: 'Línea 4 - Zona Este / Fontana',
            recorrido: 'Sarmiento Shopping - Av. Alvear y Sta. María de Oro - Autovía',
            chofer: 'Aníbal Silva',
            patente: 'AG 112 RS',
            alumnosAsignados: 23,
            capacidadTotal: 30,
            horarioArribo: '07:20 hs / 17:25 hs',
            arancel: 22000
        }
    ],

    // Menú de Comedor Institucional (RF-12)
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

    // Deportes con Profesor Responsable Asignado (RF-08)
    deportes: [
        { id: 'DEP-NAT', nombre: 'Natación', profesor: 'Prof. Lucas Silva', sede: 'Pileta Semi-Olímpica Climatizada', nivel: 'Inicial, Primario y Secundario', dias: 'Lun y Mié 16:00-17:30', arancel: 15000, estado: 'Activo', inscriptos: 142 },
        { id: 'DEP-FUT', nombre: 'Fútbol', profesor: 'Prof. Marcelo Gómez', sede: 'Canchas de Césped Sintético', nivel: 'Primario y Secundario', dias: 'Lun y Mié 16:00-17:30', arancel: 15000, estado: 'Activo', inscriptos: 110 },
        { id: 'DEP-VOL', nombre: 'Vóleibol', profesor: 'Prof. Daniela Ríos', sede: 'Gimnasio Cubierto Multideporte', nivel: 'Secundario', dias: 'Mar y Jue 16:00-17:30', arancel: 15000, estado: 'Activo', inscriptos: 55 },
        { id: 'DEP-BAS', nombre: 'Básquet', profesor: 'Prof. Alejandro Rossi', sede: 'Gimnasio Cubierto Multideporte', nivel: 'Primario y Secundario', dias: 'Mar y Jue 16:00-17:30', arancel: 15000, estado: 'Activo', inscriptos: 78 },
        { id: 'DEP-ATL', nombre: 'Atletismo', profesor: 'Prof. Alejandro Rossi', sede: 'Pista de Atletismo Reglamentaria', nivel: 'Primario y Secundario', dias: 'Mié y Vie 17:30-19:00', arancel: 15000, estado: 'Activo', inscriptos: 64 },
        { id: 'DEP-GIM', nombre: 'Gimnasia Artística', profesor: 'Prof. Elena Martínez', sede: 'Salón de Usos Múltiples (SUM)', nivel: 'Inicial y Primario', dias: 'Mar y Jue 16:00-17:30', arancel: 15000, estado: 'Activo', inscriptos: 52 },
        { id: 'DEP-AJE', nombre: 'Ajedrez Formativo', profesor: 'Prof. Alejandro Rossi', sede: 'Salón de Usos Múltiples (SUM)', nivel: 'Primario y Secundario', dias: 'Sáb 10:00-12:00', arancel: 15000, estado: 'Activo', inscriptos: 39 },
        { id: 'DEP-ART', nombre: 'Artes Marciales (Judo)', profesor: 'Prof. Lucas Silva', sede: 'Gimnasio Cubierto Multideporte', nivel: 'Todos los niveles', dias: 'Sáb 10:00-12:00', arancel: 15000, estado: 'Activo', inscriptos: 48 }
    ],

    // Grupos Deportivos Configurados por Deporte + Nivel + Horario (RF-09)
    gruposDeportivos: [
        { id: 'GRP-SEC-NAT', deporte: 'Natación', nivel: 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', cupo: 25, inscriptos: 18, arancel: 15000 },
        { id: 'GRP-SEC-FUT', deporte: 'Fútbol', nivel: 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Marcelo Gómez', cupo: 25, inscriptos: 20, arancel: 15000 },
        { id: 'GRP-SEC-VOL', deporte: 'Vóleibol', nivel: 'Secundario', horario: 'Mar y Jue 16:00 a 17:30 hs', profesor: 'Prof. Daniela Ríos', cupo: 25, inscriptos: 15, arancel: 15000 },
        { id: 'GRP-SEC-ATL', deporte: 'Atletismo', nivel: 'Secundario', horario: 'Mié y Vie 17:30 a 19:00 hs', profesor: 'Prof. Alejandro Rossi', cupo: 30, inscriptos: 14, arancel: 15000 },
        { id: 'GRP-SEC-AJE', deporte: 'Ajedrez Formativo', nivel: 'Secundario', horario: 'Sáb 10:00 a 12:00 hs', profesor: 'Prof. Alejandro Rossi', cupo: 20, inscriptos: 11, arancel: 15000 },
        { id: 'GRP-SEC-SUP', deporte: 'Básquet Matutino', nivel: 'Secundario', horario: 'Lun a Vie 09:00 a 10:30 hs', profesor: 'Prof. Alejandro Rossi', cupo: 20, inscriptos: 5, arancel: 15000 },
        { id: 'GRP-PRI-NAT', deporte: 'Natación', nivel: 'Primario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', cupo: 25, inscriptos: 21, arancel: 15000 },
        { id: 'GRP-PRI-BAS', deporte: 'Básquet', nivel: 'Primario', horario: 'Mar y Jue 16:00 a 17:30 hs', profesor: 'Prof. Alejandro Rossi', cupo: 25, inscriptos: 19, arancel: 15000 },
        { id: 'GRP-PRI-AJE', deporte: 'Ajedrez Formativo', nivel: 'Primario', horario: 'Sáb 10:00 a 12:00 hs', profesor: 'Prof. Alejandro Rossi', cupo: 20, inscriptos: 12, arancel: 15000 },
        { id: 'GRP-INI-GIM', deporte: 'Gimnasia Artística', nivel: 'Inicial', horario: 'Mar y Jue 16:00 a 17:30 hs', profesor: 'Prof. Elena Martínez', cupo: 20, inscriptos: 16, arancel: 15000 },
        { id: 'GRP-INI-NAT', deporte: 'Natación', nivel: 'Inicial', horario: 'Mié y Vie 17:30 a 19:00 hs', profesor: 'Prof. Lucas Silva', cupo: 20, inscriptos: 14, arancel: 15000 }
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

                renderizarVistaAdmin();
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

    // Soporte directo para modo demostración o sesión activa
    if (typeof window.iniciarSesionDemoEstudiante === 'function') {
        window.iniciarSesionDemoEstudiante();
        const btnVolver = document.getElementById('btnVolverAdminDesdeEstudiante');
        if (btnVolver) btnVolver.classList.remove('hidden');
        return;
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
        alumnos: 'Nómina de Alumnos, Familia/Tutor (RF-14) y Materias (RF-20)',
        docentes: 'Plantel Docente (RF-05/06/07), Cursos y Asignación de Materias (RF-21)',
        servicios: 'Servicios Institucionales: Transporte (RF-11), Comedor (RF-12) y Salud',
        deportes: 'Deportes (RF-08), Grupos Horarios (RF-09) e Inscripciones (RF-10)',
        circulares: 'Comunicados Oficiales y Circulares',
        tesoreria: 'Tesorería Institucional: Cuotas, Comprobantes (M-05) y 5 Listados',
        reportes: 'Centro de los 9 Reportes Institucionales de Dirección (RF-22)'
    };
    const headerTitle = document.getElementById('adminCurrentSectionTitle');
    if (headerTitle && titulos[nombreTab]) {
        headerTitle.innerText = titulos[nombreTab];
    }

    renderizarVistaAdmin();

    if (nombreTab === 'solicitudes' || nombreTab === 'dashboard') {
        obtenerSolicitudes();
    }
    if (nombreTab === 'alumnos' || nombreTab === 'dashboard') {
        obtenerAlumnos();
    }
    if (nombreTab === 'tesoreria' && typeof renderizarModuloTesoreriaAdmin === 'function') {
        renderizarModuloTesoreriaAdmin();
    }
    if (nombreTab === 'reportes' && typeof renderizarReporteRF22 === 'function') {
        renderizarReporteRF22();
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
// RENDERIZADO DINÁMICO DE DATOS Y SINCRONIZACIÓN LOCALSTORAGE + SUPABASE
// ====================================================================

function guardarEstadoAdminLocal() {
    try {
        localStorage.setItem('ept_admin_state_v2', JSON.stringify({
            alumnos: AdminState.alumnos,
            docentes: AdminState.docentes,
            cursosInstitucionales: AdminState.cursosInstitucionales,
            asignacionesDocentes: AdminState.asignacionesDocentes,
            deportes: AdminState.deportes,
            gruposDeportivos: AdminState.gruposDeportivos,
            solicitudes: AdminState.solicitudes
        }));
    } catch (_) {}
}

function restaurarEstadoAdminLocal() {
    try {
        const raw = localStorage.getItem('ept_admin_state_v2');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.alumnos) && parsed.alumnos.length > 0) AdminState.alumnos = parsed.alumnos;
        if (Array.isArray(parsed.docentes) && parsed.docentes.length > 0) AdminState.docentes = parsed.docentes;
        if (Array.isArray(parsed.cursosInstitucionales) && parsed.cursosInstitucionales.length > 0) AdminState.cursosInstitucionales = parsed.cursosInstitucionales;
        if (Array.isArray(parsed.asignacionesDocentes) && parsed.asignacionesDocentes.length > 0) AdminState.asignacionesDocentes = parsed.asignacionesDocentes;
        if (Array.isArray(parsed.deportes) && parsed.deportes.length > 0) AdminState.deportes = parsed.deportes;
        if (Array.isArray(parsed.gruposDeportivos) && parsed.gruposDeportivos.length > 0) AdminState.gruposDeportivos = parsed.gruposDeportivos;
        if (Array.isArray(parsed.solicitudes) && parsed.solicitudes.length > 0) AdminState.solicitudes = parsed.solicitudes;
    } catch (_) {}
}

restaurarEstadoAdminLocal();

function renderizarVistaAdmin() {
    renderizarContadoresDashboard();
    renderizarTablaSolicitudes();
    renderizarTablaAlumnos();
    renderizarTablaDocentes();
    renderizarModuloServicios();
    renderizarModuloDeportes();
    renderizarListaCirculares();
    if (typeof renderizarBandejaComprobantesAdmin === 'function') {
        renderizarBandejaComprobantesAdmin();
    }
    if (typeof renderizarReporteRF22 === 'function') {
        renderizarReporteRF22();
    }
}

/**
 * Obtiene las solicitudes de admisión reales desde Supabase (conservando semilla si RLS filtra en modo demo)
 */
async function obtenerSolicitudes() {
    const client = getSupabaseClient();
    if (client) {
        try {
            const { data, error } = await client
                .from('inscripciones')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data) && data.length > 0) {
                AdminState.solicitudes = data.map(row => ({
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
                guardarEstadoAdminLocal();
            }
        } catch (err) {
            console.warn("Usando solicitudes en memoria:", err);
        }
    }

    renderizarContadoresDashboard();
    renderizarTablaSolicitudes();
}

/**
 * Obtiene la nómina de alumnos matriculados desde Supabase (conservando padrón enriquecido en modo demo)
 */
async function obtenerAlumnos() {
    const client = getSupabaseClient();
    if (client) {
        try {
            const { data, error } = await client
                .from('alumnos')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data) && data.length > 0) {
                // Enriquecer registros de Supabase con campos extendidos RF-10/11/12/14/20 si existen en memoria
                AdminState.alumnos = data.map(row => {
                    const prev = AdminState.alumnos.find(a => a.legajo === row.legajo) || {};
                    return {
                        ...prev,
                        ...row,
                        horarioCursado: prev.horarioCursado || 'Lun a Vie 07:30 a 15:30 hs',
                        tutorDni: prev.tutorDni || '32.114.560',
                        tutorEmail: prev.tutorEmail || 'familia@gmail.com',
                        hermanos: prev.hermanos || [],
                        deportesAsignados: prev.deportesAsignados || (row.deporte ? [{ grupoId: 'GRP-GEN', deporte: row.deporte, nivel: row.nivel || 'Secundario', horario: 'Lun y Mié 16:00 a 17:30 hs', profesor: 'Prof. Lucas Silva', monto: 15000 }] : []),
                        transporte: prev.transporte || 'Línea 1 - Zona Norte',
                        parada: prev.parada || 'Parada asignada',
                        comedor: prev.comedor || 'Menú General Balanceado',
                        materiasCursado: prev.materiasCursado || ['Matemática', 'Lengua y Literatura', 'Ciencias Naturales', 'Inglés Bilingüe']
                    };
                });
                guardarEstadoAdminLocal();
            }
        } catch (err) {
            console.warn("Usando nómina de alumnos local:", err);
        }
    }

    renderizarTablaAlumnos();
    renderizarContadoresDashboard();
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
    if (elDocentes) elDocentes.innerText = AdminState.docentes.filter(d => d.estado === 'Activo').length;
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
            const depArr = Array.isArray(al.deportesAsignados) ? al.deportesAsignados : [];
            const depTexto = depArr.length > 0 ? depArr.map(d => d.deporte).join(', ') : (al.deporte || 'Sin deporte');
            const hermanosTxt = Array.isArray(al.hermanos) && al.hermanos.length > 0 ? `Hermanos: ${al.hermanos.join(', ')}` : 'Sin hermanos vinculados';
            const materiasCant = Array.isArray(al.materiasCursado) ? al.materiasCursado.length : 5;

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
                                <p class="text-[10px] text-slate-500">DNI: ${escaparHTML(al.dni)} • ${materiasCant} materias (RF-20)</p>
                            </div>
                        </div>
                    </td>
                    <td class="p-4">
                        <span class="font-bold text-xs text-slate-700 block break-words">${escaparHTML(al.curso)}</span>
                        <span class="block text-[10px] text-blue-900 font-semibold">${escaparHTML(al.nivel)}</span>
                    </td>
                    <td class="p-4 text-xs">
                        <p class="font-bold text-slate-800">${escaparHTML(al.tutor || 'Tutor')}</p>
                        <p class="text-[10px] text-slate-500">${escaparHTML(al.tutorEmail || 'familia@gmail.com')}</p>
                        <p class="text-[10px] text-indigo-700 font-semibold mt-0.5">${escaparHTML(hermanosTxt)}</p>
                    </td>
                    <td class="p-4">
                        <div class="flex flex-wrap gap-1 mb-1">
                            <span class="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">${escaparHTML(al.idioma || 'Inglés')}</span>
                            <span class="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">⚽ ${depArr.length}/2: ${escaparHTML(depTexto)}</span>
                        </div>
                        <span class="block text-[10px] text-slate-500">🚌 ${escaparHTML(al.transporte || 'Sin transp.')} • 🍽️ ${escaparHTML(al.comedor || 'Sin comedor')}</span>
                    </td>
                    <td class="p-4 text-center">
                        <button type="button" data-alumno-action="regularidad" data-legajo="${legajoSeguro}" title="Click para alternar condición" aria-label="Alternar condición ${escaparHTML(condicionActual)} de ${nombreSeguro}" class="cursor-pointer text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${esRegular ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                            ${escaparHTML(condicionActual)}
                        </button>
                    </td>
                    <td class="p-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button type="button" onclick="abrirModalFichaIntegralAlumno('${legajoSeguro}')" class="px-2.5 py-1.5 bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-[10px] font-bold transition flex items-center gap-1" title="Asociar Padre/Tutor (RF-14) e Inscribir a Materias (RF-20)">
                                <i class="fas fa-users" aria-hidden="true"></i> <span>Tutor / Materias</span>
                            </button>
                            <button type="button" data-alumno-action="certificado" data-legajo="${legajoSeguro}" aria-label="Emitir certificado de ${nombreSeguro}" class="px-2.5 py-1.5 bg-blue-900 text-white hover:bg-blue-800 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                                <i class="fas fa-file-pdf" aria-hidden="true"></i> <span>Certificado</span>
                            </button>
                            <button type="button" data-alumno-action="eliminar" data-legajo="${legajoSeguro}" title="Dar de baja alumno" aria-label="Dar de baja a ${nombreSeguro}" class="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                                <i class="fas fa-trash-alt" aria-hidden="true"></i>
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
            const depArr = Array.isArray(al.deportesAsignados) ? al.deportesAsignados : [];
            const depTexto = depArr.length > 0 ? depArr.map(d => d.deporte).join(', ') : (al.deporte || 'Sin deporte');

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
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Deportes (${depArr.length}/2)</span>
                            <p class="font-bold text-emerald-800 mt-0.5 break-words">${escaparHTML(depTexto)}</p>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Tutor Responsable (RF-14)</span>
                            <p class="font-semibold text-slate-700 mt-0.5 break-words">${escaparHTML(al.tutor || 'No especificado')}</p>
                        </div>
                        <div class="min-w-0">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Servicios (RF-11/12)</span>
                            <p class="font-semibold text-slate-700 mt-0.5 truncate">${escaparHTML(al.transporte || 'Sin transp.')}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-2 pt-0.5">
                        <button type="button"
                            onclick="abrirModalFichaIntegralAlumno('${legajoSeguro}')"
                            class="min-h-[44px] px-2.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl text-[11px] font-bold transition active:scale-95 flex items-center justify-center gap-1">
                            <i class="fas fa-users text-xs" aria-hidden="true"></i>
                            <span>RF-14/20</span>
                        </button>
                        <button type="button"
                            data-alumno-action="certificado"
                            data-legajo="${legajoSeguro}"
                            aria-label="Emitir certificado de ${nombreSeguro}"
                            class="min-h-[44px] px-2.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-[11px] font-bold transition active:scale-95 flex items-center justify-center gap-1 shadow-sm">
                            <i class="fas fa-file-pdf text-xs" aria-hidden="true"></i>
                            <span>Certificado</span>
                        </button>
                        <button type="button"
                            data-alumno-action="eliminar"
                            data-legajo="${legajoSeguro}"
                            aria-label="Dar de baja a ${nombreSeguro}"
                            class="min-h-[44px] px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[11px] font-bold transition active:scale-95 flex items-center justify-center gap-1">
                            <i class="fas fa-trash-alt text-xs" aria-hidden="true"></i>
                            <span>Baja</span>
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

    const nuevoEstado = (alumno.regularidad === 'Regular') ? 'Condicional' : 'Regular';
    alumno.regularidad = nuevoEstado;
    guardarEstadoAdminLocal();
    renderizarTablaAlumnos();
    mostrarToast(`Condición de ${alumno.nombre} actualizada a: ${nuevoEstado} (RF-03)`, 'info');

    const client = getSupabaseClient();
    if (client) {
        try {
            await client.from('alumnos').update({ regularidad: nuevoEstado }).eq('legajo', legajo);
        } catch (_) {}
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

    AdminState.alumnos = AdminState.alumnos.filter(a => a.legajo !== legajo);
    guardarEstadoAdminLocal();
    renderizarTablaAlumnos();
    renderizarContadoresDashboard();
    mostrarToast(`Alumno ${nombreConfirm} dado de baja exitosamente.`, 'success');

    const client = getSupabaseClient();
    if (client) {
        try {
            await client.from('alumnos').delete().eq('legajo', legajo);
        } catch (_) {}
    }
}

function emitirCertificadoDesdeAdmin(legajo, nombre) {
    mostrarToast(`Certificado Institucional emitido para ${nombre} (${legajo})`, 'success');
}

/**
 * Renderiza el listado de Docentes (RF-05, RF-06, RF-07) y la matriz de Asignaciones (RF-21)
 */
function renderizarTablaDocentes() {
    const grid = document.getElementById('gridDocentes');
    const badgeActivos = document.getElementById('badgeTotalDocentesActivos');
    if (badgeActivos) {
        const cantActivos = AdminState.docentes.filter(d => d.estado === 'Activo').length;
        badgeActivos.textContent = `${cantActivos} de ${AdminState.docentes.length} Docentes Activos`;
    }

    if (grid) {
        const busqueda = (document.getElementById('inputBuscarDocente')?.value || '').trim().toLowerCase();
        const nivelFiltro = AdminState.filtroDocenteNivel || 'todos';

        const filtrados = AdminState.docentes.filter(d => {
            const matchNivel = nivelFiltro === 'todos' ||
                (d.nivel || '').toLowerCase().includes(nivelFiltro.toLowerCase()) ||
                (d.nivel || '').toLowerCase().includes('todos');
            const matchBusq = !busqueda ||
                (d.nombre || '').toLowerCase().includes(busqueda) ||
                (d.legajo || '').toLowerCase().includes(busqueda) ||
                (d.rol || '').toLowerCase().includes(busqueda) ||
                (d.area || '').toLowerCase().includes(busqueda);
            return matchNivel && matchBusq;
        });

        grid.innerHTML = filtrados.map(d => {
            let icon = 'fa-chalkboard-teacher';
            if (d.area === 'Autoridades') icon = 'fa-user-tie';
            if (d.area === 'Idiomas') icon = 'fa-language';
            if (d.area === 'Educación Física') icon = 'fa-swimmer';
            if (d.area === 'Salud') icon = 'fa-user-md';
            if (d.area === 'Bienestar') icon = 'fa-heart';

            const misAsignaciones = (AdminState.asignacionesDocentes || []).filter(
                a => a.docenteLegajo === d.legajo || a.docenteNombre === d.nombre
            );

            let badgeEstadoClase = 'text-emerald-700 bg-emerald-50 border-emerald-200';
            let dotClase = 'bg-emerald-500';
            if (d.estado === 'En Licencia') {
                badgeEstadoClase = 'text-amber-800 bg-amber-50 border-amber-200';
                dotClase = 'bg-amber-500';
            } else if (d.estado === 'Inactivo') {
                badgeEstadoClase = 'text-rose-800 bg-rose-50 border-rose-200';
                dotClase = 'bg-rose-500';
            }

            return `
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between mb-2.5">
                            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center text-lg">
                                <i class="fas ${icon}"></i>
                            </div>
                            <div class="text-right">
                                <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 block">${escaparHTML(d.legajo || 'DOC-2026')}</span>
                                <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 mt-1 inline-block">${escaparHTML(d.nivel || 'General')}</span>
                            </div>
                        </div>
                        <h4 class="font-bold text-slate-800 text-sm mb-0.5">${escaparHTML(d.nombre)}</h4>
                        <p class="text-[11px] text-slate-500 mb-1">DNI: ${escaparHTML(d.dni || '30.112.440')}</p>
                        <p class="text-xs text-blue-900 font-semibold mb-2">${escaparHTML(d.rol)}</p>
                        <p class="text-[11px] text-slate-500 mb-1 truncate"><i class="fas fa-envelope mr-1 text-slate-400"></i>${escaparHTML(d.email)}</p>
                        <p class="text-[10px] text-indigo-700 font-bold mt-2"><i class="fas fa-book-open mr-1"></i>${misAsignaciones.length} cátedra(s) asignada(s)</p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                        <button type="button" onclick="cambiarEstadoDocenteRF07('${escaparHTML(d.legajo)}')" title="Click para cambiar estado (RF-07)"
                            class="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-lg border transition ${badgeEstadoClase}">
                            <span class="w-1.5 h-1.5 rounded-full ${dotClase} mr-1.5"></span> ${escaparHTML(d.estado)}
                        </button>
                        <div class="flex items-center gap-1">
                            <button type="button" onclick="abrirModalGestionDocente('${escaparHTML(d.legajo)}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition">
                                <i class="fas fa-edit mr-0.5"></i> Editar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Renderizar tabla de Asignaciones Académicas (RF-21)
    const contAsig = document.getElementById('contenedorAsignacionesDocentes');
    if (contAsig) {
        const asigs = AdminState.asignacionesDocentes || [];
        contAsig.innerHTML = `
            <table class="w-full min-w-[640px] text-left text-xs border-collapse">
                <thead>
                    <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500">
                        <th class="p-3">Profesor Asignado (RF-21)</th>
                        <th class="p-3">Nivel Educativo (RF-16)</th>
                        <th class="p-3">Curso (RF-17)</th>
                        <th class="p-3">Materia del Plan (RF-18)</th>
                        <th class="p-3">Horario de Dictado (RF-19)</th>
                        <th class="p-3 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${asigs.map(a => `
                        <tr class="hover:bg-slate-50">
                            <td class="p-3 font-bold text-slate-900">${escaparHTML(a.docenteNombre)} <span class="text-[10px] font-mono text-slate-400">(${escaparHTML(a.docenteLegajo)})</span></td>
                            <td class="p-3"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-bold text-[10px] uppercase">${escaparHTML(a.nivel)}</span></td>
                            <td class="p-3 font-bold text-slate-800">${escaparHTML(a.curso)}</td>
                            <td class="p-3 font-semibold text-indigo-900">${escaparHTML(a.materia)}</td>
                            <td class="p-3 font-mono text-[11px] text-slate-600">${escaparHTML(a.horario)}</td>
                            <td class="p-3 text-right">
                                <button type="button" onclick="eliminarAsignacionDocenteRF21('${escaparHTML(a.id)}')" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-bold">
                                    Quitar
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

/**
 * Renderiza el módulo de Servicios Escolares (Transporte RF-11 y Comedor RF-12)
 */
function renderizarModuloServicios() {
    // 1. Micros (RF-11)
    const tablaMicros = document.getElementById('tablaMicrosBody');
    if (tablaMicros) {
        tablaMicros.innerHTML = AdminState.rutasMicros.map(m => `
            <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
                <td class="p-3 font-bold text-blue-900">${escaparHTML(m.linea)}</td>
                <td class="p-3 text-slate-600">${escaparHTML(m.recorrido)}</td>
                <td class="p-3">
                    <p class="font-semibold text-slate-800">${escaparHTML(m.chofer)}</p>
                    <p class="text-[10px] text-slate-400">Patente: ${escaparHTML(m.patente)}</p>
                </td>
                <td class="p-3 text-center">
                    <span class="font-bold ${m.alumnosAsignados >= m.capacidadTotal ? 'text-red-600' : 'text-emerald-700'}">
                        ${m.alumnosAsignados} / ${m.capacidadTotal}
                    </span>
                </td>
                <td class="p-3 text-slate-500 text-[11px]">${escaparHTML(m.horarioArribo)}</td>
                <td class="p-3 text-right font-mono font-bold text-slate-900">$ ${(m.arancel || 22000).toLocaleString('es-AR')}</td>
            </tr>
        `).join('');
    }

    const contTransp = document.getElementById('contenedorInscriptosTransporte');
    const badgeTransp = document.getElementById('contadorInscriptosTransporte');
    const alumnosConTransporte = AdminState.alumnos.filter(a => a.transporte && a.transporte !== 'Sin transporte');
    if (badgeTransp) badgeTransp.textContent = `${alumnosConTransporte.length} alumnos inscriptos en los 4 recorridos`;
    if (contTransp) {
        contTransp.innerHTML = `
            <div class="overflow-x-auto touch-scroll">
                <table class="w-full min-w-[600px] text-left text-xs border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500">
                            <th class="p-3">Alumno y Legajo</th>
                            <th class="p-3">Nivel y Curso</th>
                            <th class="p-3">Recorrido Asignado (RF-11)</th>
                            <th class="p-3">Parada Designada</th>
                            <th class="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${alumnosConTransporte.map(a => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 font-bold text-slate-900">${escaparHTML(a.nombre)} <span class="text-[10px] font-mono text-blue-900">(${escaparHTML(a.legajo)})</span></td>
                                <td class="p-3 text-slate-600">${escaparHTML(a.nivel)} • ${escaparHTML(a.curso)}</td>
                                <td class="p-3"><span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 font-bold text-[11px] border border-blue-200">🚌 ${escaparHTML(a.transporte)}</span></td>
                                <td class="p-3 text-slate-600">${escaparHTML(a.parada || 'Parada troncal')}</td>
                                <td class="p-3 text-right">
                                    <button type="button" onclick="darBajaTransporteRF11('${escaparHTML(a.legajo)}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold">
                                        Dar de Baja
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // 2. Comedor (RF-12)
    const gridMenu = document.getElementById('gridMenuComedor');
    if (gridMenu) {
        gridMenu.innerHTML = AdminState.menuComedor.map(c => `
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-black uppercase text-orange-600 tracking-wider">${escaparHTML(c.dia)}</span>
                <p class="font-bold text-slate-800 text-xs mt-1 mb-2">${escaparHTML(c.plato)}</p>
                <span class="inline-block bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                    <i class="fas fa-leaf mr-1"></i>${escaparHTML(c.dietaEspecial)}
                </span>
            </div>
        `).join('');
    }

    const contComedor = document.getElementById('contenedorInscriptosComedor');
    const badgeComedor = document.getElementById('contadorInscriptosComedor');
    const alumnosConComedor = AdminState.alumnos.filter(a => a.comedor && a.comedor !== 'Sin Comedor');
    if (badgeComedor) badgeComedor.textContent = `${alumnosConComedor.length} alumnos adheridos al comedor`;
    if (contComedor) {
        contComedor.innerHTML = `
            <div class="overflow-x-auto touch-scroll">
                <table class="w-full min-w-[580px] text-left text-xs border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500">
                            <th class="p-3">Alumno y Legajo</th>
                            <th class="p-3">Nivel y Curso</th>
                            <th class="p-3">Plan Nutricional Asignado (RF-12)</th>
                            <th class="p-3 text-right">Arancel Mensual</th>
                            <th class="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${alumnosConComedor.map(a => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 font-bold text-slate-900">${escaparHTML(a.nombre)} <span class="text-[10px] font-mono text-blue-900">(${escaparHTML(a.legajo)})</span></td>
                                <td class="p-3 text-slate-600">${escaparHTML(a.nivel)} • ${escaparHTML(a.curso)}</td>
                                <td class="p-3"><span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">🍽️ ${escaparHTML(a.comedor)}</span></td>
                                <td class="p-3 text-right font-mono font-bold text-slate-900">$ 28.000</td>
                                <td class="p-3 text-right">
                                    <button type="button" onclick="darBajaComedorRF12('${escaparHTML(a.legajo)}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold">
                                        Dar de Baja
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

/**
 * Renderiza Deportes (RF-08), Grupos Horarios (RF-09), Inscripciones (RF-10) e Instalaciones
 */
function renderizarModuloDeportes() {
    const gridInst = document.getElementById('gridInstalaciones');
    if (gridInst) {
        gridInst.innerHTML = AdminState.instalaciones.map(inst => `
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-black uppercase text-blue-900">${escaparHTML(inst.tipo)}</span>
                    <span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">${escaparHTML(inst.estado)}</span>
                </div>
                <h5 class="font-bold text-slate-800 text-xs mb-1">${escaparHTML(inst.nombre)}</h5>
                <p class="text-[10px] text-slate-500"><i class="fas fa-users mr-1"></i>Capacidad: ${escaparHTML(inst.capacidad)}</p>
            </div>
        `).join('');
    }

    // 1. Disciplinas y Profesor Responsable (RF-08)
    const gridDep = document.getElementById('gridDeportes');
    if (gridDep) {
        gridDep.innerHTML = AdminState.deportes.map(d => `
            <div class="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-3 hover:shadow-md transition">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-1.5">
                        <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded ${d.estado === 'Suspendido' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">${escaparHTML(d.estado || 'Activo')}</span>
                        <span class="font-mono text-xs font-black text-blue-900">$ ${(d.arancel || 15000).toLocaleString('es-AR')}/mes</span>
                    </div>
                    <h5 class="font-black text-slate-900 text-sm">${escaparHTML(d.nombre)}</h5>
                    <p class="text-[11px] font-bold text-indigo-800 mt-1"><i class="fas fa-user-tie mr-1"></i>Resp: ${escaparHTML(d.profesor || 'Prof. Lucas Silva')}</p>
                    <p class="text-[10px] text-slate-500 mt-0.5"><i class="fas fa-map-marker-alt mr-1"></i>${escaparHTML(d.sede || 'Complejo Deportivo')}</p>
                </div>
                <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[10px] font-bold text-slate-500">${d.inscriptos || 20} alumnos</span>
                    <button type="button" onclick="abrirModalGestionDeporte('${escaparHTML(d.id || d.nombre)}')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-[10px] font-bold transition">
                        <i class="fas fa-edit mr-1"></i>Editar / Profesor
                    </button>
                </div>
            </div>
        `).join('');
    }

    // 2. Grupos Deportivos por Nivel y Horario (RF-09)
    const contGrupos = document.getElementById('contenedorGruposDeportivos');
    if (contGrupos) {
        contGrupos.innerHTML = `
            <table class="w-full min-w-[640px] text-left text-xs border-collapse">
                <thead>
                    <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500">
                        <th class="p-3">Código Grupo</th>
                        <th class="p-3">Deporte</th>
                        <th class="p-3">Nivel Educativo (RF-09)</th>
                        <th class="p-3">Días y Franja Horaria</th>
                        <th class="p-3">Profesor a Cargo (RF-08)</th>
                        <th class="p-3 text-center">Cupo</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${(AdminState.gruposDeportivos || []).map(g => `
                        <tr class="hover:bg-slate-50">
                            <td class="p-3 font-mono text-[11px] font-bold text-slate-500">${escaparHTML(g.id)}</td>
                            <td class="p-3 font-black text-slate-900">${escaparHTML(g.deporte)}</td>
                            <td class="p-3"><span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold text-[10px] uppercase border border-indigo-200">${escaparHTML(g.nivel)}</span></td>
                            <td class="p-3 font-mono text-[11px] font-semibold text-slate-700">${escaparHTML(g.horario)}</td>
                            <td class="p-3 text-slate-700 font-semibold">${escaparHTML(g.profesor)}</td>
                            <td class="p-3 text-center font-bold text-emerald-700">${g.inscriptos} / ${g.cupo}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // 3. Padrón de Alumnos Inscriptos en Deportes (RF-10)
    const contInscDep = document.getElementById('contenedorInscripcionesDeportes');
    if (contInscDep) {
        const filas = [];
        AdminState.alumnos.forEach(al => {
            const deps = Array.isArray(al.deportesAsignados) ? al.deportesAsignados : [];
            deps.forEach((d, idx) => {
                filas.push({
                    legajo: al.legajo,
                    alumnoNombre: al.nombre,
                    nivel: al.nivel,
                    curso: al.curso,
                    cantDeportes: deps.length,
                    deporte: d.deporte,
                    horario: d.horario,
                    profesor: d.profesor,
                    grupoId: d.grupoId || idx
                });
            });
        });

        contInscDep.innerHTML = `
            <table class="w-full min-w-[680px] text-left text-xs border-collapse">
                <thead>
                    <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500">
                        <th class="p-3">Alumno y Legajo</th>
                        <th class="p-3">Nivel y Curso</th>
                        <th class="p-3 text-center">Cupo Alumno (Máx 2)</th>
                        <th class="p-3">Deporte Inscripto (RF-10)</th>
                        <th class="p-3">Horario del Grupo</th>
                        <th class="p-3">Profesor Responsable</th>
                        <th class="p-3 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${filas.map(f => `
                        <tr class="hover:bg-slate-50">
                            <td class="p-3 font-bold text-slate-900">${escaparHTML(f.alumnoNombre)} <span class="text-[10px] font-mono text-blue-900">(${escaparHTML(f.legajo)})</span></td>
                            <td class="p-3 text-slate-600">${escaparHTML(f.nivel)} • ${escaparHTML(f.curso)}</td>
                            <td class="p-3 text-center">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${f.cantDeportes >= 2 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800'}">
                                    ${f.cantDeportes} / 2 Deportes
                                </span>
                            </td>
                            <td class="p-3 font-black text-blue-900">${escaparHTML(f.deporte)}</td>
                            <td class="p-3 font-mono text-[11px] text-slate-600">${escaparHTML(f.horario)}</td>
                            <td class="p-3 text-slate-700">${escaparHTML(f.profesor)}</td>
                            <td class="p-3 text-right">
                                <button type="button" onclick="quitarDeporteAlumnoRF10('${escaparHTML(f.legajo)}', '${escaparHTML(f.deporte)}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold">
                                    Dar de baja
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
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

    // Validar DNI duplicado (RF-01)
    const dniLimpio = dni.replace(/[\.\s]/g, '');
    if (AdminState.alumnos.some(a => (a.dni || '').replace(/[\.\s]/g, '') === dniLimpio)) {
        mostrarToast('Regla RF-01: Ya existe un alumno matriculado con ese número de DNI.', 'error');
        return;
    }

    const nuevoLegajo = `EPT-2026-${String(AdminState.alumnos.length + 101).padStart(3, '0')}`;
    const nuevoAlumno = {
        id: Date.now(),
        legajo: nuevoLegajo,
        nombre,
        dni,
        nivel,
        curso,
        horarioCursado: 'Lun a Vie 07:30 a 15:30 hs',
        idioma,
        deporte,
        deportesAsignados: deporte ? [{
            grupoId: `GRP-${nivel.slice(0,3).toUpperCase()}-${deporte.slice(0,3).toUpperCase()}`,
            deporte,
            nivel,
            horario: 'Lun y Mié 16:00 a 17:30 hs',
            profesor: 'Prof. Lucas Silva',
            monto: 15000
        }] : [],
        tutor,
        tutorDni: '32.500.100',
        tutorEmail: `${tutor.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        hermanos: [],
        transporte: 'Sin transporte',
        parada: 'Retiro particular',
        comedor: 'Menú General Balanceado',
        materiasCursado: ['Matemática', 'Lengua y Literatura', 'Ciencias Naturales', 'Ciencias Sociales', idioma || 'Inglés'],
        regularidad: 'Regular',
        asistencia: '100%'
    };

    AdminState.alumnos.unshift(nuevoAlumno);
    guardarEstadoAdminLocal();
    renderizarTablaAlumnos();
    renderizarModuloDeportes();
    renderizarContadoresDashboard();
    cerrarModalNuevoAlumno();

    const form = document.querySelector('#modalNuevoAlumno form');
    if (form) form.reset();

    mostrarToast(`Alumno ${nombre} (${nuevoLegajo}) matriculado exitosamente (RF-01).`, 'success');

    const client = getSupabaseClient();
    if (client) {
        try {
            await client.from('alumnos').insert({
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
        } catch (_) {}
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
    if (typeof renderizarBandejaComprobantesAdmin === 'function') {
        renderizarBandejaComprobantesAdmin();
    }
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

// ====================================================================
// MÓDULO 1: DEPORTES, GRUPOS Y REGLAS DE NEGOCIO ESTRICTAS (RF-08, RF-09, RF-10)
// ====================================================================

function poblarSelectDocentes(selectId, valorSeleccionado = '') {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const activos = AdminState.docentes.filter(d => d.estado !== 'Inactivo');
    sel.innerHTML = activos.map(d =>
        `<option value="${escaparHTML(d.nombre)}" ${d.nombre === valorSeleccionado ? 'selected' : ''}>${escaparHTML(d.nombre)} (${escaparHTML(d.area)})</option>`
    ).join('');
}

function abrirModalGestionDeporte(idOrNombre = '') {
    const modal = document.getElementById('modalGestionDeporte');
    if (!modal) return;

    const dep = idOrNombre
        ? AdminState.deportes.find(d => d.id === idOrNombre || d.nombre === idOrNombre)
        : null;

    document.getElementById('depEditId').value = dep ? (dep.id || dep.nombre) : '';
    document.getElementById('depNombre').value = dep ? dep.nombre : '';
    document.getElementById('depArancel').value = dep ? (dep.arancel || 15000) : 15000;
    document.getElementById('depEstado').value = dep ? (dep.estado || 'Activo') : 'Activo';
    if (dep && dep.sede) {
        document.getElementById('depSede').value = dep.sede;
    }

    poblarSelectDocentes('depProfesor', dep ? dep.profesor : 'Prof. Lucas Silva');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalGestionDeporte() {
    const modal = document.getElementById('modalGestionDeporte');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function guardarDeporteRF08(e) {
    if (e) e.preventDefault();
    const editId = document.getElementById('depEditId').value;
    const nombre = document.getElementById('depNombre').value.trim();
    const profesor = document.getElementById('depProfesor').value;
    const sede = document.getElementById('depSede').value;
    const arancel = Number(document.getElementById('depArancel').value || 15000);
    const estado = document.getElementById('depEstado').value;

    if (!nombre || !profesor) return;

    if (editId) {
        const dep = AdminState.deportes.find(d => d.id === editId || d.nombre === editId);
        if (dep) {
            const nombreAnterior = dep.nombre;
            dep.nombre = nombre;
            dep.profesor = profesor;
            dep.sede = sede;
            dep.arancel = arancel;
            dep.estado = estado;
            // Sincronizar grupos y listado 4 de tesorería
            (AdminState.gruposDeportivos || []).forEach(g => {
                if (g.deporte === nombreAnterior) {
                    g.deporte = nombre;
                    g.profesor = profesor;
                }
            });
            mostrarToast(`Deporte "${nombre}" actualizado con Profesor Responsable: ${profesor} (RF-08).`, 'success');
        }
    } else {
        const nuevo = {
            id: `DEP-${Date.now().toString().slice(-4)}`,
            nombre,
            profesor,
            sede,
            nivel: 'Inicial, Primario y Secundario',
            dias: 'Lun y Mié 16:00-17:30',
            arancel,
            estado,
            inscriptos: 15
        };
        AdminState.deportes.unshift(nuevo);
        // Crear grupo inicial por defecto en RF-09
        AdminState.gruposDeportivos.push({
            id: `GRP-SEC-${nombre.slice(0, 3).toUpperCase()}`,
            deporte: nombre,
            nivel: 'Secundario',
            horario: 'Mié y Vie 17:30 a 19:00 hs',
            profesor,
            cupo: 25,
            inscriptos: 1,
            arancel
        });
        mostrarToast(`Deporte "${nombre}" registrado con Profesor Responsable ${profesor} (RF-08).`, 'success');
    }

    guardarEstadoAdminLocal();
    renderizarModuloDeportes();
    cerrarModalGestionDeporte();
}

function abrirModalGrupoDeportivo() {
    const modal = document.getElementById('modalGrupoDeportivo');
    if (!modal) return;

    const selDep = document.getElementById('grpDeporte');
    if (selDep) {
        selDep.innerHTML = AdminState.deportes.map(d =>
            `<option value="${escaparHTML(d.nombre)}">${escaparHTML(d.nombre)} (${escaparHTML(d.profesor || 'Prof. Lucas Silva')})</option>`
        ).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalGrupoDeportivo() {
    const modal = document.getElementById('modalGrupoDeportivo');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function guardarGrupoDeportivoRF09(e) {
    if (e) e.preventDefault();
    const deporte = document.getElementById('grpDeporte').value;
    const nivel = document.getElementById('grpNivel').value;
    const horario = document.getElementById('grpHorario').value;
    const cupo = Number(document.getElementById('grpCupo').value || 25);

    const depObj = AdminState.deportes.find(d => d.nombre === deporte);
    const profesor = depObj?.profesor || 'Prof. Lucas Silva';
    const arancel = depObj?.arancel || 15000;

    const nuevoGrupo = {
        id: `GRP-${nivel.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
        deporte,
        nivel,
        horario,
        profesor,
        cupo,
        inscriptos: 0,
        arancel
    };

    AdminState.gruposDeportivos.push(nuevoGrupo);
    guardarEstadoAdminLocal();
    renderizarModuloDeportes();
    cerrarModalGrupoDeportivo();
    mostrarToast(`Grupo deportivo ${deporte} (${nivel} • ${horario}) configurado con éxito (RF-09).`, 'success');
}

/**
 * Motor de Validación de las 3 Reglas de Negocio para Inscripción a Deporte (RF-10)
 */
function validarReglasInscripcionDeporteRF10(alumno, grupo) {
    if (!alumno || !grupo) {
        return { valido: false, errores: ['Seleccione un alumno y un grupo deportivo válido.'], checks: [] };
    }

    const deportesActuales = Array.isArray(alumno.deportesAsignados) ? alumno.deportesAsignados : [];
    const errores = [];
    const checks = [];

    // REGLA 1: Tope máximo de 2 deportes simultáneos por alumno
    if (deportesActuales.length >= 2) {
        errores.push(`Regla 1 (Tope Máximo RF-10): ${alumno.nombre} ya cursa 2 deportes (${deportesActuales.map(d => d.deporte).join(' y ')}). No se permite superar el máximo de 2 disciplinas simultáneas.`);
        checks.push({ ok: false, texto: `Tope máximo (2 deportes): BLOQUEADO (${deportesActuales.length}/2 activos)` });
    } else {
        checks.push({ ok: true, texto: `Tope máximo (máx. 2 deportes): Cumple (${deportesActuales.length}/2 activos)` });
    }

    // REGLA 2: Conflicto de horarios (con horario de cursado obligatorio o con otro deporte ya inscripto)
    const chocaConCursado = (grupo.horario || '').includes('09:00') || (grupo.horario || '').includes('08:00') || (grupo.horario || '').includes('10:30');
    const deporteMismoHorario = deportesActuales.find(d => d.horario === grupo.horario);

    if (chocaConCursado) {
        errores.push(`Regla 2 (Conflicto Horario RF-10): El horario del grupo (${grupo.horario}) se superpone con el horario de cursado obligatorio del alumno (${alumno.horarioCursado || 'Lun a Vie 07:30 a 15:30 hs'}).`);
        checks.push({ ok: false, texto: `Disponibilidad horaria: BLOQUEADO por superposición con cursado (${alumno.horarioCursado || '07:30-15:30'})` });
    } else if (deporteMismoHorario) {
        errores.push(`Regla 2 (Conflicto Horario RF-10): El horario (${grupo.horario}) se superpone con su otro deporte inscripto (${deporteMismoHorario.deporte} — ${deporteMismoHorario.horario}).`);
        checks.push({ ok: false, texto: `Disponibilidad horaria: BLOQUEADO por choque con ${deporteMismoHorario.deporte} (${grupo.horario})` });
    } else {
        checks.push({ ok: true, texto: `Disponibilidad horaria: Sin superposición con cursado ni con otros deportes` });
    }

    // REGLA 3: Sin duplicados de disciplina y correspondencia estricta de Nivel Educativo
    const yaInscriptoMismoDeporte = deportesActuales.some(d => d.deporte.toLowerCase() === grupo.deporte.toLowerCase());
    const nivelCompatible = (grupo.nivel || '').toLowerCase() === (alumno.nivel || '').toLowerCase();

    if (yaInscriptoMismoDeporte) {
        errores.push(`Regla 3 (No Duplicidad RF-10): El alumno ya se encuentra inscripto en la disciplina ${grupo.deporte}.`);
        checks.push({ ok: false, texto: `Sin duplicidad y Nivel: BLOQUEADO (Ya inscripto en ${grupo.deporte})` });
    } else if (!nivelCompatible) {
        errores.push(`Regla 3 (Nivel Educativo RF-09/RF-10): El grupo seleccionado pertenece al Nivel ${grupo.nivel}, pero el alumno cursa en Nivel ${alumno.nivel}.`);
        checks.push({ ok: false, texto: `Sin duplicidad y Nivel: BLOQUEADO (Grupo ${grupo.nivel} ≠ Alumno ${alumno.nivel})` });
    } else {
        checks.push({ ok: true, texto: `Nivel Educativo (${alumno.nivel}) y sin duplicidad: Compatible` });
    }

    return {
        valido: errores.length === 0,
        errores,
        checks
    };
}

function abrirModalInscribirDeporte(legajoPre = '') {
    const modal = document.getElementById('modalInscribirDeporte');
    if (!modal) return;

    const selAl = document.getElementById('insDepAlumno');
    if (selAl) {
        selAl.innerHTML = AdminState.alumnos.map(a => {
            const cant = Array.isArray(a.deportesAsignados) ? a.deportesAsignados.length : 0;
            return `<option value="${escaparHTML(a.legajo)}" ${a.legajo === legajoPre ? 'selected' : ''}>${escaparHTML(a.nombre)} (${escaparHTML(a.legajo)}) — Nivel ${escaparHTML(a.nivel)} [${cant}/2 deportes]</option>`;
        }).join('');
    }

    const selGrp = document.getElementById('insDepGrupo');
    if (selGrp) {
        selGrp.innerHTML = (AdminState.gruposDeportivos || []).map(g =>
            `<option value="${escaparHTML(g.id)}">${escaparHTML(g.deporte)} • Nivel ${escaparHTML(g.nivel)} • ${escaparHTML(g.horario)} (${escaparHTML(g.profesor)})</option>`
        ).join('');
    }

    evaluarPreInscripcionDeporteRF10();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalInscribirDeporte() {
    const modal = document.getElementById('modalInscribirDeporte');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function evaluarPreInscripcionDeporteRF10() {
    const legajo = document.getElementById('insDepAlumno')?.value;
    const grupoId = document.getElementById('insDepGrupo')?.value;
    const fichaBox = document.getElementById('fichaResumenAlumnoDeporteRF10');
    const valBox = document.getElementById('resultadoValidacionRF10');
    const btnSubmit = document.getElementById('btnSubmitInscribirDeporteRF10');

    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    const grupo = (AdminState.gruposDeportivos || []).find(g => g.id === grupoId);
    if (!alumno || !grupo) return;

    const deps = Array.isArray(alumno.deportesAsignados) ? alumno.deportesAsignados : [];
    if (fichaBox) {
        fichaBox.innerHTML = `
            <div class="flex justify-between"><span>Nivel y Curso:</span><strong class="text-blue-900">${escaparHTML(alumno.nivel)} • ${escaparHTML(alumno.curso)}</strong></div>
            <div class="flex justify-between"><span>Horario de Cursada:</span><strong class="font-mono">${escaparHTML(alumno.horarioCursado || 'Lun a Vie 07:30 a 15:30 hs')}</strong></div>
            <div class="flex justify-between"><span>Deportes Actuales (${deps.length}/2):</span><strong class="${deps.length >= 2 ? 'text-rose-700' : 'text-emerald-700'}">${deps.length > 0 ? escaparHTML(deps.map(d => `${d.deporte} (${d.horario})`).join(' | ')) : 'Ninguno'}</strong></div>
        `;
    }

    const resultado = validarReglasInscripcionDeporteRF10(alumno, grupo);
    if (valBox) {
        valBox.className = resultado.valido
            ? 'p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 text-xs space-y-1.5'
            : 'p-3.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-950 text-xs space-y-1.5';

        valBox.innerHTML = `
            <p class="font-black uppercase text-[10px] tracking-wider">${resultado.valido ? '✅ Validación RF-10 Aprobada: Inscripción Habilitada' : '🚫 Inscripción Bloqueada por Regla de Negocio RF-10'}</p>
            <ul class="space-y-1">
                ${resultado.checks.map(ch => `
                    <li class="flex items-start gap-1.5">
                        <i class="fas ${ch.ok ? 'fa-check-circle text-emerald-600' : 'fa-times-circle text-rose-600'} mt-0.5 shrink-0"></i>
                        <span>${escaparHTML(ch.texto)}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    if (btnSubmit) {
        btnSubmit.disabled = !resultado.valido;
        btnSubmit.className = resultado.valido
            ? 'min-h-[42px] px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase rounded-xl shadow flex items-center gap-1.5 cursor-pointer'
            : 'min-h-[42px] px-5 py-2 bg-slate-300 text-slate-500 font-black uppercase rounded-xl flex items-center gap-1.5 cursor-not-allowed';
    }
}

function confirmarInscripcionDeporteRF10(e) {
    if (e) e.preventDefault();
    const legajo = document.getElementById('insDepAlumno')?.value;
    const grupoId = document.getElementById('insDepGrupo')?.value;
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    const grupo = (AdminState.gruposDeportivos || []).find(g => g.id === grupoId);
    if (!alumno || !grupo) return;

    const validacion = validarReglasInscripcionDeporteRF10(alumno, grupo);
    if (!validacion.valido) {
        mostrarToast(validacion.errores[0], 'error');
        return;
    }

    if (!Array.isArray(alumno.deportesAsignados)) alumno.deportesAsignados = [];
    alumno.deportesAsignados.push({
        grupoId: grupo.id,
        deporte: grupo.deporte,
        nivel: grupo.nivel,
        horario: grupo.horario,
        profesor: grupo.profesor,
        monto: grupo.arancel || 15000
    });
    alumno.deporte = alumno.deportesAsignados.map(d => d.deporte).join(', ');
    grupo.inscriptos = (grupo.inscriptos || 0) + 1;

    // Actualizar Listado 4 de Tesorería (Pagos por deporte, nivel, horario y profesor)
    AdminTesoreria.listadoDeportes.unshift({
        id: `DEP-${Date.now().toString().slice(-4)}`,
        alumnoNombre: alumno.nombre,
        legajo: alumno.legajo,
        nivel: alumno.nivel,
        curso: alumno.curso,
        deporte: grupo.deporte,
        horario: grupo.horario,
        profesor: grupo.profesor,
        monto: grupo.arancel || 15000,
        estadoPago: 'Pagado'
    });

    guardarEstadoAdminLocal();
    renderizarModuloDeportes();
    renderizarTablaAlumnos();
    if (typeof renderizarReporteTesoreria === 'function') {
        renderizarReporteTesoreria(AdminTesoreria.reporteActivo);
    }
    cerrarModalInscribirDeporte();
    mostrarToast(`¡${alumno.nombre} inscripto exitosamente en ${grupo.deporte} (${grupo.horario})! Actualizado Listado 4 de Tesorería.`, 'success');
}

function quitarDeporteAlumnoRF10(legajo, deporteNombre) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno || !Array.isArray(alumno.deportesAsignados)) return;

    alumno.deportesAsignados = alumno.deportesAsignados.filter(d => d.deporte !== deporteNombre);
    alumno.deporte = alumno.deportesAsignados.length > 0 ? alumno.deportesAsignados.map(d => d.deporte).join(', ') : 'Sin deporte';

    AdminTesoreria.listadoDeportes = AdminTesoreria.listadoDeportes.filter(
        item => !(item.legajo === legajo && item.deporte === deporteNombre)
    );

    guardarEstadoAdminLocal();
    renderizarModuloDeportes();
    renderizarTablaAlumnos();
    mostrarToast(`Baja de ${deporteNombre} procesada para ${alumno.nombre}. Cupo liberado.`, 'info');
}

// ====================================================================
// MÓDULO 2: PROFESORES, CURSOS, MATERIAS Y ASIGNACIONES (RF-05 A RF-07, RF-16 A RF-21)
// ====================================================================

function filtrarDocentesPorNivel(nivel) {
    AdminState.filtroDocenteNivel = nivel;
    document.querySelectorAll('.btn-filtro-doc-nivel').forEach(btn => {
        const txt = btn.textContent.trim().toLowerCase();
        const activo = (nivel === 'todos' && txt.includes('todos')) || txt === nivel.toLowerCase();
        btn.className = activo
            ? 'btn-filtro-doc-nivel px-3 py-1.5 rounded-lg font-bold text-[11px] bg-blue-900 text-white transition min-h-[36px]'
            : 'btn-filtro-doc-nivel px-3 py-1.5 rounded-lg font-bold text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 transition min-h-[36px]';
    });
    renderizarTablaDocentes();
}

function abrirModalGestionDocente(legajo = '') {
    const modal = document.getElementById('modalGestionDocente');
    if (!modal) return;

    const doc = legajo ? AdminState.docentes.find(d => d.legajo === legajo) : null;
    document.getElementById('docEditLegajo').value = doc ? doc.legajo : '';
    document.getElementById('docNombre').value = doc ? doc.nombre : '';
    document.getElementById('docDni').value = doc ? (doc.dni || '31.500.200') : '';
    document.getElementById('docEspecialidad').value = doc ? doc.rol : '';
    document.getElementById('docNivel').value = doc ? (doc.nivel || 'Secundario') : 'Secundario';
    document.getElementById('docArea').value = doc ? (doc.area || 'Ciencias Exactas') : 'Ciencias Exactas';
    document.getElementById('docEmail').value = doc ? doc.email : '';
    document.getElementById('docEstado').value = doc ? (doc.estado || 'Activo') : 'Activo';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalGestionDocente() {
    const modal = document.getElementById('modalGestionDocente');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function guardarDocenteRF05(e) {
    if (e) e.preventDefault();
    const editLegajo = document.getElementById('docEditLegajo').value;
    const nombre = document.getElementById('docNombre').value.trim();
    const dni = document.getElementById('docDni').value.trim();
    const rol = document.getElementById('docEspecialidad').value.trim();
    const nivel = document.getElementById('docNivel').value;
    const area = document.getElementById('docArea').value;
    const email = document.getElementById('docEmail').value.trim();
    const estado = document.getElementById('docEstado').value;

    if (!nombre || !dni || !rol) return;

    if (editLegajo) {
        const doc = AdminState.docentes.find(d => d.legajo === editLegajo);
        if (doc) {
            doc.nombre = nombre;
            doc.dni = dni;
            doc.rol = rol;
            doc.nivel = nivel;
            doc.area = area;
            doc.email = email;
            doc.estado = estado;
            mostrarToast(`Datos del profesor ${nombre} actualizados correctamente (RF-06).`, 'success');
        }
    } else {
        const nuevoLegajo = `DOC-2026-${String(AdminState.docentes.length + 1).padStart(2, '0')}`;
        AdminState.docentes.unshift({
            legajo: nuevoLegajo,
            dni,
            nombre,
            rol,
            area,
            nivel,
            email,
            dedicacion: 'Tiempo Completo',
            estado
        });
        mostrarToast(`Profesor ${nombre} (${nuevoLegajo}) registrado en el plantel oficial (RF-05).`, 'success');
    }

    guardarEstadoAdminLocal();
    renderizarTablaDocentes();
    renderizarContadoresDashboard();
    cerrarModalGestionDocente();
}

function cambiarEstadoDocenteRF07(legajo) {
    const doc = AdminState.docentes.find(d => d.legajo === legajo);
    if (!doc) return;
    const orden = ['Activo', 'En Licencia', 'Inactivo'];
    const idx = orden.indexOf(doc.estado || 'Activo');
    doc.estado = orden[(idx + 1) % orden.length];

    guardarEstadoAdminLocal();
    renderizarTablaDocentes();
    renderizarContadoresDashboard();
    mostrarToast(`Estado laboral de ${doc.nombre} cambiado a: ${doc.estado} (RF-07).`, 'info');
}

function abrirModalAsignarMateriaProfesor() {
    const modal = document.getElementById('modalAsignarMateriaProfesor');
    if (!modal) return;

    const selDoc = document.getElementById('asigDocente');
    if (selDoc) {
        const activos = AdminState.docentes.filter(d => d.estado === 'Activo');
        selDoc.innerHTML = activos.map(d =>
            `<option value="${escaparHTML(d.legajo)}">${escaparHTML(d.nombre)} (${escaparHTML(d.legajo)} — ${escaparHTML(d.nivel)})</option>`
        ).join('');
    }

    const selCurso = document.getElementById('asigCurso');
    if (selCurso) {
        selCurso.innerHTML = (AdminState.cursosInstitucionales || []).map(c =>
            `<option value="${escaparHTML(c.id)}">${escaparHTML(c.nombre)} — Nivel ${escaparHTML(c.nivel)}</option>`
        ).join('');
    }

    actualizarMateriasPorCursoSelect();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function actualizarMateriasPorCursoSelect() {
    const cursoId = document.getElementById('asigCurso')?.value;
    const cursoObj = (AdminState.cursosInstitucionales || []).find(c => c.id === cursoId);
    const inputMat = document.getElementById('asigMateria');
    if (cursoObj && inputMat && Array.isArray(cursoObj.materias) && cursoObj.materias.length > 0) {
        inputMat.value = cursoObj.materias[0];
    }
}

function cerrarModalAsignarMateriaProfesor() {
    const modal = document.getElementById('modalAsignarMateriaProfesor');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function guardarAsignacionMateriaRF21(e) {
    if (e) e.preventDefault();
    const docLegajo = document.getElementById('asigDocente')?.value;
    const cursoId = document.getElementById('asigCurso')?.value;
    const materia = document.getElementById('asigMateria')?.value.trim();
    const horario = document.getElementById('asigHorario')?.value;

    const doc = AdminState.docentes.find(d => d.legajo === docLegajo);
    const cursoObj = (AdminState.cursosInstitucionales || []).find(c => c.id === cursoId);
    if (!doc || !cursoObj || !materia) return;

    // Validar que el docente no tenga superposición horaria en otro curso (RF-21)
    const choqueDocente = (AdminState.asignacionesDocentes || []).find(
        a => a.docenteLegajo === doc.legajo && a.horario === horario
    );
    if (choqueDocente) {
        mostrarToast(`Conflicto RF-21: ${doc.nombre} ya dicta ${choqueDocente.materia} (${choqueDocente.curso}) en el horario ${horario}.`, 'error');
        return;
    }

    AdminState.asignacionesDocentes.unshift({
        id: `ASG-${Date.now().toString().slice(-4)}`,
        docenteLegajo: doc.legajo,
        docenteNombre: doc.nombre,
        nivel: cursoObj.nivel,
        curso: cursoObj.nombre,
        materia,
        horario
    });

    if (!cursoObj.materias.includes(materia)) {
        cursoObj.materias.push(materia);
    }

    guardarEstadoAdminLocal();
    renderizarTablaDocentes();
    cerrarModalAsignarMateriaProfesor();
    mostrarToast(`Cátedra "${materia}" (${cursoObj.nombre}) asignada a ${doc.nombre} (RF-21).`, 'success');
}

function eliminarAsignacionDocenteRF21(id) {
    AdminState.asignacionesDocentes = (AdminState.asignacionesDocentes || []).filter(a => a.id !== id);
    guardarEstadoAdminLocal();
    renderizarTablaDocentes();
    mostrarToast('Asignación académica removida.', 'info');
}

function abrirModalGestionCursosMaterias() {
    const modal = document.getElementById('modalGestionCursosMaterias');
    if (!modal) return;
    renderizarListaCursosMateriasModal();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalGestionCursosMaterias() {
    const modal = document.getElementById('modalGestionCursosMaterias');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function renderizarListaCursosMateriasModal() {
    const cont = document.getElementById('listaCursosMateriasModal');
    if (!cont) return;

    cont.innerHTML = (AdminState.cursosInstitucionales || []).map(c => `
        <div class="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
                <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-black text-[10px] uppercase border border-blue-200">Nivel ${escaparHTML(c.nivel)} (Exclusivo RF-17)</span>
                    <strong class="text-slate-900 text-sm">${escaparHTML(c.nombre)}</strong>
                </div>
                <p class="text-[11px] text-slate-500 mt-1"><i class="fas fa-clock mr-1"></i>Horario de Cursada (RF-19): <strong class="font-mono">${escaparHTML(c.horarioCursado)}</strong></p>
                <p class="text-[11px] text-indigo-900 mt-1"><strong>Materias (RF-18):</strong> ${escaparHTML((c.materias || []).join(' • '))}</p>
            </div>
        </div>
    `).join('');
}

function agregarNuevoCursoRF17(e) {
    if (e) e.preventDefault();
    const nivel = document.getElementById('nuevoCursoNivel').value;
    const nombre = document.getElementById('nuevoCursoNombre').value.trim();
    const horarioCursado = document.getElementById('nuevoCursoHorario').value.trim();
    if (!nombre) return;

    if (AdminState.cursosInstitucionales.some(c => c.nombre.toLowerCase() === nombre.toLowerCase())) {
        mostrarToast('Regla RF-17: Ya existe un curso con esa denominación. Cada curso pertenece a un único nivel.', 'error');
        return;
    }

    AdminState.cursosInstitucionales.push({
        id: `CUR-${nivel.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
        nivel,
        nombre,
        horarioCursado,
        materias: ['Matemática', 'Lengua y Literatura', 'Ciencias', 'Inglés Bilingüe', 'Educación Física']
    });

    document.getElementById('nuevoCursoNombre').value = '';
    guardarEstadoAdminLocal();
    renderizarListaCursosMateriasModal();
    mostrarToast(`Curso "${nombre}" vinculado exclusivamente al Nivel ${nivel} (RF-17).`, 'success');
}

// ====================================================================
// MÓDULO 3: SERVICIOS DE TRANSPORTE (RF-11) Y COMEDOR (RF-12)
// ====================================================================

function abrirModalInscribirTransporte() {
    const modal = document.getElementById('modalInscribirTransporte');
    if (!modal) return;

    const sel = document.getElementById('transAlumnoSelect');
    if (sel) {
        sel.innerHTML = AdminState.alumnos.map(a =>
            `<option value="${escaparHTML(a.legajo)}">${escaparHTML(a.nombre)} (${escaparHTML(a.legajo)}) — Actual: ${escaparHTML(a.transporte || 'Sin transporte')}</option>`
        ).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalInscribirTransporte() {
    const modal = document.getElementById('modalInscribirTransporte');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function guardarInscripcionTransporteRF11(e) {
    if (e) e.preventDefault();
    const legajo = document.getElementById('transAlumnoSelect')?.value;
    const recorrido = document.getElementById('transRecorridoSelect')?.value;
    const parada = document.getElementById('transParadaInput')?.value.trim();

    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno || !recorrido || !parada) return;

    alumno.transporte = recorrido;
    alumno.parada = parada;

    const rutaObj = AdminState.rutasMicros.find(r => r.linea === recorrido) || AdminState.rutasMicros[0];
    const choferMovil = rutaObj ? `${rutaObj.chofer} (${rutaObj.patente})` : 'Móvil Oficial';
    const horario = rutaObj ? rutaObj.horarioArribo : '07:15 hs / 17:30 hs';

    // Sincronizar con Listado 5 de Tesorería
    const existente = AdminTesoreria.listadoTransporte.find(t => t.legajo === legajo);
    if (existente) {
        existente.recorrido = recorrido;
        existente.parada = parada;
        existente.movilChofer = choferMovil;
        existente.horario = horario;
    } else {
        AdminTesoreria.listadoTransporte.unshift({
            id: `TRA-${Date.now().toString().slice(-4)}`,
            alumnoNombre: alumno.nombre,
            legajo: alumno.legajo,
            curso: `${alumno.curso} ${alumno.nivel}`,
            recorrido,
            parada,
            horario,
            movilChofer: choferMovil,
            monto: 22000,
            estadoPago: 'Pagado'
        });
    }

    guardarEstadoAdminLocal();
    renderizarModuloServicios();
    renderizarTablaAlumnos();
    cerrarModalInscribirTransporte();
    mostrarToast(`${alumno.nombre} inscripto en ${recorrido} (Parada: ${parada}). Actualizado Listado 5 de Tesorería (RF-11).`, 'success');
}

function darBajaTransporteRF11(legajo) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;
    alumno.transporte = 'Sin transporte';
    alumno.parada = 'Retiro particular';
    AdminTesoreria.listadoTransporte = AdminTesoreria.listadoTransporte.filter(t => t.legajo !== legajo);

    guardarEstadoAdminLocal();
    renderizarModuloServicios();
    renderizarTablaAlumnos();
    mostrarToast(`Baja de servicio de transporte registrada para ${alumno.nombre} (RF-11).`, 'info');
}

function abrirModalInscribirComedor() {
    const modal = document.getElementById('modalInscribirComedor');
    if (!modal) return;

    const sel = document.getElementById('comAlumnoSelect');
    if (sel) {
        sel.innerHTML = AdminState.alumnos.map(a =>
            `<option value="${escaparHTML(a.legajo)}">${escaparHTML(a.nombre)} (${escaparHTML(a.legajo)}) — Actual: ${escaparHTML(a.comedor || 'Sin Comedor')}</option>`
        ).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalInscribirComedor() {
    const modal = document.getElementById('modalInscribirComedor');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function guardarInscripcionComedorRF12(e) {
    if (e) e.preventDefault();
    const legajo = document.getElementById('comAlumnoSelect')?.value;
    const menu = document.getElementById('comMenuSelect')?.value;
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;

    alumno.comedor = menu;
    guardarEstadoAdminLocal();
    renderizarModuloServicios();
    renderizarTablaAlumnos();
    cerrarModalInscribirComedor();
    mostrarToast(`Servicio de comedor de ${alumno.nombre} actualizado a: ${menu} (RF-12).`, 'success');
}

function darBajaComedorRF12(legajo) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;
    alumno.comedor = 'Sin Comedor';
    guardarEstadoAdminLocal();
    renderizarModuloServicios();
    renderizarTablaAlumnos();
    mostrarToast(`Baja de comedor escolar procesada para ${alumno.nombre} (RF-12).`, 'info');
}

// ====================================================================
// MÓDULO 4: REGLA FINANCIERA DE TRANSFERENCIAS Y COMPROBANTES PENDIENTES (M-04, M-05, RF-14, RF-20)
// ====================================================================

if (!Array.isArray(AdminTesoreria.comprobantesPendientes)) {
    AdminTesoreria.comprobantesPendientes = [
        {
            id: 'TRF-2026-001',
            fecha: '15/11/2026',
            alumnoNombre: 'Valentina Morales',
            legajo: 'EPT-2026-0054',
            curso: '4° Grado "B" Primario',
            tutorNombre: 'Andrea Morales',
            periodo: 'Octubre 2026',
            conceptos: 'Pago Parcial: Arancel Educativo + Comedor',
            importe: 36000,
            nroOperacion: 'TRF-NBCH-884120',
            archivo: 'Comprobante_Parcial_Morales_Octubre.pdf',
            estado: 'Pendiente de Revisión',
            incompletoId: 'INC-002'
        },
        {
            id: 'TRF-2026-002',
            fecha: '16/11/2026',
            alumnoNombre: 'Bruno Valenzuela',
            legajo: 'EPT-2026-0088',
            curso: '2° Año "A" Secundario',
            tutorNombre: 'Carlos Valenzuela',
            periodo: 'Octubre 2026',
            conceptos: 'Cancelación Total: Educación + Deporte + Transporte',
            importe: 118000,
            nroOperacion: 'TRF-BNA-441092',
            archivo: 'Transferencia_Total_Valenzuela.pdf',
            estado: 'Pendiente de Revisión',
            incompletoId: 'INC-001'
        }
    ];
}

function guardarComprobantesLocal() {
    try {
        localStorage.setItem('ept_comprobantes_m04_v2', JSON.stringify(AdminTesoreria.comprobantesPendientes));
    } catch (_) {}
}

function restaurarComprobantesLocal() {
    try {
        const raw = localStorage.getItem('ept_comprobantes_m04_v2');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                AdminTesoreria.comprobantesPendientes = parsed;
            }
        }
    } catch (_) {}
}

restaurarComprobantesLocal();

function renderizarBandejaComprobantesAdmin() {
    const cont = document.getElementById('contenedorBandejaComprobantesAdmin');
    const badge = document.getElementById('badgeComprobantesPendientesAdmin');
    if (!cont) return;

    const lista = AdminTesoreria.comprobantesPendientes || [];
    const pendientes = lista.filter(c => c.estado === 'Pendiente de Revisión');
    if (badge) {
        badge.textContent = `${pendientes.length} Pendiente(s) de Revisión`;
        badge.className = pendientes.length > 0
            ? 'text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300'
            : 'text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300';
    }

    if (lista.length === 0) {
        cont.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">No hay comprobantes de transferencia registrados.</p>`;
        return;
    }

    cont.innerHTML = `
        <div class="overflow-x-auto border border-slate-200 rounded-xl">
            <table class="w-full min-w-[740px] text-left text-xs text-slate-700">
                <thead>
                    <tr class="bg-slate-50 border-b text-[10px] font-black uppercase text-slate-500">
                        <th class="p-3">Fecha / Op.</th>
                        <th class="p-3">Alumno y Familia</th>
                        <th class="p-3">Período y Conceptos (M-04)</th>
                        <th class="p-3">Archivo Adjunto</th>
                        <th class="p-3 text-right">Monto Transferido</th>
                        <th class="p-3 text-center">Estado (Regla M-04/M-05)</th>
                        <th class="p-3 text-right">Decisión Administrativa (M-05)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${lista.map(c => {
                        const esPendiente = c.estado === 'Pendiente de Revisión';
                        const esAprobado = c.estado === 'Aprobado';
                        return `
                            <tr class="hover:bg-slate-50 transition ${esPendiente ? 'bg-amber-50/30' : ''}">
                                <td class="p-3 font-mono text-[11px]">
                                    <strong class="text-slate-900 block">${escaparHTML(c.id)}</strong>
                                    <span class="text-slate-500">${escaparHTML(c.fecha)}</span>
                                </td>
                                <td class="p-3">
                                    <p class="font-bold text-slate-900">${escaparHTML(c.alumnoNombre)} <span class="text-[10px] font-mono text-blue-900">(${escaparHTML(c.legajo)})</span></p>
                                    <p class="text-[10px] text-slate-500">Tutor: ${escaparHTML(c.tutorNombre)}</p>
                                </td>
                                <td class="p-3">
                                    <span class="font-bold text-slate-800 block">${escaparHTML(c.periodo)}</span>
                                    <span class="text-[10px] text-slate-500">${escaparHTML(c.conceptos)}</span>
                                </td>
                                <td class="p-3">
                                    <button type="button" onclick="mostrarToast('Previsualizando comprobante: ${escaparHTML(c.archivo)} (Op: ${escaparHTML(c.nroOperacion)})', 'info')"
                                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-mono text-[10px] font-bold border border-blue-200">
                                        <i class="fas fa-file-pdf text-rose-600"></i>
                                        <span class="truncate max-w-[140px]">${escaparHTML(c.archivo)}</span>
                                    </button>
                                </td>
                                <td class="p-3 text-right font-mono font-black text-slate-900 text-sm">$ ${Number(c.importe).toLocaleString('es-AR')}</td>
                                <td class="p-3 text-center">
                                    <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${esPendiente ? 'bg-amber-100 text-amber-900 border border-amber-300' : (esAprobado ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800')}">
                                        ${esPendiente ? '⏳ Pendiente (Sin descontar)' : (esAprobado ? '✅ Aprobado (Saldo descontado)' : '❌ Rechazado')}
                                    </span>
                                </td>
                                <td class="p-3 text-right">
                                    ${esPendiente ? `
                                        <div class="flex items-center justify-end gap-1.5">
                                            <button type="button" onclick="aprobarComprobanteTransferenciaM05('${escaparHTML(c.id)}')"
                                                class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-[10px] uppercase tracking-wider shadow-sm transition active:scale-95">
                                                ✅ Aprobar y Descontar
                                            </button>
                                            <button type="button" onclick="rechazarComprobanteTransferenciaM05('${escaparHTML(c.id)}')"
                                                class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-lg text-[10px] uppercase transition">
                                                ❌ Rechazar
                                            </button>
                                        </div>
                                    ` : `<span class="text-[10px] text-slate-400 font-bold uppercase">Auditado</span>`}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function aprobarComprobanteTransferenciaM05(compId) {
    const comp = (AdminTesoreria.comprobantesPendientes || []).find(c => c.id === compId);
    if (!comp || comp.estado !== 'Pendiente de Revisión') return;

    comp.estado = 'Aprobado';

    // Impactar descuento en Listado 3 (Pagos Incompletos) o pasar a Listado 2 (Pagos Completos)
    const idxInc = AdminTesoreria.listadoIncompletos.findIndex(
        i => i.id === comp.incompletoId || i.legajo === comp.legajo
    );

    if (idxInc !== -1) {
        const inc = AdminTesoreria.listadoIncompletos[idxInc];
        inc.montoAbonado = Number(inc.montoAbonado || 0) + Number(comp.importe || 0);
        inc.saldoPendiente = Math.max(0, Number(inc.montoTotal || 0) - inc.montoAbonado);

        if (inc.saldoPendiente === 0) {
            AdminTesoreria.listadoCompletos.unshift({
                id: `COMP-${Date.now().toString().slice(-4)}`,
                periodo: inc.periodo,
                anioCurso: inc.anioCurso,
                alumnoNombre: inc.alumnoNombre,
                legajo: inc.legajo,
                dni: inc.dni || '45.123.456',
                fechaPago: new Date().toLocaleDateString('es-AR'),
                numeroRecibo: `REC-2026-TRF-${Math.floor(1000 + Math.random() * 9000)}`,
                composicion: `${comp.conceptos} (Aprobado M-05)`,
                montoTotal: inc.montoTotal,
                estado: 'PAGO COMPLETO'
            });
            AdminTesoreria.listadoIncompletos.splice(idxInc, 1);
        }
    }

    // Impactar en las cuotas del Campus del Estudiante si coincide
    if (window.EstadoEstudiante && Array.isArray(window.EstadoEstudiante.cuotas)) {
        const cuotaEst = window.EstadoEstudiante.cuotas.find(
            cu => String(cu.id) === String(comp.cuotaId) || cu.periodo === comp.periodo
        );
        if (cuotaEst) {
            const abonadoPrev = Number(cuotaEst.monto_abonado || 0);
            const nuevoAbonado = abonadoPrev + Number(comp.importe || 0);
            cuotaEst.monto_abonado = nuevoAbonado;
            if (nuevoAbonado >= Number(cuotaEst.monto_total || 0)) {
                cuotaEst.estado = 'Pagada';
                cuotaEst.estado_pago = 'Completo (Transferencia Aprobada M-05)';
                cuotaEst.numero_comprobante = `REC-TRF-${Math.floor(1000 + Math.random() * 9000)}`;
                cuotaEst.fecha_pago = new Date().toISOString();
                cuotaEst.medio_pago = `Transferencia Aprobada (${comp.nroOperacion})`;
            } else {
                cuotaEst.estado = 'Pago Incompleto';
            }
            if (typeof window.renderizarModuloCuotas === 'function') {
                window.renderizarModuloCuotas();
            }
        }
    }

    guardarComprobantesLocal();
    renderizarBandejaComprobantesAdmin();
    renderizarReporteTesoreria(AdminTesoreria.reporteActivo);

    const kpiMora = document.getElementById('adminStatMoraCantidad');
    if (kpiMora) kpiMora.textContent = `${AdminTesoreria.listadoIncompletos.length} Alumnos`;

    mostrarToast(`✅ Comprobante ${comp.id} APROBADO (M-05). Recién ahora se descontaron $ ${Number(comp.importe).toLocaleString('es-AR')} de la deuda de ${comp.alumnoNombre}.`, 'success');
}

function rechazarComprobanteTransferenciaM05(compId) {
    const comp = (AdminTesoreria.comprobantesPendientes || []).find(c => c.id === compId);
    if (!comp) return;
    comp.estado = 'Rechazado';
    guardarComprobantesLocal();
    renderizarBandejaComprobantesAdmin();
    if (typeof window.renderizarModuloCuotas === 'function') {
        window.renderizarModuloCuotas();
    }
    mostrarToast(`❌ Comprobante ${comp.id} rechazado. El saldo adeudado de ${comp.alumnoNombre} se mantiene sin cambios.`, 'warning');
}

function abrirModalInformarTransferencia(cuotaIdPre = '') {
    const modal = document.getElementById('modalInformarTransferencia');
    if (!modal) return;

    const cuotas = (window.EstadoEstudiante?.cuotas || []).filter(c => c.estado !== 'Pagada');
    const sel = document.getElementById('transfCuotaSelect');
    if (sel) {
        if (cuotas.length > 0) {
            sel.innerHTML = cuotas.map(c => {
                const saldo = Math.max(0, Number(c.monto_total || 0) - Number(c.monto_abonado || 0));
                return `<option value="${escaparHTML(c.id)}" data-saldo="${saldo}" data-periodo="${escaparHTML(c.periodo)}" ${String(c.id) === String(cuotaIdPre) ? 'selected' : ''}>Cuota ${escaparHTML(c.periodo)} — Saldo Pendiente: $ ${saldo.toLocaleString('es-AR')}</option>`;
            }).join('');
        } else {
            sel.innerHTML = `<option value="Noviembre 2026" data-saldo="159500" data-periodo="Noviembre 2026">Cuota Noviembre 2026 — Saldo: $ 159.500</option>`;
        }
    }

    actualizarMontoSugeridoTransferencia();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalInformarTransferencia() {
    const modal = document.getElementById('modalInformarTransferencia');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function actualizarMontoSugeridoTransferencia() {
    const sel = document.getElementById('transfCuotaSelect');
    const opt = sel?.options[sel.selectedIndex];
    const saldoMax = Number(opt?.getAttribute('data-saldo') || 159500);

    const inputImp = document.getElementById('transfImporteInput');
    const hint = document.getElementById('transfSaldoMaximoHint');
    if (inputImp) {
        inputImp.max = saldoMax;
        inputImp.value = saldoMax;
    }
    if (hint) {
        hint.textContent = `Podés transferir un pago parcial o el saldo total (Máx: $ ${saldoMax.toLocaleString('es-AR')}).`;
    }
}

function recalcularCheckboxesTransferencia() {
    const chkEdu = document.getElementById('chkConceptoEducacion')?.checked;
    const chkDep = document.getElementById('chkConceptoDeporte')?.checked;
    const chkSrv = document.getElementById('chkConceptoServicios')?.checked;

    const sel = document.getElementById('transfCuotaSelect');
    const opt = sel?.options[sel.selectedIndex];
    const saldoMax = Number(opt?.getAttribute('data-saldo') || 159500);

    let suma = 0;
    if (chkEdu) suma += 103000;
    if (chkDep) suma += 15000;
    if (chkSrv) suma += 50000;
    if (suma === 0) suma = Math.min(50000, saldoMax);

    const inputImp = document.getElementById('transfImporteInput');
    if (inputImp) {
        inputImp.value = Math.min(suma, saldoMax);
    }
}

function enviarComprobanteTransferenciaM04(e) {
    if (e) e.preventDefault();
    const sel = document.getElementById('transfCuotaSelect');
    const opt = sel?.options[sel.selectedIndex];
    const cuotaId = sel?.value || 'Noviembre 2026';
    const periodo = opt?.getAttribute('data-periodo') || 'Noviembre 2026';
    const saldoMax = Number(opt?.getAttribute('data-saldo') || 159500);

    const importe = Number(document.getElementById('transfImporteInput')?.value || 0);
    const nroOperacion = document.getElementById('transfNroOperacion')?.value.trim() || 'TRF-BNA-001';
    const archivo = document.getElementById('transfArchivoNombre')?.value.trim() || 'Comprobante_Transferencia.pdf';

    if (importe <= 0 || importe > saldoMax) {
        mostrarToast(`Regla M-04: El importe transferido ($ ${importe.toLocaleString('es-AR')}) debe ser mayor a $0 y no puede superar el saldo pendiente ($ ${saldoMax.toLocaleString('es-AR')}).`, 'error');
        return;
    }

    const conceptosArr = [];
    if (document.getElementById('chkConceptoEducacion')?.checked) conceptosArr.push('Educación');
    if (document.getElementById('chkConceptoDeporte')?.checked) conceptosArr.push('Deporte');
    if (document.getElementById('chkConceptoServicios')?.checked) conceptosArr.push('Servicios');
    const tipoPagoTxt = importe < saldoMax ? 'Pago Parcial' : 'Pago Total';

    const mat = window.EstadoEstudiante?.matricula || AdminState.alumnos[0];
    const nuevoComp = {
        id: `TRF-2026-${String((AdminTesoreria.comprobantesPendientes?.length || 2) + 1).padStart(3, '0')}`,
        fecha: new Date().toLocaleDateString('es-AR'),
        alumnoNombre: mat?.nombre || 'Ignacio Benjamín Acosta',
        legajo: mat?.legajo || 'EPT-2026-001',
        curso: `${mat?.curso || '3° Año "A"'} ${mat?.nivel || 'Secundario'}`,
        tutorNombre: mat?.tutor || 'Mariana Gómez de Acosta',
        periodo,
        cuotaId,
        conceptos: `${tipoPagoTxt}: ${conceptosArr.join(' + ') || 'Cuota Mensual'}`,
        importe,
        nroOperacion,
        archivo,
        estado: 'Pendiente de Revisión'
    };

    AdminTesoreria.comprobantesPendientes.unshift(nuevoComp);
    guardarComprobantesLocal();
    renderizarBandejaComprobantesAdmin();
    renderizarBannerComprobantesEstudianteM04();
    if (typeof window.renderizarModuloCuotas === 'function') {
        window.renderizarModuloCuotas();
    }

    cerrarModalInformarTransferencia();
    mostrarToast(`📎 Comprobante ${nuevoComp.id} enviado en estado "Pendiente de Revisión" (M-04). La deuda NO disminuye hasta que Administración lo apruebe en Tesorería (M-05).`, 'info');
}

function renderizarBannerComprobantesEstudianteM04() {
    const banner = document.getElementById('bannerComprobantesPendientesEstudiante');
    if (!banner) return;

    const legajoActual = window.EstadoEstudiante?.matricula?.legajo;
    const misComprobantes = (AdminTesoreria.comprobantesPendientes || []).filter(
        c => c.estado === 'Pendiente de Revisión' && (!legajoActual || c.legajo === legajoActual)
    );

    if (misComprobantes.length === 0) {
        banner.classList.add('hidden');
        return;
    }

    banner.classList.remove('hidden');
    banner.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-start gap-2.5">
                <i class="fas fa-hourglass-half text-amber-700 text-base mt-0.5 shrink-0"></i>
                <div>
                    <p class="font-black uppercase text-[11px] tracking-wider text-amber-900">
                        ⏳ Tenés ${misComprobantes.length} comprobante(s) de transferencia en estado «Pendiente de Revisión» (Regla M-04)
                    </p>
                    <p class="text-[11px] text-amber-800 mt-0.5">
                        ${misComprobantes.map(c => `${escaparHTML(c.periodo)}: <strong>$ ${Number(c.importe).toLocaleString('es-AR')}</strong> (${escaparHTML(c.archivo)})`).join(' • ')}
                        — <strong>El saldo adeudado no disminuye hasta que Administración apruebe la transferencia (M-05).</strong>
                    </p>
                </div>
            </div>
        </div>
    `;
}

// ====================================================================
// RF-14 (PADRE/TUTOR Y HERMANOS) Y RF-20 (INSCRIPCIÓN A MATERIAS SIN DUPLICADOS)
// ====================================================================

function abrirModalFichaIntegralAlumno(legajoPre = '') {
    const modal = document.getElementById('modalFichaIntegralAlumno');
    if (!modal) return;

    const sel = document.getElementById('fichaIntAlumnoSelect');
    if (sel) {
        sel.innerHTML = AdminState.alumnos.map(a =>
            `<option value="${escaparHTML(a.legajo)}" ${a.legajo === legajoPre ? 'selected' : ''}>${escaparHTML(a.nombre)} (${escaparHTML(a.legajo)}) — ${escaparHTML(a.nivel)} ${escaparHTML(a.curso)}</option>`
        ).join('');
    }

    cargarDatosFichaIntegralAlumno();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalFichaIntegralAlumno() {
    const modal = document.getElementById('modalFichaIntegralAlumno');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function cargarDatosFichaIntegralAlumno() {
    const legajo = document.getElementById('fichaIntAlumnoSelect')?.value;
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;

    document.getElementById('rf14TutorNombre').value = alumno.tutor || '';
    document.getElementById('rf14TutorDni').value = alumno.tutorDni || '32.114.560';
    document.getElementById('rf14TutorEmail').value = alumno.tutorEmail || 'familia@gmail.com';

    // Buscar hermanos por mismo tutor o cargados en array (RF-14)
    const otrosHijosMismoTutor = AdminState.alumnos.filter(
        a => a.legajo !== alumno.legajo && (a.tutor || '').toLowerCase() === (alumno.tutor || '').toLowerCase()
    ).map(a => `${a.nombre} (${a.legajo})`);
    const hermanosTotal = Array.from(new Set([...(alumno.hermanos || []), ...otrosHijosMismoTutor]));

    const badgeHerm = document.getElementById('badgeHermanosVinculadosRF14');
    if (badgeHerm) {
        badgeHerm.textContent = hermanosTotal.length > 0
            ? `Hermanos vinculados: ${hermanosTotal.join(', ')}`
            : 'Hijo único en el padrón actual';
    }

    const infoCurso = document.getElementById('rf20CursoNivelInfo');
    if (infoCurso) {
        infoCurso.textContent = `Nivel ${alumno.nivel} • Curso: ${alumno.curso} • Horario: ${alumno.horarioCursado || 'Lun a Vie 07:30 a 15:30 hs'}`;
    }

    const contMat = document.getElementById('rf20ListaMateriasAlumno');
    if (contMat) {
        const mats = Array.isArray(alumno.materiasCursado) ? alumno.materiasCursado : [];
        contMat.innerHTML = mats.map(m => `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-950 font-bold text-xs shadow-sm">
                <i class="fas fa-check-circle text-emerald-600 text-[10px]"></i>
                <span>${escaparHTML(m)}</span>
                <button type="button" onclick="quitarMateriaAlumnoRF20('${escaparHTML(alumno.legajo)}', '${escaparHTML(m)}')" class="text-slate-400 hover:text-rose-600 ml-1" title="Dar de baja materia">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
    }
}

function guardarTutorAlumnoRF14(e) {
    if (e) e.preventDefault();
    const legajo = document.getElementById('fichaIntAlumnoSelect')?.value;
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno) return;

    alumno.tutor = document.getElementById('rf14TutorNombre').value.trim();
    alumno.tutorDni = document.getElementById('rf14TutorDni').value.trim();
    alumno.tutorEmail = document.getElementById('rf14TutorEmail').value.trim();

    guardarEstadoAdminLocal();
    cargarDatosFichaIntegralAlumno();
    renderizarTablaAlumnos();
    mostrarToast(`Vínculo familiar Padre/Tutor de ${alumno.nombre} actualizado con éxito (RF-14).`, 'success');
}

function inscribirMateriaAlumnoRF20(e) {
    if (e) e.preventDefault();
    const legajo = document.getElementById('fichaIntAlumnoSelect')?.value;
    const input = document.getElementById('rf20NuevaMateriaInput');
    const nuevaMat = (input?.value || '').trim();
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno || !nuevaMat) return;

    if (!Array.isArray(alumno.materiasCursado)) alumno.materiasCursado = [];

    // Regla RF-20: No permitir inscribir 2 veces en la misma materia
    if (alumno.materiasCursado.some(m => m.toLowerCase() === nuevaMat.toLowerCase())) {
        mostrarToast(`Regla RF-20: El alumno ${alumno.nombre} ya se encuentra inscripto en la materia "${nuevaMat}". No se admiten inscripciones duplicadas.`, 'error');
        return;
    }

    alumno.materiasCursado.push(nuevaMat);
    input.value = '';
    guardarEstadoAdminLocal();
    cargarDatosFichaIntegralAlumno();
    renderizarTablaAlumnos();
    mostrarToast(`Materia "${nuevaMat}" inscripta en el plan de cursado de ${alumno.nombre} (RF-20).`, 'success');
}

function quitarMateriaAlumnoRF20(legajo, materia) {
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo);
    if (!alumno || !Array.isArray(alumno.materiasCursado)) return;
    alumno.materiasCursado = alumno.materiasCursado.filter(m => m !== materia);
    guardarEstadoAdminLocal();
    cargarDatosFichaIntegralAlumno();
    renderizarTablaAlumnos();
}

function renderizarMateriasCursadoEstudiante(matricula) {
    const cont = document.getElementById('contenedorMateriasCursadoEstudiante');
    if (!cont) return;

    const alEnPadron = AdminState.alumnos.find(a => a.legajo === matricula?.legajo) || AdminState.alumnos[0];
    const materias = alEnPadron?.materiasCursado || ['Matemática', 'Lengua y Literatura', 'Física y Química', 'Historia', 'Robótica y Programación', 'Inglés Bilingüe'];
    const horario = alEnPadron?.horarioCursado || 'Lun a Vie 07:30 a 15:30 hs';
    const deportes = alEnPadron?.deportesAsignados || [];

    cont.innerHTML = materias.map((m, i) => `
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-2">
            <div>
                <span class="text-[10px] font-black uppercase text-blue-900 bg-blue-100 px-2 py-0.5 rounded">Materia Regular #${i + 1} (RF-20)</span>
                <h4 class="font-black text-slate-900 text-sm mt-1.5">${escaparHTML(m)}</h4>
                <p class="text-[11px] text-slate-500 mt-1"><i class="fas fa-clock mr-1"></i>${escaparHTML(horario)}</p>
            </div>
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Cursando</span>
        </div>
    `).join('') + deportes.map(d => `
        <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-start justify-between gap-2">
            <div>
                <span class="text-[10px] font-black uppercase text-emerald-900 bg-emerald-200/70 px-2 py-0.5 rounded">⚽ Deporte Extracurricular (RF-10)</span>
                <h4 class="font-black text-slate-900 text-sm mt-1.5">${escaparHTML(d.deporte)}</h4>
                <p class="text-[11px] text-slate-600 mt-1"><i class="fas fa-clock mr-1"></i>${escaparHTML(d.horario)} • ${escaparHTML(d.profesor)}</p>
            </div>
            <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">Activo</span>
        </div>
    `).join('');
}

// ====================================================================
// MÓDULO 5: LOS 9 REPORTES ACADÉMICOS E INSTITUCIONALES DE DIRECCIÓN (RF-22)
// ====================================================================

let reporteRF22Activo = 1;
let filtroRF22Valor = 'todos';

function cambiarReporteRF22(nro) {
    reporteRF22Activo = Number(nro);
    filtroRF22Valor = 'todos';

    for (let i = 1; i <= 9; i++) {
        const btn = document.getElementById(`btnRF22_${i}`);
        if (!btn) continue;
        if (i === reporteRF22Activo) {
            btn.className = 'btn-rf22 min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold transition bg-blue-900 text-white shadow-sm flex items-center gap-2 text-left';
        } else {
            btn.className = 'btn-rf22 min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold transition bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-2 text-left';
        }
    }

    renderizarReporteRF22();
}

function filtrarVistaRF22(valor) {
    filtroRF22Valor = valor;
    renderizarReporteRF22();
}

function renderizarReporteRF22() {
    const cont = document.getElementById('contenedorReporteDireccionRF22');
    const lbl = document.getElementById('labelReporteRF22Activo');
    if (!cont) return;

    const titulos = {
        1: 'Reporte 1 (RF-22): Listado de Alumnos por Curso',
        2: 'Reporte 2 (RF-22): Listado de Alumnos por Materia',
        3: 'Reporte 3 (RF-22): Listado de Docentes por Nivel Educativo',
        4: 'Reporte 4 (RF-22): Listado de Alumnos por Deporte',
        5: 'Reporte 5 (RF-22): Listado de Alumnos por Recorrido de Transporte',
        6: 'Reporte 6 (RF-22): Ficha Integral de un Alumno (Académica, Familiar, Deportiva y Arancelaria)',
        7: 'Reporte 7 (RF-22): Cursos, Materias y Horarios Asignados a un Docente',
        8: 'Reporte 8 (RF-22): Listado de Alumnos por Deporte y Nivel Educativo',
        9: 'Reporte 9 (RF-22): Alumnos por Deporte, Nivel, Horario y Profesor Responsable'
    };
    if (lbl) lbl.textContent = titulos[reporteRF22Activo] || '';

    // 1. Alumnos por Curso
    if (reporteRF22Activo === 1) {
        const cursos = Array.from(new Set(AdminState.alumnos.map(a => a.curso)));
        const filtrados = AdminState.alumnos.filter(a => filtroRF22Valor === 'todos' || a.curso === filtroRF22Valor);
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[1]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        <option value="todos">Todos los Cursos (${AdminState.alumnos.length} alumnos)</option>
                        ${cursos.map(c => `<option value="${escaparHTML(c)}" ${filtroRF22Valor === c ? 'selected' : ''}>${escaparHTML(c)}</option>`).join('')}
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead><tr class="bg-slate-100 font-black uppercase text-[10px] text-slate-600"><th class="p-3">Curso</th><th class="p-3">Nivel</th><th class="p-3">Legajo</th><th class="p-3">Alumno</th><th class="p-3">DNI</th><th class="p-3">Padre/Tutor (RF-14)</th><th class="p-3">Condición</th></tr></thead>
                        <tbody class="divide-y">${filtrados.map(a => `<tr><td class="p-3 font-bold text-blue-900">${escaparHTML(a.curso)}</td><td class="p-3">${escaparHTML(a.nivel)}</td><td class="p-3 font-mono">${escaparHTML(a.legajo)}</td><td class="p-3 font-bold">${escaparHTML(a.nombre)}</td><td class="p-3">${escaparHTML(a.dni)}</td><td class="p-3">${escaparHTML(a.tutor)}</td><td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">${escaparHTML(a.regularidad)}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
            </div>
        `;
        return;
    }

    // 2. Alumnos por Materia
    if (reporteRF22Activo === 2) {
        const todasMaterias = Array.from(new Set(AdminState.alumnos.flatMap(a => a.materiasCursado || [])));
        const filtrados = AdminState.alumnos.filter(a => filtroRF22Valor === 'todos' || (a.materiasCursado || []).includes(filtroRF22Valor));
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[2]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        <option value="todos">Todas las Materias</option>
                        ${todasMaterias.map(m => `<option value="${escaparHTML(m)}" ${filtroRF22Valor === m ? 'selected' : ''}>${escaparHTML(m)}</option>`).join('')}
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead><tr class="bg-slate-100 font-black uppercase text-[10px] text-slate-600"><th class="p-3">Alumno y Legajo</th><th class="p-3">Nivel y Curso</th><th class="p-3">Materias Inscriptas (RF-20)</th><th class="p-3">Horario de Cursada</th></tr></thead>
                        <tbody class="divide-y">${filtrados.map(a => `<tr><td class="p-3 font-bold">${escaparHTML(a.nombre)} <span class="font-mono text-blue-900">(${escaparHTML(a.legajo)})</span></td><td class="p-3">${escaparHTML(a.nivel)} • ${escaparHTML(a.curso)}</td><td class="p-3 text-indigo-900 font-semibold">${escaparHTML((a.materiasCursado || []).join(' • '))}</td><td class="p-3 font-mono text-[11px]">${escaparHTML(a.horarioCursado)}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
            </div>
        `;
        return;
    }

    // 3. Docentes por Nivel Educativo
    if (reporteRF22Activo === 3) {
        const filtrados = AdminState.docentes.filter(d => filtroRF22Valor === 'todos' || (d.nivel || '').includes(filtroRF22Valor) || (d.nivel || '').includes('Todos'));
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[3]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        <option value="todos">Todos los Niveles Educativos</option>
                        <option value="Inicial" ${filtroRF22Valor === 'Inicial' ? 'selected' : ''}>Nivel Inicial</option>
                        <option value="Primario" ${filtroRF22Valor === 'Primario' ? 'selected' : ''}>Nivel Primario</option>
                        <option value="Secundario" ${filtroRF22Valor === 'Secundario' ? 'selected' : ''}>Nivel Secundario</option>
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead><tr class="bg-slate-100 font-black uppercase text-[10px] text-slate-600"><th class="p-3">Legajo</th><th class="p-3">Docente</th><th class="p-3">DNI</th><th class="p-3">Nivel Asignado</th><th class="p-3">Especialidad / Cargo</th><th class="p-3">Estado (RF-07)</th></tr></thead>
                        <tbody class="divide-y">${filtrados.map(d => `<tr><td class="p-3 font-mono font-bold text-blue-900">${escaparHTML(d.legajo)}</td><td class="p-3 font-bold">${escaparHTML(d.nombre)}</td><td class="p-3">${escaparHTML(d.dni)}</td><td class="p-3 font-bold text-indigo-900">${escaparHTML(d.nivel)}</td><td class="p-3">${escaparHTML(d.rol)}</td><td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">${escaparHTML(d.estado)}</span></td></tr>`).join('')}</tbody>
                    </table>
                </div>
            </div>
        `;
        return;
    }

    // 4, 8 y 9: Reportes Deportivos (Por Deporte, Por Deporte+Nivel, y Por Deporte+Nivel+Horario+Profesor)
    if (reporteRF22Activo === 4 || reporteRF22Activo === 8 || reporteRF22Activo === 9) {
        const filas = [];
        AdminState.alumnos.forEach(a => {
            (a.deportesAsignados || []).forEach(d => {
                filas.push({ alumno: a.nombre, legajo: a.legajo, curso: a.curso, nivel: a.nivel, deporte: d.deporte, horario: d.horario, profesor: d.profesor });
            });
        });
        const deportesUnicos = Array.from(new Set(filas.map(f => f.deporte)));
        const filtrados = filas.filter(f => filtroRF22Valor === 'todos' || f.deporte === filtroRF22Valor || f.nivel === filtroRF22Valor);
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[reporteRF22Activo]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        <option value="todos">Todos los Deportes y Niveles (${filas.length} inscripciones)</option>
                        ${deportesUnicos.map(dep => `<option value="${escaparHTML(dep)}" ${filtroRF22Valor === dep ? 'selected' : ''}>Deporte: ${escaparHTML(dep)}</option>`).join('')}
                        <option value="Inicial" ${filtroRF22Valor === 'Inicial' ? 'selected' : ''}>Nivel: Inicial</option>
                        <option value="Primario" ${filtroRF22Valor === 'Primario' ? 'selected' : ''}>Nivel: Primario</option>
                        <option value="Secundario" ${filtroRF22Valor === 'Secundario' ? 'selected' : ''}>Nivel: Secundario</option>
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead><tr class="bg-slate-100 font-black uppercase text-[10px] text-slate-600"><th class="p-3">Alumno y Legajo</th><th class="p-3">Deporte</th><th class="p-3">Nivel Educativo</th><th class="p-3">Curso</th><th class="p-3">Días y Horario (RF-09)</th><th class="p-3">Profesor Responsable (RF-08)</th></tr></thead>
                        <tbody class="divide-y">${filtrados.map(f => `<tr><td class="p-3 font-bold">${escaparHTML(f.alumno)} <span class="font-mono text-blue-900">(${escaparHTML(f.legajo)})</span></td><td class="p-3 font-black text-emerald-800">⚽ ${escaparHTML(f.deporte)}</td><td class="p-3 font-bold">${escaparHTML(f.nivel)}</td><td class="p-3">${escaparHTML(f.curso)}</td><td class="p-3 font-mono text-[11px]">${escaparHTML(f.horario)}</td><td class="p-3 font-semibold text-indigo-900">${escaparHTML(f.profesor)}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
            </div>
        `;
        return;
    }

    // 5. Alumnos por Recorrido de Transporte
    if (reporteRF22Activo === 5) {
        const conTransp = AdminState.alumnos.filter(a => a.transporte && a.transporte !== 'Sin transporte' && (filtroRF22Valor === 'todos' || a.transporte === filtroRF22Valor));
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[5]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        <option value="todos">Todos los Recorridos (1 a 4)</option>
                        <option value="Línea 1 - Zona Norte" ${filtroRF22Valor === 'Línea 1 - Zona Norte' ? 'selected' : ''}>Línea 1 - Zona Norte</option>
                        <option value="Línea 2 - Zona Sur" ${filtroRF22Valor === 'Línea 2 - Zona Sur' ? 'selected' : ''}>Línea 2 - Zona Sur</option>
                        <option value="Línea 3 - Zona Centro" ${filtroRF22Valor === 'Línea 3 - Zona Centro' ? 'selected' : ''}>Línea 3 - Zona Centro</option>
                        <option value="Línea 4 - Zona Este / Fontana" ${filtroRF22Valor === 'Línea 4 - Zona Este / Fontana' ? 'selected' : ''}>Línea 4 - Zona Este / Fontana</option>
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead><tr class="bg-slate-100 font-black uppercase text-[10px] text-slate-600"><th class="p-3">Alumno y Legajo</th><th class="p-3">Nivel y Curso</th><th class="p-3">Recorrido Asignado (RF-11)</th><th class="p-3">Parada Puerta a Puerta</th><th class="p-3">Padre/Tutor</th></tr></thead>
                        <tbody class="divide-y">${conTransp.map(a => `<tr><td class="p-3 font-bold">${escaparHTML(a.nombre)} <span class="font-mono text-blue-900">(${escaparHTML(a.legajo)})</span></td><td class="p-3">${escaparHTML(a.nivel)} • ${escaparHTML(a.curso)}</td><td class="p-3 font-bold text-blue-900">🚌 ${escaparHTML(a.transporte)}</td><td class="p-3">${escaparHTML(a.parada)}</td><td class="p-3">${escaparHTML(a.tutor)}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
            </div>
        `;
        return;
    }

    // 6. Ficha Integral de un Alumno
    if (reporteRF22Activo === 6) {
        const legajoSel = filtroRF22Valor === 'todos' ? AdminState.alumnos[0]?.legajo : filtroRF22Valor;
        const al = AdminState.alumnos.find(a => a.legajo === legajoSel) || AdminState.alumnos[0];
        const deps = Array.isArray(al?.deportesAsignados) ? al.deportesAsignados : [];
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[6]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        ${AdminState.alumnos.map(a => `<option value="${escaparHTML(a.legajo)}" ${a.legajo === al.legajo ? 'selected' : ''}>${escaparHTML(a.nombre)} (${escaparHTML(a.legajo)})</option>`).join('')}
                    </select>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 bg-slate-50 rounded-xl border space-y-1.5">
                        <p class="font-black uppercase text-[10px] text-blue-900">1. Datos Académicos y Filiatorios (RF-01/RF-19)</p>
                        <p><strong>Alumno:</strong> ${escaparHTML(al.nombre)} (${escaparHTML(al.legajo)})</p>
                        <p><strong>DNI:</strong> ${escaparHTML(al.dni)} • <strong>Condición:</strong> ${escaparHTML(al.regularidad)} (${escaparHTML(al.asistencia)})</p>
                        <p><strong>Nivel y Curso:</strong> ${escaparHTML(al.nivel)} • ${escaparHTML(al.curso)}</p>
                        <p><strong>Horario de Cursado:</strong> ${escaparHTML(al.horarioCursado)}</p>
                        <p><strong>Materias Inscriptas (RF-20):</strong> ${escaparHTML((al.materiasCursado || []).join(', '))}</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-xl border space-y-1.5">
                        <p class="font-black uppercase text-[10px] text-indigo-900">2. Grupo Familiar (RF-14), Deportes (RF-10) y Servicios (RF-11/12)</p>
                        <p><strong>Padre/Tutor:</strong> ${escaparHTML(al.tutor)} (DNI: ${escaparHTML(al.tutorDni || '32.114.560')} • ${escaparHTML(al.tutorEmail || 'familia@gmail.com')})</p>
                        <p><strong>Hermanos en la Institución:</strong> ${escaparHTML((al.hermanos || []).join(', ') || 'Sin hermanos registrados')}</p>
                        <p><strong>Deportes Activos (${deps.length}/2):</strong> ${deps.length > 0 ? escaparHTML(deps.map(d => `${d.deporte} (${d.horario} - ${d.profesor})`).join(' | ')) : 'Ninguno'}</p>
                        <p><strong>Transporte (RF-11):</strong> ${escaparHTML(al.transporte)} (${escaparHTML(al.parada)})</p>
                        <p><strong>Comedor (RF-12):</strong> ${escaparHTML(al.comedor)}</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // 7. Cursos y Horarios Asignados a un Docente
    if (reporteRF22Activo === 7) {
        const asigs = (AdminState.asignacionesDocentes || []).filter(a => filtroRF22Valor === 'todos' || a.docenteLegajo === filtroRF22Valor);
        cont.innerHTML = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
                    <h4 class="font-black text-slate-900 text-sm">${titulos[7]}</h4>
                    <select onchange="filtrarVistaRF22(this.value)" class="p-2 bg-slate-50 border rounded-lg text-xs font-bold">
                        <option value="todos">Todos los Docentes con Cátedras</option>
                        ${AdminState.docentes.map(d => `<option value="${escaparHTML(d.legajo)}" ${filtroRF22Valor === d.legajo ? 'selected' : ''}>${escaparHTML(d.nombre)} (${escaparHTML(d.legajo)})</option>`).join('')}
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead><tr class="bg-slate-100 font-black uppercase text-[10px] text-slate-600"><th class="p-3">Profesor</th><th class="p-3">Nivel</th><th class="p-3">Curso Asignado</th><th class="p-3">Materia Dictada</th><th class="p-3">Horario Semanal</th></tr></thead>
                        <tbody class="divide-y">${asigs.map(a => `<tr><td class="p-3 font-bold">${escaparHTML(a.docenteNombre)} <span class="font-mono text-slate-500">(${escaparHTML(a.docenteLegajo)})</span></td><td class="p-3 font-bold text-blue-900">${escaparHTML(a.nivel)}</td><td class="p-3 font-bold">${escaparHTML(a.curso)}</td><td class="p-3 text-indigo-900 font-semibold">${escaparHTML(a.materia)}</td><td class="p-3 font-mono">${escaparHTML(a.horario)}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
            </div>
        `;
        return;
    }
}

// ====================================================================
// MÓDULO 6: FUNCIONALIDAD AGREGADA — CHATBOT DE RECOMENDACIÓN DEPORTIVA (RF-23)
// ====================================================================

function abrirModalChatbotDeportivo(legajoPre = '') {
    const modal = document.getElementById('modalChatbotDeportivo');
    if (!modal) return;

    const legajoActivo = legajoPre || window.EstadoEstudiante?.matricula?.legajo || AdminState.alumnos[1]?.legajo || 'A123456';
    const sel = document.getElementById('chatbotAlumnoSelect');
    if (sel) {
        sel.innerHTML = AdminState.alumnos.map(a => {
            const cant = Array.isArray(a.deportesAsignados) ? a.deportesAsignados.length : 0;
            return `<option value="${escaparHTML(a.legajo)}" ${a.legajo === legajoActivo ? 'selected' : ''}>${escaparHTML(a.nombre)} (${escaparHTML(a.legajo)}) — Nivel ${escaparHTML(a.nivel)} [${cant}/2 deportes]</option>`;
        }).join('');
    }

    ejecutarAnalisisChatbotRF23('completo');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarModalChatbotDeportivo() {
    const modal = document.getElementById('modalChatbotDeportivo');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function hacerPreguntaChatbotRF23(modo) {
    ejecutarAnalisisChatbotRF23(modo);
}

function ejecutarAnalisisChatbotRF23(modo = 'completo') {
    const cont = document.getElementById('chatbotCuerpoConversacion');
    if (!cont) return;

    const legajo = document.getElementById('chatbotAlumnoSelect')?.value;
    const alumno = AdminState.alumnos.find(a => a.legajo === legajo) || AdminState.alumnos[0];
    if (!alumno) return;

    const depsActuales = Array.isArray(alumno.deportesAsignados) ? alumno.deportesAsignados : [];
    const topeAlcanzado = depsActuales.length >= 2;

    const compatibles = [];
    const descartados = [];

    (AdminState.gruposDeportivos || []).forEach(g => {
        const evalRes = validarReglasInscripcionDeporteRF10(alumno, g);
        if (evalRes.valido) {
            compatibles.push(g);
        } else {
            descartados.push({ grupo: g, motivo: evalRes.errores[0] });
        }
    });

    cont.innerHTML = `
        <!-- Mensaje de Bienvenida y Diagnóstico del Alumno -->
        <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-xl bg-blue-900 text-amber-300 flex items-center justify-center font-black shrink-0 mt-0.5">
                <i class="fas fa-robot"></i>
            </div>
            <div class="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm space-y-2 flex-1">
                <p class="font-bold text-slate-900">
                    ¡Hola! Analicé el perfil académico y horario de <span class="text-blue-900">${escaparHTML(alumno.nombre)}</span> (${escaparHTML(alumno.legajo)}):
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px]">
                    <div><span class="text-slate-500 block">Nivel Educativo:</span><strong class="text-blue-900 uppercase">${escaparHTML(alumno.nivel)} (${escaparHTML(alumno.curso)})</strong></div>
                    <div><span class="text-slate-500 block">Horario Cursada:</span><strong class="font-mono">${escaparHTML(alumno.horarioCursado || '07:30 a 15:30 hs')}</strong></div>
                    <div><span class="text-slate-500 block">Cupo Deportivo (RF-10):</span><strong class="${topeAlcanzado ? 'text-rose-700' : 'text-emerald-700'}">${depsActuales.length} de 2 deportes (${depsActuales.map(d => d.deporte).join(', ') || 'Ninguno'})</strong></div>
                </div>
            </div>
        </div>

        <!-- Bloque de Recomendaciones Compatibles -->
        ${topeAlcanzado ? `
            <div class="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-950 space-y-1.5">
                <p class="font-black uppercase text-xs"><i class="fas fa-exclamation-triangle text-amber-600 mr-1"></i> Límite Reglamentario Alcanzado (2 / 2 Deportes — RF-10)</p>
                <p class="text-[11px] leading-relaxed">
                    ${escaparHTML(alumno.nombre)} ya se encuentra inscripto en <strong>2 disciplinas simultáneas</strong> (${escaparHTML(depsActuales.map(d => `${d.deporte} [${d.horario}]`).join(' y '))}). Para inscribirse en una nueva actividad, primero debe darse de baja en una de las actuales o seleccionar otro alumno en el selector superior.
                </p>
            </div>
        ` : `
            <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="font-black text-emerald-950 text-xs uppercase tracking-wider">
                        ✅ Grupos Deportivos 100% Compatibles Recomendados (${compatibles.length})
                    </h4>
                    <span class="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded">Mismo Nivel + Sin Choque Horario</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    ${compatibles.map(g => `
                        <div class="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm flex flex-col justify-between gap-2">
                            <div>
                                <div class="flex items-center justify-between">
                                    <strong class="text-slate-900 text-xs">⚽ ${escaparHTML(g.deporte)}</strong>
                                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900">${escaparHTML(g.nivel)}</span>
                                </div>
                                <p class="text-[11px] font-mono text-slate-600 mt-1"><i class="fas fa-clock text-emerald-600 mr-1"></i>${escaparHTML(g.horario)}</p>
                                <p class="text-[10px] text-slate-500 mt-0.5">Prof: ${escaparHTML(g.profesor)} • Cupo: ${g.inscriptos}/${g.cupo}</p>
                            </div>
                            <button type="button" onclick="inscribirDirectoDesdeChatbotRF23('${escaparHTML(alumno.legajo)}', '${escaparHTML(g.id)}')"
                                class="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-[10px] uppercase tracking-wider transition shadow-sm active:scale-95">
                                ⚡ Inscribirme en 1 Toque (RF-10)
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `}

        <!-- Bloque de Trazabilidad: Por qué se descartaron otros grupos -->
        ${modo !== 'compatibles' ? `
            <div class="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <h4 class="font-black text-slate-700 text-xs uppercase tracking-wider">
                    🔍 Trazabilidad del Motor de Reglas: Grupos Descartados Automáticamente (${descartados.length})
                </h4>
                <div class="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    ${descartados.map(item => `
                        <div class="p-2 bg-rose-50/60 border border-rose-200/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                            <span class="font-bold text-slate-800">${escaparHTML(item.grupo.deporte)} (${escaparHTML(item.grupo.nivel)} • ${escaparHTML(item.grupo.horario)})</span>
                            <span class="text-rose-700 font-semibold text-[10px]">${escaparHTML(item.motivo)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

function inscribirDirectoDesdeChatbotRF23(legajo, grupoId) {
    const selAl = document.getElementById('insDepAlumno');
    const selGrp = document.getElementById('insDepGrupo');
    if (selAl && selGrp) {
        abrirModalInscribirDeporte(legajo);
        selAl.value = legajo;
        selGrp.value = grupoId;
        confirmarInscripcionDeporteRF10(null);
        ejecutarAnalisisChatbotRF23('completo');
    }
}

// Exposición global de todas las funciones nuevas en window
window.abrirModalGestionDeporte = abrirModalGestionDeporte;
window.cerrarModalGestionDeporte = cerrarModalGestionDeporte;
window.guardarDeporteRF08 = guardarDeporteRF08;
window.abrirModalGrupoDeportivo = abrirModalGrupoDeportivo;
window.cerrarModalGrupoDeportivo = cerrarModalGrupoDeportivo;
window.guardarGrupoDeportivoRF09 = guardarGrupoDeportivoRF09;
window.abrirModalInscribirDeporte = abrirModalInscribirDeporte;
window.cerrarModalInscribirDeporte = cerrarModalInscribirDeporte;
window.evaluarPreInscripcionDeporteRF10 = evaluarPreInscripcionDeporteRF10;
window.confirmarInscripcionDeporteRF10 = confirmarInscripcionDeporteRF10;
window.quitarDeporteAlumnoRF10 = quitarDeporteAlumnoRF10;

window.filtrarDocentesPorNivel = filtrarDocentesPorNivel;
window.abrirModalGestionDocente = abrirModalGestionDocente;
window.cerrarModalGestionDocente = cerrarModalGestionDocente;
window.guardarDocenteRF05 = guardarDocenteRF05;
window.cambiarEstadoDocenteRF07 = cambiarEstadoDocenteRF07;
window.abrirModalAsignarMateriaProfesor = abrirModalAsignarMateriaProfesor;
window.cerrarModalAsignarMateriaProfesor = cerrarModalAsignarMateriaProfesor;
window.actualizarMateriasPorCursoSelect = actualizarMateriasPorCursoSelect;
window.guardarAsignacionMateriaRF21 = guardarAsignacionMateriaRF21;
window.eliminarAsignacionDocenteRF21 = eliminarAsignacionDocenteRF21;
window.abrirModalGestionCursosMaterias = abrirModalGestionCursosMaterias;
window.cerrarModalGestionCursosMaterias = cerrarModalGestionCursosMaterias;
window.agregarNuevoCursoRF17 = agregarNuevoCursoRF17;

window.abrirModalInscribirTransporte = abrirModalInscribirTransporte;
window.cerrarModalInscribirTransporte = cerrarModalInscribirTransporte;
window.guardarInscripcionTransporteRF11 = guardarInscripcionTransporteRF11;
window.darBajaTransporteRF11 = darBajaTransporteRF11;
window.abrirModalInscribirComedor = abrirModalInscribirComedor;
window.cerrarModalInscribirComedor = cerrarModalInscribirComedor;
window.guardarInscripcionComedorRF12 = guardarInscripcionComedorRF12;
window.darBajaComedorRF12 = darBajaComedorRF12;

window.renderizarBandejaComprobantesAdmin = renderizarBandejaComprobantesAdmin;
window.aprobarComprobanteTransferenciaM05 = aprobarComprobanteTransferenciaM05;
window.rechazarComprobanteTransferenciaM05 = rechazarComprobanteTransferenciaM05;
window.abrirModalInformarTransferencia = abrirModalInformarTransferencia;
window.cerrarModalInformarTransferencia = cerrarModalInformarTransferencia;
window.actualizarMontoSugeridoTransferencia = actualizarMontoSugeridoTransferencia;
window.recalcularCheckboxesTransferencia = recalcularCheckboxesTransferencia;
window.enviarComprobanteTransferenciaM04 = enviarComprobanteTransferenciaM04;
window.renderizarBannerComprobantesEstudianteM04 = renderizarBannerComprobantesEstudianteM04;

window.abrirModalFichaIntegralAlumno = abrirModalFichaIntegralAlumno;
window.cerrarModalFichaIntegralAlumno = cerrarModalFichaIntegralAlumno;
window.cargarDatosFichaIntegralAlumno = cargarDatosFichaIntegralAlumno;
window.guardarTutorAlumnoRF14 = guardarTutorAlumnoRF14;
window.inscribirMateriaAlumnoRF20 = inscribirMateriaAlumnoRF20;
window.quitarMateriaAlumnoRF20 = quitarMateriaAlumnoRF20;
window.renderizarMateriasCursadoEstudiante = renderizarMateriasCursadoEstudiante;

window.cambiarReporteRF22 = cambiarReporteRF22;
window.filtrarVistaRF22 = filtrarVistaRF22;
window.renderizarReporteRF22 = renderizarReporteRF22;

window.abrirModalChatbotDeportivo = abrirModalChatbotDeportivo;
window.cerrarModalChatbotDeportivo = cerrarModalChatbotDeportivo;
window.hacerPreguntaChatbotRF23 = hacerPreguntaChatbotRF23;
window.ejecutarAnalisisChatbotRF23 = ejecutarAnalisisChatbotRF23;
window.inscribirDirectoDesdeChatbotRF23 = inscribirDirectoDesdeChatbotRF23;
