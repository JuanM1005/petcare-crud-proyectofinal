export interface Cita {
  id: number;
  mascota_id: number;
  veterinario_id: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
  notas: string;
  mascota_nombre?: string;
  veterinario_nombre?: string;
  especialidad?: string;
}
