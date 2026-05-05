import type { Propietario } from '../pages/propietarios/PropietariosPage.types';
import { API_URLS } from './api';

const API_URL = API_URLS.propietarios;

export const propietariosService = {
  getAll: async (): Promise<Propietario[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener propietarios');
    return response.json();
  },

  create: async (
    data: Omit<Propietario, 'id' | 'fecha_registro' | 'activo'>,
  ): Promise<Propietario> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear propietario');
    return response.json();
  },

  update: async (
    id: number,
    data: Omit<Propietario, 'id' | 'fecha_registro' | 'activo'>,
  ): Promise<Propietario> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar propietario');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar propietario');
  },
};
