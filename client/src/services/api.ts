// URL de la API
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Endpoints de la API
export const API_URLS = {
  mascotas: `${API_BASE}/mascotas`,
  propietarios: `${API_BASE}/propietarios`,
  veterinarios: `${API_BASE}/veterinarios`,
  servicios: `${API_BASE}/servicios`,
  citas: `${API_BASE}/citas`,
  citasServicios: `${API_BASE}/citas-servicios`,
  dashboard: `${API_BASE}/dashboard`,
};
