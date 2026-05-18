import { API_URLS } from './api';

export interface DashboardStats {
  total_mascotas: number;
  total_propietarios: number;
  total_veterinarios: number;
  total_servicios: number;
  total_citas: number;
  citas_hoy: number;
  citas_mes: number;
}

export interface ProximaCita {
  id: number;
  mascota_nombre: string;
  veterinario_nombre: string;
  fecha_hora: string;
  motivo: string;
  estado: string;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_URLS.dashboard}/stats`);
    if (!res.ok) throw new Error('Error al obtener estadísticas');
    return res.json();
  },

  async getProximasCitas(): Promise<ProximaCita[]> {
    const res = await fetch(`${API_URLS.dashboard}/proximas-citas`);
    if (!res.ok) throw new Error('Error al obtener próximas citas');
    return res.json();
  },
};
