import type { Veterinario } from '../pages/veterinarios/VeterinariosPage.types';
import { API_URLS } from './api';

const API_URL = API_URLS.veterinarios;

export const veterinariosService = {
  getAll: async (): Promise<Veterinario[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener veterinarios');
    return response.json();
  },

  create: async (
    data: Omit<Veterinario, 'id' | 'activo'>,
  ): Promise<Veterinario> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear veterinario');
    return response.json();
  },

  update: async (
    id: number,
    data: Omit<Veterinario, 'id' | 'activo'>,
  ): Promise<Veterinario> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar veterinario');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar veterinario');
  },
};
