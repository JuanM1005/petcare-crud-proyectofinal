import { useState } from 'react';
import type { MascotaFormData } from './MascotaForm.types';
import initialFormData from './initialFormData';

export const useMascotaForm = (
  onSubmit: (data: MascotaFormData) => void,
  initialData?: MascotaFormData,
) => {
  // Inicializa el estado del formulario.
  // Si initialData está presente (modo edición), se cargan esos valores.
  // Si no hay initialData (nueva mascota), se inicia con campos en blanco o valores por defecto.
  const [formData, setFormData] = useState<MascotaFormData>(
    initialData ?? initialFormData,
  );

  // Manejador genérico para todos los inputs y selects del formulario.
  // Actualiza dinámicamente la propiedad correspondiente basándose en el 'name' del elemento.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validación básica y envío de datos.
  const handleSubmit = () => {
    // Validamos que el nombre no esté vacío o contenga solo espacios
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    // Ejecuta el callback proporcionado por el componente padre
    onSubmit(formData);
    
    // Resetea el formulario después de un envío exitoso
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit };
};
