-- ====================================================================
-- SISTEMA EDUCATIVO "EDUCAR PARA TRANSFORMAR" - PARTE 5
-- Módulo de Gestión de Cuotas y Aranceles del Estudiante (RLS y Auditoría)
-- Archivo: supabase/parte5_cuotas_estudiante.sql
-- ====================================================================
-- Objetivo:
--   1. Crear la tabla public.cuotas para registrar el estado arancelario
--      oficial de cada alumno (Ciclo Lectivo 2026: Marzo a Noviembre).
--   2. Vincular cada cuota con la cuenta del estudiante (user_id UUID)
--      y su matrícula institucional (legajo).
--   3. Proteger la información contable mediante Row Level Security (RLS):
--      - El alumno autenticado solo puede consultar EXCLUSIVAMENTE sus cuotas.
--      - El administrador tiene gestión integral (public.is_admin()).
--   4. Almacenar desglose transparente de arancel base por nivel, adicionales
--      de idioma y deporte, servicios institucionales y bonificación por regularidad.
-- ====================================================================

-- 1. Creación de la tabla public.cuotas
CREATE TABLE IF NOT EXISTS public.cuotas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    legajo TEXT,
    periodo TEXT NOT NULL,
    mes INTEGER NOT NULL CHECK (mes BETWEEN 1 AND 12),
    anio INTEGER NOT NULL DEFAULT 2026,
    vencimiento DATE NOT NULL,
    monto_base NUMERIC(12, 2) NOT NULL DEFAULT 0,
    monto_adicionales NUMERIC(12, 2) NOT NULL DEFAULT 0,
    descuento NUMERIC(12, 2) NOT NULL DEFAULT 0,
    monto_total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    estado TEXT NOT NULL CHECK (estado IN ('Pagada', 'Pendiente', 'Vencida')),
    numero_comprobante TEXT,
    fecha_pago TIMESTAMPTZ,
    medio_pago TEXT,
    estado_pago TEXT DEFAULT 'Pago Completo' CHECK (estado_pago IN ('Pago Completo', 'Pago Incompleto', 'Pendiente')),
    detalle_composicion JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Índices de optimización para consultas y políticas RLS
CREATE INDEX IF NOT EXISTS idx_cuotas_user_id ON public.cuotas (user_id);
CREATE INDEX IF NOT EXISTS idx_cuotas_legajo ON public.cuotas (legajo);
CREATE INDEX IF NOT EXISTS idx_cuotas_estado ON public.cuotas (estado);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.cuotas ENABLE ROW LEVEL SECURITY;

-- 4. Otorgar permisos a roles autenticados (restringidos por RLS)
GRANT SELECT ON public.cuotas TO authenticated;
GRANT ALL ON public.cuotas TO service_role;

-- 5. Política RLS: El estudiante solo consulta sus cuotas vinculadas
DROP POLICY IF EXISTS "cuotas_select_own_student" ON public.cuotas;
CREATE POLICY "cuotas_select_own_student" ON public.cuotas
    FOR SELECT
    TO authenticated
    USING (
        user_id IS NOT NULL
        AND (SELECT auth.uid()) = user_id
        AND EXISTS (
            SELECT 1
            FROM public.profiles p
            WHERE p.id = (SELECT auth.uid())
              AND p.role = 'estudiante'
        )
    );

-- 6. Política RLS: El administrador tiene control total sobre cuotas
DROP POLICY IF EXISTS "cuotas_all_admin" ON public.cuotas;
CREATE POLICY "cuotas_all_admin" ON public.cuotas
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ====================================================================
-- 7. PLANTILLA DE SEMILLAS PARA DEMO (CICLO LECTIVO 2026)
-- ====================================================================
-- Para poblar cuotas reales para un alumno vinculado, reemplazar
-- '<USER_ID_ESTUDIANTE>' y '<LEGAJO_ALUMNO>' y ejecutar en Supabase:
--
-- INSERT INTO public.cuotas (user_id, legajo, periodo, mes, anio, vencimiento, monto_base, monto_adicionales, descuento, monto_total, estado, numero_comprobante, fecha_pago, medio_pago, estado_pago, detalle_composicion)
-- VALUES
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Marzo 2026', 3, 2026, '2026-03-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00142', '2026-03-09 10:30:00-03', 'Transferencia Bancaria', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Abril 2026', 4, 2026, '2026-04-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00215', '2026-04-08 11:15:00-03', 'Débito Automático', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Mayo 2026', 5, 2026, '2026-05-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00298', '2026-05-10 09:40:00-03', 'Tarjeta de Débito', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Junio 2026', 6, 2026, '2026-06-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00381', '2026-06-07 14:20:00-03', 'Transferencia Bancaria', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Julio 2026', 7, 2026, '2026-07-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00465', '2026-07-09 16:50:00-03', 'Débito Automático', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Agosto 2026', 8, 2026, '2026-08-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00512', '2026-08-10 10:00:00-03', 'Transferencia Bancaria', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Septiembre 2026', 9, 2026, '2026-09-10', 85000, 33000, 11800, 106200, 'Pagada', 'REC-2026-00604', '2026-09-08 12:10:00-03', 'Pago en Administración', 'Pago Completo', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Octubre 2026', 10, 2026, '2026-10-10', 85000, 33000, 0, 118000, 'Vencida', NULL, NULL, NULL, 'Pendiente', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "recargo_mora": 0, "aviso": "Vencida tras día 20"}'),
--   ('<USER_ID_ESTUDIANTE>', '<LEGAJO_ALUMNO>', 'Noviembre 2026', 11, 2026, '2026-11-10', 85000, 33000, 11800, 106200, 'Pendiente', NULL, NULL, NULL, 'Pendiente', '{"arancel_base": 85000, "adicional_idioma": 18000, "adicional_deporte": 15000, "servicio_institucional": 0, "descuento_regularidad": 11800, "aviso": "Próximo vencimiento en término"}');

-- ====================================================================
-- 8. CONSULTAS DE DIAGNÓSTICO Y VERIFICACIÓN (SOLO LECTURA)
-- ====================================================================

-- A. Verificar estructura de public.cuotas
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'cuotas'
ORDER BY ordinal_position;

-- B. Verificar políticas RLS activas en public.cuotas
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'cuotas'
ORDER BY policyname;
