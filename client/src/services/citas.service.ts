import type { Cita } from '../pages/citas/CitasPage.types';
import { API_URLS } from './api';

const API_URL = API_URLS.citas;

export const citasService = {
  getAll: async (): Promise<Cita[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener citas');
    }
    return response.json();
  },

  create: async (
    data: Omit<
      Cita,
      'id' | 'mascota_nombre' | 'veterinario_nombre' | 'especialidad'
    >,
  ): Promise<Cita> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al crear cita');
    }
    return response.json();
  },

  update: async (
    id: number,
    data: Omit<
      Cita,
      'id' | 'mascota_nombre' | 'veterinario_nombre' | 'especialidad'
    >,
  ): Promise<Cita> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar cita');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar cita');
    }
  },
};
