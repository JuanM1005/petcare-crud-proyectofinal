import { useEffect, useState } from 'react';
import type { Mascota } from './MascotasPage.types';
import type { MascotaFormData } from '../../components/MascotaForm/MascotaForm.types';
import { mascotasService } from '../../services';

/**
 * Custom Hook: useMascotas
 * Gestiona el estado y la lógica de negocio completa para la entidad Mascotas.
 * Actúa como intermediario entre la UI (vista) y los servicios de la API (modelo).
 */
export const useMascotas = () => {
  // Estado para almacenar la lista de mascotas
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  // Estado para controlar el indicador de carga durante las peticiones
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para capturar y mostrar mensajes de error
  const [error, setError] = useState<string | null>(null);

  // Estado de UI: Controla la visibilidad del modal del formulario
  const [showForm, setShowForm] = useState<boolean>(false);
  // Estado de UI: Almacena la mascota que se está editando actualmente. Null si es creación.
  const [editingMascota, setEditingMascota] = useState<Mascota | null>(null);

  /**
   * Efecto de inicialización
   * Se ejecuta una sola vez cuando el componente que usa el hook se monta en el DOM.
   * Carga los datos iniciales llamando a la API.
   */
  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      setLoading(true);
      const data = await mascotasService.getAll();
      setMascotas(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: MascotaFormData) => {
    try {
      await mascotasService.create(data);
      // Después de crear, recargamos la lista completa.
      // Así el JOIN trae el nombre del propietario correctamente.
      await fetchMascotas();
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear');
    }
  };

  const handleUpdate = async (data: MascotaFormData) => {
    if (!editingMascota) return;

    try {
      await mascotasService.update(editingMascota.id, data);
      await fetchMascotas();
      setEditingMascota(null);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar esta mascota?',
    );

    if (!confirmado) return;

    try {
      await mascotasService.delete(id);
      // Actualizamos el estado local sin recargar todo.
      // Esto hace que la UI responda más rápido.
      setMascotas(mascotas.filter((m) => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const handleEdit = (mascota: Mascota) => {
    setEditingMascota(mascota);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingMascota(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingMascota(null);
    setShowForm(false);
  };

  return {
    mascotas,
    loading,
    error,
    showForm,
    editingMascota,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  };
};
