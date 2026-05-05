import type { ServicioFormData } from './ServicioForm.types';

const initialFormData: ServicioFormData = {
  nombre: '',
  descripcion: '',
  precio_base: '',
  duracion_minutos: 30, // Default duration
};

export default initialFormData;
