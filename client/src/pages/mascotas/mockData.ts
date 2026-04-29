import type MascotaConDueno from './MascotasPage.types';

// Datos simulados. Cuando conectemos la API, este archivo se elimina.
const mascotasMock: MascotaConDueno[] = [
  {
    id: 1,
    nombre: 'Luna',
    especie: 'Perro',
    raza: 'Golden Retriever',
    fecha_nacimiento: '2022-03-15',
    dueno_id: 1,
    dueno_nombre: 'Carlos Ramírez',
  },
  {
    id: 2,
    nombre: 'Michi',
    especie: 'Gato',
    raza: 'Siamés',
    fecha_nacimiento: '2023-01-20',
    dueno_id: 2,
    dueno_nombre: 'Ana López',
  },
  {
    id: 3,
    nombre: 'Rocky',
    especie: 'Perro',
    raza: 'Bulldog Francés',
    fecha_nacimiento: '2021-08-05',
    dueno_id: 1,
    dueno_nombre: 'Carlos Ramírez',
  },
  {
    id: 4,
    nombre: 'Nube',
    especie: 'Gato',
    raza: 'Persa',
    fecha_nacimiento: '2023-07-12',
    dueno_id: 3,
    dueno_nombre: 'María Torres',
  },
];

export default mascotasMock;
