# 🔍 INFORME DE AUDITORÍA Y GUÍA TÉCNICA PARA EL COMPAÑERO
## Proyecto: Centro Educativo "Educar para Transformar"
### Cátedra: Metodología de Sistemas II — UTN FRRe | Ing. Carolina Vargas

---

**Para:** Mateo Bosch Vesconi (o compañero de equipo)  
**De:** Gustavo Vernengo  
**Objetivo de este documento:** Brindarte el estado auditado de todo el software construido, explicarte qué está resuelto y darte la guía paso a paso para completar, revisar y defender el **Plan de Trabajo** en el coloquio con la máxima calificación (5/5).

---

## 1. 📊 RESULTADOS DE LA AUDITORÍA TÉCNICA DEL PROYECTO

Se realizó una auditoría integral sobre el código fuente, la arquitectura, la base de datos y los artefactos metodológicos. A continuación, el resumen del estado:

| Área Auditada | Estado Actual | Dónde está en el Repositorio | Observaciones y Verificación |
| :--- | :---: | :--- | :--- |
| **Front-End Web** | **100% Operativo** | `index.html`, `style.css`, `vite.config.js` | Landing page responsive con Tailwind CSS, secciones de niveles, bienestar, testimonios y contacto. Empaquetado limpio con Vite en puerto 3000. |
| **Lógica y Controladores** | **100% Operativo** | `main.js`, `admin.js` | Funciones desacopladas con SRP y Clean Code (`validarFormularioAdmision`, `iniciarSesion`, `procesarCertificado`, `AdminState`). Todas expuestas en `window` para eventos inline. |
| **Base de Datos & Auth** | **100% Conectado** | Supabase Cloud (PostgreSQL) | Conexión real activa a `qynsmxiarnanqtxefltu.supabase.co`. Tabla `inscripciones` recibiendo solicitudes web y autenticación GoTrue funcionando. |
| **Módulo Administrativo (Etapa 2)** | **100% Operativo** | `admin.js` (consola directiva) | Gestión de 348 alumnos, estadísticas del 95.8% de asistencia, filtro de vacantes 2027 y asignación de micros y comedor. |
| **Testing y QA** | **100% Documentado** | `TRABAJO_PRACTICO_TESTING.md` | Smoke Test y Happy Path formalizados con plantillas ISTQB/IEEE, clases de equivalencia y guion cronometrado de video (78 s). |
| **App Móvil Android Studio** | **100% Generada** | Carpeta `/android` | Proyecto nativo Gradle completo con Capacitor 8.5. Listo para abrir y generar APK en Android Studio. |
| **App Móvil Expo Go** | **100% Operativa** | Carpeta `/mobile-expo` | Proyecto React Native con Expo SDK 57 y `react-native-webview`. Abre en cualquier celular escaneando el código QR. |
| **Plan de Trabajo Oficial** | **100% Redactado** | `PLAN_DE_TRABAJO_SISTEMA_GESTION.md` | Redactado estrictamente sobre la plantilla de la cátedra con objetivos SMART, Gantt, PERT y backlog. |

---

## 2. 📁 MAPA DE ARCHIVOS CLAVE PARA TU ENTREGA

Tenés a tu disposición los siguientes archivos listos en la raíz del proyecto:

