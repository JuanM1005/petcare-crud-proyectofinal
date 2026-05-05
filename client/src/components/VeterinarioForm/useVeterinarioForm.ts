import { useState } from 'react';
import type { VeterinarioFormData } from './VeterinarioForm.types';
import initialFormData from './initialFormData';

export const useVeterinarioForm = (
  onSubmit: (data: VeterinarioFormData) => void,
  initialData?: VeterinarioFormData,
) => {
  const [formData, setFormData] = useState<VeterinarioFormData>(
    initialData ?? initialFormData,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    if (!formData.cedula_profesional.trim()) {
      alert('La cédula profesional es obligatoria');
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit };
};
