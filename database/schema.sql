-- ============================================================
-- PetCare Pro - Schema de base de datos (BORRADOR DE TRABAJO)
-- ------------------------------------------------------------
-- Este script crea las 6 tablas del sistema y carga datos
-- mínimos para desarrollar y probar el CRUD.
-- Cuando Eriberto entregue el schema oficial, comparamos
-- nombres de columnas y tipos, y ajustamos los queries.
-- ============================================================

-- Limpieza previa: permite re-ejecutar el script sin errores.
-- El orden importa: primero las tablas que dependen de otras.
DROP TABLE IF EXISTS citas_servicios CASCADE;
DROP TABLE IF EXISTS citas           CASCADE;
DROP TABLE IF EXISTS servicios       CASCADE;
DROP TABLE IF EXISTS mascotas        CASCADE;
DROP TABLE IF EXISTS propietarios    CASCADE;
DROP TABLE IF EXISTS veterinarios    CASCADE;


-- ============================================================
-- 1. PROPIETARIOS
-- Dueños registrados de las mascotas.
-- ============================================================
CREATE TABLE propietarios (
    id              SERIAL          PRIMARY KEY,
    nombre          VARCHAR(80)     NOT NULL,
    apellidos       VARCHAR(120)    NOT NULL,
    email           VARCHAR(120)    UNIQUE NOT NULL,
    telefono        VARCHAR(20)     NOT NULL,
    direccion       VARCHAR(200),
    fecha_registro  DATE            NOT NULL DEFAULT CURRENT_DATE,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 2. VETERINARIOS
-- Staff médico de la clínica.
-- ============================================================
CREATE TABLE veterinarios (
    id                  SERIAL          PRIMARY KEY,
    nombre              VARCHAR(80)     NOT NULL,
    apellidos           VARCHAR(120)    NOT NULL,
    cedula_profesional  VARCHAR(20)     UNIQUE NOT NULL,
    especialidad        VARCHAR(80)     NOT NULL,
    email               VARCHAR(120)    UNIQUE NOT NULL,
    activo              BOOLEAN         NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 3. MASCOTAS
-- Pacientes de la clínica.
-- ON DELETE RESTRICT: si un propietario tiene mascotas,
-- no se puede borrar (protege la integridad histórica).
-- ============================================================
CREATE TABLE mascotas (
    id                SERIAL          PRIMARY KEY,
    propietario_id    INT             NOT NULL
                                      REFERENCES propietarios(id) ON DELETE RESTRICT,
    nombre            VARCHAR(60)     NOT NULL,
    especie           VARCHAR(40)     NOT NULL
                                      CHECK (especie IN ('Perro', 'Gato', 'Ave', 'Conejo', 'Otro')),
    raza              VARCHAR(60),
    sexo              CHAR(1)         NOT NULL CHECK (sexo IN ('M', 'H')),
    fecha_nacimiento  DATE,
    peso_kg           NUMERIC(5,2)    CHECK (peso_kg > 0),
    activo            BOOLEAN         NOT NULL DEFAULT TRUE
);


-- ============================================================
-- 4. SERVICIOS
-- Catálogo de servicios que ofrece la clínica.
-- ============================================================
CREATE TABLE servicios (
    id                SERIAL          PRIMARY KEY,
    nombre            VARCHAR(80)     NOT NULL,
    descripcion       TEXT,
    precio_base       NUMERIC(8,2)    NOT NULL CHECK (precio_base > 0),
    duracion_minutos  INT             NOT NULL CHECK (duracion_minutos > 0)
);


-- ============================================================
-- 5. CITAS
-- Agendamientos médicos.
-- ============================================================
CREATE TABLE citas (
    id              SERIAL          PRIMARY KEY,
    mascota_id      INT             NOT NULL
                                    REFERENCES mascotas(id) ON DELETE RESTRICT,
    veterinario_id  INT             NOT NULL
                                    REFERENCES veterinarios(id) ON DELETE RESTRICT,
    fecha_hora      TIMESTAMP       NOT NULL,
    motivo          VARCHAR(200)    NOT NULL,
    estado          VARCHAR(20)     NOT NULL DEFAULT 'Programada'
                                    CHECK (estado IN ('Programada', 'Completada', 'Cancelada', 'No asistio')),
    notas           TEXT
);


-- ============================================================
-- 6. CITAS_SERVICIOS (tabla intermedia N:M)
-- Una cita puede incluir varios servicios; un servicio
-- aparece en muchas citas. Lleva atributos propios:
--   - precio_aplicado: el precio "congelado" en esa cita
--     (puede diferir del precio_base si subió después).
--   - cantidad: ej. dos vacunas en una sola cita.
-- ============================================================
CREATE TABLE citas_servicios (
    cita_id          INT             NOT NULL
                                     REFERENCES citas(id) ON DELETE CASCADE,
    servicio_id      INT             NOT NULL
                                     REFERENCES servicios(id) ON DELETE RESTRICT,
    precio_aplicado  NUMERIC(8,2)    NOT NULL CHECK (precio_aplicado >= 0),
    cantidad         INT             NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    PRIMARY KEY (cita_id, servicio_id)
);


-- ============================================================
-- DATOS DE PRUEBA
-- Suficientes para probar el CRUD durante el desarrollo.
-- Eriberto los ampliará a 10-20 por tabla en la versión final.
-- ============================================================

INSERT INTO propietarios (nombre, apellidos, email, telefono, direccion) VALUES
    ('Maria',  'Gonzalez Lopez',  'maria.gonzalez@email.com',  '5551234567', 'Av. Reforma 123, CDMX'),
    ('Carlos', 'Ramirez Soto',    'carlos.ramirez@email.com',  '5552345678', 'Calle Juarez 45, CDMX'),
    ('Ana',    'Martinez Perez',  'ana.martinez@email.com',    '5553456789', 'Insurgentes Sur 890, CDMX');

INSERT INTO veterinarios (nombre, apellidos, cedula_profesional, especialidad, email) VALUES
    ('Roberto', 'Hernandez Diaz',  'VET-2018-0451', 'Medicina general', 'r.hernandez@petcare.com'),
    ('Lucia',   'Torres Vega',     'VET-2020-0782', 'Cirugia',          'l.torres@petcare.com'),
    ('Pedro',   'Castillo Ruiz',   'VET-2019-0623', 'Dermatologia',     'p.castillo@petcare.com');

INSERT INTO mascotas (propietario_id, nombre, especie, raza, sexo, fecha_nacimiento, peso_kg) VALUES
    (1, 'Rocky', 'Perro', 'Labrador',         'M', '2020-03-15', 28.50),
    (1, 'Luna',  'Gato',  'Siames',           'H', '2021-07-22',  4.20),
    (2, 'Max',   'Perro', 'Bulldog Frances',  'M', '2019-11-08', 12.00),
    (3, 'Coco',  'Ave',   'Cacatua',          'H', '2022-01-30',  0.45);

INSERT INTO servicios (nombre, descripcion, precio_base, duracion_minutos) VALUES
    ('Consulta general',    'Revision clinica basica',                 350.00, 30),
    ('Vacunacion multiple', 'Aplicacion de vacuna polivalente',        450.00, 15),
    ('Desparasitacion',     'Tratamiento contra parasitos internos',   250.00, 15),
    ('Corte de unas',       'Recorte y limado',                        120.00, 20),
    ('Cirugia menor',       'Procedimientos quirurgicos ambulatorios', 2500.00, 90);

INSERT INTO citas (mascota_id, veterinario_id, fecha_hora, motivo, estado) VALUES
    (1, 1, '2026-04-30 10:00:00', 'Revision anual',         'Programada'),
    (2, 1, '2026-04-30 11:30:00', 'Vacunacion',             'Programada'),
    (3, 2, '2026-05-02 09:00:00', 'Consulta por cojera',    'Programada'),
    (4, 3, '2026-04-15 16:00:00', 'Perdida de plumaje',     'Completada');

INSERT INTO citas_servicios (cita_id, servicio_id, precio_aplicado, cantidad) VALUES
    (1, 1, 350.00, 1),   -- Rocky: consulta
    (1, 4, 120.00, 1),   -- Rocky: corte de uñas
    (2, 1, 350.00, 1),   -- Luna:  consulta
    (2, 2, 450.00, 1),   -- Luna:  vacuna
    (3, 1, 350.00, 1),   -- Max:   consulta
    (4, 1, 350.00, 1);   -- Coco:  consulta


-- ============================================================
-- QUERY DE EJEMPLO: agenda de citas con todos los JOINs
-- Esta es la consulta que va a usar tu API en GET /api/citas
-- ============================================================
-- SELECT
--     c.id,
--     c.fecha_hora,
--     m.nombre                                    AS mascota,
--     m.especie,
--     p.nombre || ' ' || p.apellidos              AS propietario,
--     v.nombre || ' ' || v.apellidos              AS veterinario,
--     c.motivo,
--     c.estado
-- FROM citas c
-- INNER JOIN mascotas      m ON m.id = c.mascota_id
-- INNER JOIN propietarios  p ON p.id = m.propietario_id
-- INNER JOIN veterinarios  v ON v.id = c.veterinario_id
-- ORDER BY c.fecha_hora;