1. **[`PLAN_DE_TRABAJO_SISTEMA_GESTION.md`](file:///c:/sistema-educativo-2/educar-para-transformar/PLAN_DE_TRABAJO_SISTEMA_GESTION.md):**  
   Este es el documento principal que te pide la consigna de la imagen (Páginas 1 y 2). Contiene:
   - Nombre de equipo e integrantes.
   - Enunciado del Problema de "Educar para Transformar".
   - 6 Requerimientos Funcionales y 5 No Funcionales.
   - Clasificación del Sistema de Información (TPS + MIS).
   - Diagrama de Arquitectura de la Información y Arquitectura de Software.
   - Principios, componentes, restricciones, conectores y patrones de diseño.
   - 4 Objetivos en formato formal **SMART**.
   - Tabla de actividades con 140 horas hombre distribuidas entre ambos integrantes.
   - Diagramas de **GANTT** y **PERT** (renderizados en Mermaid).
   - **Backlog del Sprint** para las 6 Historias de Usuario (con tareas y criterios de aceptación).
   - **Plan semanal del Sprint 1**.

2. **[`TRABAJO_PRACTICO_1_METODOLOGIA.md`](file:///c:/sistema-educativo-2/educar-para-transformar/TRABAJO_PRACTICO_1_METODOLOGIA.md):**  
   Contiene el detalle profundo de los artefactos UML por integrante:
   - 6 Historias de Usuario desarrolladas con la plantilla oficial.
   - 6 Casos de Uso formales con flujos normales y alternativos.
   - 6 Diagramas de Secuencia en UML (Mermaid).

3. **[`TRABAJO_PRACTICO_TESTING.md`](file:///c:/sistema-educativo-2/educar-para-transformar/TRABAJO_PRACTICO_TESTING.md):**  
   Informe completo de la actividad de testing (tabla de versiones, tipificación con porcentajes, clases de equivalencia, Smoke test, Happy path y guion de video).

---

## 3. 📝 CHECKLIST: LO QUE VOS DEBÉS COMPLETAR O REVISAR

Para que el trabajo quede impecable antes de subirlo o imprimirlo:

- [ ] **Formato del documento:** Si la profesora solicita entregarlo en Word o PDF, copiá el contenido de [`PLAN_DE_TRABAJO_SISTEMA_GESTION.md`](file:///c:/sistema-educativo-2/educar-para-transformar/PLAN_DE_TRABAJO_SISTEMA_GESTION.md) y aplicale el formato recomendado en la consigna:
  - Tamaño de hoja: **A4**.
  - Márgenes: **2.5 cm superior, 2.0 cm inferior, 2.5 cm izquierdo, 2.0 cm derecho**.
  - Tipografía: **Calibri 11 pt, normal, interlineado sencillo**.
- [ ] **Tablero Kanban (Jira o Trello):**
  La consigna pide: *"Para la presentación final del trabajo se debe mostrar un registro o bitácora de la evolución del trabajo usando tablero Kanban. Se debe registrar el del equipo y el de cada integrante."*
  * **Acción sugerida:** Abrí un tablero gratuito en Trello (o GitHub Projects) con el nombre *"Educar para Transformar - Gestión"*. Creá 3 columnas: **To Do (Pendiente)**, **In Progress (En Curso)** y **Done (Finalizado)**. Cargá las 6 tarjetas de las Historias de Usuario (`HU-01` a `HU-06`) que ya están tabuladas en el Backlog del plan de trabajo y sacale captura de pantalla para adjuntar al informe.
- [ ] **Captura de los Diagramas de Gantt y PERT:**
  En el archivo `.md`, los diagramas de Gantt y PERT están creados en bloques `mermaid`. Si los abrís en GitHub o en una vista previa de Markdown (VS Code), se dibujan solos. Podés exportarlos como imagen o capturarlos para pegarlos en el Word final.
- [ ] **Horas asignadas en la tabla de actividades:**
  Revisá la tabla de la Sección 3 del plan de trabajo. Verificá que las horas (ej. Gustavo 70 hs, Mateo 70 hs = Total 140 hs) te resulten cómodas para justificar tu participación.

---

## 4. 🎓 GUÍA PARA DEFENDER EL COLOQUIO PRESENCIAL (5 PUNTOS)

La evaluación final es presencial. Si la profesora (Ing. Carolina Vargas) te pregunta sobre el proyecto, acá tenés las respuestas exactas:

### Pregunta 1: ¿Cuál es el problema que resuelve este sistema?
> *"El Centro Educativo gestiona más de 340 alumnos en tres niveles (Inicial, Primario y Secundario) y sufría de procesos analógicos: admisiones en papel con pérdidas de datos, demoras de hasta 48 horas en secretaría para emitir una constancia de alumno regular, falta de un portal 24/7 para que los tutores vean notas y asistencia, y desorganización en la asignación de rutas de micros y comedor. Nuestro sistema digitaliza y automatiza integralmente estos procesos."*

### Pregunta 2: ¿Cómo clasifican el sistema de información?
> *"Es un sistema híbrido que opera en dos niveles:*
> *1. **TPS (Nivel Operativo):** Porque procesa las transacciones diarias en tiempo real: registro de solicitudes en la base de datos Supabase, validación de credenciales y generación instantánea de certificados PDF.*
> *2. **MIS (Nivel Gerencial / Táctico):** Porque la consola directiva (Etapa 2) resume métricas consolidadas (348 alumnos, índice del 95.8% de asistencia, estado de vacantes por nivel) para la toma de decisiones directivas."*

### Pregunta 3: ¿Qué arquitectura de software y tecnologías utilizaron?
> *"Utilizamos una arquitectura desacoplada de tres capas:*
> *- **Capa de Presentación:** Front-End SPA con HTML5, Tailwind CSS y JavaScript ES6 modular, empaquetado y optimizado con **Vite**.*
> *- **Capa de Lógica y Datos (BaaS):** Conexión vía HTTPS/REST a **Supabase Cloud**, utilizando **PostgreSQL** para la persistencia de datos relacionales y **GoTrue** con tokens JWT para la autenticación segura.*
> *- **Capa Móvil:** Adaptación nativa con **Capacitor** para compilar en **Android Studio** y un contenedor React Native para ejecutar al instante desde celulares con **Expo Go**."*

### Pregunta 4: ¿Qué patrones de diseño y principios aplicaron?
> *- **Principios:** Separación de Responsabilidades (SoC), Responsabilidad Única (SRP) en funciones de validación y envío, y principio DRY eliminando duplicación en el manejo de modales.*
> *- **Patrones:** **Singleton** para la instancia del cliente de base de datos (`supabaseClient`), **State** para el manejo reactivo del estado administrativo (`AdminState`), y **Observer** para escuchar cambios de sesión y eventos del DOM.*

### Pregunta 5: ¿Cómo estructuraron los sprints y qué contiene el Sprint 1?
> *"El Sprint 1 abarcó 4 semanas: en la Semana 1 hicimos la maquetación base y conexión a PostgreSQL para admisiones (RF-01); en la Semana 2 la autenticación JWT y emisión de certificados (RF-02 a RF-05); en la Semana 3 la consola administrativa y gestión de servicios (RF-06); y en la Semana 4 las pruebas de testing formal y la adaptación móvil para Android Studio y Expo Go."*

---

¡Con esto tenés todo el material masticado, organizado y respaldado directamente en el código del repositorio!
