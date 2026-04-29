// Extiende la interfaz base de Mascota con el nombre del dueño
// para mostrarlo en la tabla sin necesidad de un segundo fetch
export default interface MascotaConDueno {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
  dueno_id: number;
  dueno_nombre: string;
}
