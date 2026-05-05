import { useState, useEffect } from 'react';
import type { Cita } from './CitasPage.types';
import { citasService } from '../../services';

export const useCitas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const data = await citasService.getAll();
      setCitas(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const handleCreate = async (
    data: Omit<
      Cita,
      'id' | 'mascota_nombre' | 'veterinario_nombre' | 'especialidad'
    >,
  ) => {
    try {
      await citasService.create(data);
      fetchCitas();
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear cita');
    }
  };

  const handleUpdate = async (
    data: Omit<
      Cita,
      'id' | 'mascota_nombre' | 'veterinario_nombre' | 'especialidad'
    >,
  ) => {
    if (!editingCita) return;
    try {
      await citasService.update(editingCita.id, data);
      fetchCitas();
      setShowForm(false);
      setEditingCita(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar cita');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta cita?')) return;
    try {
      await citasService.delete(id);
      fetchCitas();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar cita');
    }
  };

  const handleEdit = (cita: Cita) => {
    setEditingCita(cita);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingCita(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCita(null);
  };

  return {
    citas,
    loading,
    error,
    showForm,
    editingCita,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  };
};
