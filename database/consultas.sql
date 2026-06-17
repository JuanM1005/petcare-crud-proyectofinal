-- Consulta principal de la agenda de citas (Relación muchos a muchos)
-- Une las tablas Citas, Mascotas, Propietarios y Veterinarios
SELECT 
    c.id AS id_cita,
    c.fecha_hora,
    m.nombre AS nombre_mascota,
    m.especie,
    p.nombre || ' ' || p.apellidos AS nombre_propietario,
    v.nombre || ' ' || v.apellidos AS veterinario_asignado,
    c.motivo,
    c.estado
FROM citas c
INNER JOIN mascotas m ON m.id = c.mascota_id
INNER JOIN propietarios p ON p.id = m.propietario_id
INNER JOIN veterinarios v ON v.id = c.veterinario_id
ORDER BY c.fecha_hora;