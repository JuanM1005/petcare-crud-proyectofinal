import { useEffect, useState } from 'react';
import type { Veterinario } from './VeterinariosPage.types';
import type { VeterinarioFormData } from '../../components/VeterinarioForm/VeterinarioForm.types';
import { veterinariosService } from '../../services/veterinarios.service';

export const useVeterinarios = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingVeterinario, setEditingVeterinario] =
    useState<Veterinario | null>(null);

  useEffect(() => {
    fetchVeterinarios();
  }, []);

  const fetchVeterinarios = async () => {
    try {
      setLoading(true);
      const data = await veterinariosService.getAll();
      setVeterinarios(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: VeterinarioFormData) => {
    try {
      await veterinariosService.create(data);
      await fetchVeterinarios();
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear');
    }
  };

  const handleUpdate = async (data: VeterinarioFormData) => {
    if (!editingVeterinario) return;

    try {
      await veterinariosService.update(editingVeterinario.id, data);
      await fetchVeterinarios();
      setEditingVeterinario(null);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar este veterinario?',
    );
    if (!confirmado) return;

    try {
      await veterinariosService.delete(id);
      setVeterinarios(veterinarios.filter((v) => v.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const handleEdit = (veterinario: Veterinario) => {
    setEditingVeterinario(veterinario);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingVeterinario(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingVeterinario(null);
    setShowForm(false);
  };

  return {
    veterinarios,
    loading,
    error,
    showForm,
    editingVeterinario,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  };
};
