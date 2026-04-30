import { useState } from 'react';
import mascotasMock from './mockData';
import type MascotaConDueno from './MascotasPage.types';
import type { MascotaFormData } from '../../components/MascotaForm/MascotaForm.types';

export const useMascotas = () => {
  const [mascotas, setMascotas] = useState<MascotaConDueno[]>(mascotasMock);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMascota, setEditingMascota] = useState<MascotaConDueno | null>(
    null,
  );

  const handleCreate = (data: MascotaFormData) => {
    const nuevaMascota: MascotaConDueno = {
      ...data,
      id: Date.now(),
      dueno_id: Number(data.dueno_id),
      dueno_nombre: 'Dueño temporal',
    };

    setMascotas([...mascotas, nuevaMascota]);
    setShowForm(false);
  };

  const handleUpdate = (data: MascotaFormData) => {
    setMascotas(
      mascotas.map((mascota) =>
        mascota.id === editingMascota?.id
          ? {
              ...mascota,
              ...data,
              dueno_id: Number(data.dueno_id),
            }
          : mascota,
      ),
    );

    setEditingMascota(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar esta mascota?',
    );

    if (confirmado) {
      setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    }
  };

  const handleEdit = (mascota: MascotaConDueno) => {
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
