import type { Mascota } from '../pages/mascotas/MascotasPage.types';
import { API_URLS } from './api';

// La URL base de la API. Cuando se despliegue a producción,
// esto se cambia por la URL del servidor real o mediante variables de entorno.
const API_URL = API_URLS.mascotas;

/**
 * Servicio mascotasService
 * Encapsula todas las peticiones HTTP (fetch) hacia el backend relacionadas con las Mascotas.
 * Separa la lógica de acceso a datos de los componentes visuales de React.
 */
export const mascotasService = {
  /**
   * Obtiene la lista completa de mascotas desde el backend.
   * @returns {Promise<Mascota[]>} Un arreglo de mascotas
   */
  // GET /api/mascotas
  getAll: async (): Promise<Mascota[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Error al obtener mascotas');
    }

    return response.json();
  },

  // POST /api/mascotas
  create: async (
    data: Omit<
      Mascota,
      | 'id'
      | 'activo'
      | 'propietario_nombre'
      | 'propietario_apellidos'
      | 'telefono'
    >,
  ): Promise<Mascota> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al crear mascota');
    }

    return response.json();
  },

  // PUT /api/mascotas/:id
  update: async (
    id: number,
    data: Omit<
      Mascota,
      | 'id'
      | 'activo'
      | 'propietario_nombre'
      | 'propietario_apellidos'
      | 'telefono'
    >,
  ): Promise<Mascota> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar mascota');
    }

    return response.json();
  },

  // DELETE /api/mascotas/:id
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar mascota');
    }
  },
};
