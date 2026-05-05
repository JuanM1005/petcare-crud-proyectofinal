import { useState } from 'react';
import type { PropietarioFormData } from './PropietarioForm.types';
import initialFormData from './initialFormData';

export const usePropietarioForm = (
  onSubmit: (data: PropietarioFormData) => void,
  initialData?: PropietarioFormData,
) => {
  const [formData, setFormData] = useState<PropietarioFormData>(
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
    if (!formData.email.trim()) {
      alert('El email es obligatorio');
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit };
};
