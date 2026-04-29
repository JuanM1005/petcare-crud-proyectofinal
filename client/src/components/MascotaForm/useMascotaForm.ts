import { useState } from 'react';
import type { MascotaFormData } from './MascotaForm.types';
import initialFormData from './initialFormData';

// Este hook encapsula toda la lógica del formulario.
// El componente visual solo consume lo que el hook expone.
export const useMascotaForm = (onSubmit: (data: MascotaFormData) => void) => {
  const [formData, setFormData] = useState<MascotaFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target; // Destructuring: obtenemos el "name" del input (para saber qué campo actualizar) y su "value"
    setFormData({
      ...formData,
      [name]: name === 'dueno_id' ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    onSubmit(formData);

    // Limpia el formulario después de enviar
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit };
};
