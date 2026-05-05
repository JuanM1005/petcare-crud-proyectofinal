import type { Servicio } from '../pages/servicios/TratamientosPage.types';
import { API_URLS } from './api';

const API_URL = API_URLS.servicios;

export const serviciosService = {
  getAll: async (): Promise<Servicio[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener servicios');
    }
    return response.json();
  },

  create: async (data: Omit<Servicio, 'id'>): Promise<Servicio> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al crear servicio');
    }
    return response.json();
  },

  update: async (id: number, data: Omit<Servicio, 'id'>): Promise<Servicio> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar servicio');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar servicio');
    }
  },
};
