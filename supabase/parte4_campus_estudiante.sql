-- ====================================================================
-- SISTEMA EDUCATIVO "EDUCAR PARA TRANSFORMAR" - PARTE 4
-- Campus del Estudiante: Vinculación Segura Usuario-Alumno y RLS
-- Archivo: supabase/parte4_campus_estudiante.sql
-- ====================================================================
-- Objetivo:
--   1. Vincular de forma segura y opcional un registro de matrícula
--      (public.alumnos) con una cuenta autenticada (auth.users) mediante
--      user_id UUID UNIQUE, sin usar coincidencias inseguras por DNI o nombre.
--   2. Permitir que un usuario autenticado con rol 'estudiante' consulte
--      EXCLUSIVAMENTE su propia matrícula mediante Row Level Security (RLS).
--   3. Impedir que un estudiante consulte matrículas ajenas o modifique
--      datos administrativos (sin permisos INSERT/UPDATE/DELETE para estudiante).
--   4. Conservar intacto el CRUD administrativo (public.is_admin()).
-- ====================================================================

-- 1. Evolución no destructiva de public.alumnos: agregar user_id opcional
ALTER TABLE public.alumnos
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Asegurar relación 1:1 opcional (cada cuenta de estudiante puede vincularse
--    a lo sumo a un legajo en public.alumnos; múltiples NULL siguen permitidos)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint con
        JOIN pg_class rel ON rel.oid = con.conrelid
        JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
        WHERE nsp.nspname = 'public'
          AND rel.relname = 'alumnos'
          AND con.conname = 'alumnos_user_id_key'
    ) THEN
        ALTER TABLE public.alumnos
            ADD CONSTRAINT alumnos_user_id_key UNIQUE (user_id);
        RAISE NOTICE 'Constraint alumnos_user_id_key creado correctamente en public.alumnos.';
    ELSE
        RAISE NOTICE 'Constraint alumnos_user_id_key ya existe en public.alumnos.';
    END IF;
END $$;

-- 3. Índice para optimizar la evaluación de políticas RLS por user_id
CREATE INDEX IF NOT EXISTS alumnos_user_id_idx ON public.alumnos (user_id);

-- 4. Asegurar que Row Level Security (RLS) permanezca activo en public.alumnos
ALTER TABLE public.alumnos ENABLE ROW LEVEL SECURITY;

-- 5. Asegurar permiso de lectura a nivel de rol authenticated (sujeto siempre a RLS)
GRANT SELECT ON public.alumnos TO authenticated;

-- 6. Política RLS de mínimo privilegio para lectura del propio alumno autenticado
--    Nota: Las políticas existentes alumnos_select_admin, alumnos_insert_admin,
--    alumnos_update_admin y alumnos_delete_admin se conservan sin cambios.
DROP POLICY IF EXISTS "alumnos_select_own_student" ON public.alumnos;
CREATE POLICY "alumnos_select_own_student" ON public.alumnos
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

-- ====================================================================
-- 7. PLANTILLA DE VINCULACIÓN SEGURA (COMENTADA — NO EJECUTAR CON DATOS DE EJEMPLO)
-- ====================================================================
-- Reemplazar <EMAIL_REAL_ESTUDIANTE> y <LEGAJO_REAL_ALUMNO> únicamente con
-- valores reales verificados en las consultas diagnósticas del Bloque 8:
--
-- UPDATE public.alumnos
-- SET user_id = (
--     SELECT id FROM public.profiles
--     WHERE email = '<EMAIL_REAL_ESTUDIANTE>'
--       AND role = 'estudiante'
-- )
-- WHERE legajo = '<LEGAJO_REAL_ALUMNO>';

-- ====================================================================
-- 8. CONSULTAS DE VERIFICACIÓN POST-EJECUCIÓN (SOLO LECTURA)
-- ====================================================================

-- A. Verificar columna user_id en public.alumnos
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'alumnos'
ORDER BY ordinal_position;

-- B. Verificar políticas RLS activas en public.alumnos
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'alumnos'
ORDER BY policyname;

-- C. Listar cuentas con rol 'estudiante' disponibles para vincular
SELECT id, email, role, created_at
FROM public.profiles
WHERE role = 'estudiante'
ORDER BY created_at DESC;

-- D. Listar matrículas en public.alumnos y su estado de vinculación (user_id)
SELECT id, legajo, nombre, dni, nivel, curso, regularidad, user_id
FROM public.alumnos
ORDER BY created_at DESC;
