import { useState, useEffect } from 'react';
import type { MascotaFormData } from './MascotaForm.types';
import initialFormData from './initialFormData';
import { propietariosService } from '../../services';
import type { Propietario } from '../../pages/propietarios/PropietariosPage.types';

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

  const [propietarios, setPropietarios] = useState<Propietario[]>([]);

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const data = await propietariosService.getAll();
        setPropietarios(data);
      } catch (error) {
        console.error('Error al cargar propietarios:', error);
      }
    };
    fetchPropietarios();
  }, []);

  // Manejador genérico para todos los inputs y selects del formulario.
  // Actualiza dinámicamente la propiedad correspondiente basándose en el 'name' del elemento.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'propietario_id') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  return { formData, handleChange, handleSubmit, propietarios };
};
