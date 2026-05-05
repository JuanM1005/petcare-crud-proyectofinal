import type { CitaFormData } from './CitaForm.types';

const initialFormData: CitaFormData = {
  mascota_id: 0,
  veterinario_id: 0,
  fecha_hora: '',
  motivo: '',
  estado: 'Programada',
  notas: '',
};

export default initialFormData;
