import { useState, useEffect } from 'react';
import type { CitaFormData } from './CitaForm.types';
import initialFormData from './initialFormData';
import { mascotasService, veterinariosService } from '../../services';
import type { Mascota } from '../../pages/mascotas/MascotasPage.types';
import type { Veterinario } from '../../pages/veterinarios/VeterinariosPage.types';

export const useCitaForm = (
  onSubmit: (data: CitaFormData) => void,
  initialData?: CitaFormData,
) => {
  const [formData, setFormData] = useState<CitaFormData>(() => {
    if (initialData) {
      // Formatear el timestamp ISO a datetime-local (YYYY-MM-DDThh:mm)
      let fechaHoraLocal = initialData.fecha_hora;
      if (fechaHoraLocal && fechaHoraLocal.includes('Z')) {
        const dateObj = new Date(fechaHoraLocal);
        const tzOffset = dateObj.getTimezoneOffset() * 60000;
        const localISOTime = new Date(dateObj.getTime() - tzOffset)
          .toISOString()
          .slice(0, 16);
        fechaHoraLocal = localISOTime;
      } else if (fechaHoraLocal && fechaHoraLocal.length > 16) {
        fechaHoraLocal = fechaHoraLocal.slice(0, 16);
      }
      return { ...initialData, fecha_hora: fechaHoraLocal };
    }
    return initialFormData;
  });

  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [mascotasData, veterinariosData] = await Promise.all([
          mascotasService.getAll(),
          veterinariosService.getAll(),
        ]);
        setMascotas(mascotasData);
        setVeterinarios(veterinariosData);
      } catch (error) {
        console.error('Error al cargar opciones:', error);
        alert('Error al cargar las opciones del formulario');
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'mascota_id' || name === 'veterinario_id') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.mascota_id) {
      alert('La mascota es obligatoria');
      return;
    }
    if (!formData.veterinario_id) {
      alert('El veterinario es obligatorio');
      return;
    }
    if (!formData.fecha_hora.trim()) {
      alert('La fecha y hora son obligatorias');
      return;
    }
    if (!formData.motivo.trim()) {
      alert('El motivo es obligatorio');
      return;
    }

    // Convert datetime-local to ISO format for the API before submit
    const fechaSubmit = new Date(formData.fecha_hora).toISOString();

    onSubmit({ ...formData, fecha_hora: fechaSubmit });
    setFormData(initialFormData);
  };

  return { formData, handleChange, handleSubmit, mascotas, veterinarios };
};
