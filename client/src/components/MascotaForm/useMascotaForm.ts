import { useState } from 'react';
import type { MascotaFormData } from './MascotaForm.types';
import initialFormData from './initialFormData';

export const useMascotaForm = (
  onSubmit: (data: MascotaFormData) => void,
  initialData?: MascotaFormData,
) => {
  // Si recibimos initialData, el formulario arranca con esos valores.
  // Si no, arranca vacío.
  const [formData, setFormData] = useState<MascotaFormData>(
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

    onSubmit(formData);
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit };
};
