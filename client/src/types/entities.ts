// Interfaces que definen la estructura de los datos de Mascota y Dueño
// utilizadas para tipar la información proveniente de la base de datos.

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
  dueno_id: number;
}

export interface Dueno {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
}
