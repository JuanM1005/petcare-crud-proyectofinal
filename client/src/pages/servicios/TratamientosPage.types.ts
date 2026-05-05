export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: string; // Postgres numeric is usually returned as string or number, let's type it as string or number
  duracion_minutos: number;
}
