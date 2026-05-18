import { useState, useEffect } from 'react';
import type { Servicio } from './TratamientosPage.types';
import { serviciosService } from '../../services';

export const useTratamientos = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null);

  useEffect(() => {
    fetchServicios();
  }, []);

  async function fetchServicios() {
    try {
      setLoading(true);
      const data = await serviciosService.getAll();
      setServicios(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (data: Omit<Servicio, 'id'>) => {
    try {
      await serviciosService.create(data);
      fetchServicios();
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear servicio');
    }
  };

  const handleUpdate = async (data: Omit<Servicio, 'id'>) => {
    if (!editingServicio) return;
    try {
      await serviciosService.update(editingServicio.id, data);
      fetchServicios();
      setShowForm(false);
      setEditingServicio(null);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : 'Error al actualizar servicio',
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este servicio?')) return;
    try {
      await serviciosService.delete(id);
      fetchServicios();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar servicio');
    }
  };

  const handleEdit = (servicio: Servicio) => {
    setEditingServicio(servicio);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingServicio(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingServicio(null);
  };

  return {
    servicios,
    loading,
    error,
    showForm,
    editingServicio,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  };
};
