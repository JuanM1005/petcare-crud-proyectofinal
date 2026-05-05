// Definición de la interfaz para mascotas
export interface Mascota {
  id: number;
  propietario_id: number;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fecha_nacimiento: string;
  peso_kg: number;
  activo: boolean;
  propietario_nombre: string;
  propietario_apellidos: string;
  telefono: string;
}
