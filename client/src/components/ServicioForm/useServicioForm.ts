import { useState } from 'react';
import type { ServicioFormData } from './ServicioForm.types';
import initialFormData from './initialFormData';

export const useServicioForm = (
  onSubmit: (data: ServicioFormData) => void,
  initialData?: ServicioFormData,
) => {
  const [formData, setFormData] = useState<ServicioFormData>(
    initialData ?? initialFormData,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    // Handle number types if needed, but since it's an input it comes as string.
    // We can cast duracion_minutos to number.
    if (name === 'duracion_minutos') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    if (
      !formData.precio_base.toString().trim() ||
      Number(formData.precio_base) <= 0
    ) {
      alert('El precio base es obligatorio y debe ser mayor a 0');
      return;
    }
    if (!formData.duracion_minutos || formData.duracion_minutos <= 0) {
      alert('La duración es obligatoria y debe ser mayor a 0');
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit };
};
