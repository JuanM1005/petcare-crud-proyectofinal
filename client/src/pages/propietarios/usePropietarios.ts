import { useEffect, useState } from 'react';
import type { Propietario } from './PropietariosPage.types';
import type { PropietarioFormData } from '../../components/PropietarioForm/PropietarioForm.types';
import { propietariosService } from '../../services';

export const usePropietarios = () => {
  const [propietarios, setPropietarios] = useState<Propietario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingPropietario, setEditingPropietario] =
    useState<Propietario | null>(null);

  useEffect(() => {
    fetchPropietarios();
  }, []);

  const fetchPropietarios = async () => {
    try {
      setLoading(true);
      const data = await propietariosService.getAll();
      setPropietarios(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: PropietarioFormData) => {
    try {
      await propietariosService.create(data);
      await fetchPropietarios();
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear');
    }
  };

  const handleUpdate = async (data: PropietarioFormData) => {
    if (!editingPropietario) return;

    try {
      await propietariosService.update(editingPropietario.id, data);
      await fetchPropietarios();
      setEditingPropietario(null);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar este propietario?',
    );
    if (!confirmado) return;

    try {
      await propietariosService.delete(id);
      setPropietarios(propietarios.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const handleEdit = (propietario: Propietario) => {
    setEditingPropietario(propietario);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingPropietario(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingPropietario(null);
    setShowForm(false);
  };

  return {
    propietarios,
    loading,
    error,
    showForm,
    editingPropietario,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  };
};
