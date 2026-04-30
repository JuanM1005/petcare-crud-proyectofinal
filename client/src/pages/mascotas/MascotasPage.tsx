import { useState } from 'react';
import mascotasMock from './mockData';
import type MascotaConDueno from './MascotasPage.types';
import type { MascotaFormData } from '../../components/MascotaForm/MascotaForm.types';
import { Button, MascotaForm } from '../../components';
import styles from './MascotasPage.module.css';

export const MascotasPage = () => {
  const [mascotas, setMascotas] = useState<MascotaConDueno[]>(mascotasMock);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Guarda la mascota que se está editando.
  // Si es null, estamos creando una nueva.
  const [editingMascota, setEditingMascota] = useState<MascotaConDueno | null>(
    null,
  );

  const handleDelete = (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar esta mascota?',
    );

    if (confirmado) {
      setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    }
  };

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

  // La "U" de CRUD — Update
  const handleUpdate = (data: MascotaFormData) => {
    // .map recorre el array y devuelve uno nuevo.
    // Si el id coincide con el que estamos editando,
    // reemplaza esa mascota con los datos actualizados.
    // Si no coincide, la deja igual.
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

  // Abre el formulario en modo edición
  const handleEdit = (mascota: MascotaConDueno) => {
    setEditingMascota(mascota);
    setShowForm(true);
  };

  // Abre el formulario en modo creación
  const handleNew = () => {
    setEditingMascota(null);
    setShowForm(true);
  };

  // Cierra el formulario y limpia el estado de edición
  const handleCancel = () => {
    setEditingMascota(null);
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mascotas</h2>
        <Button label="+ Nueva Mascota" onClick={handleNew} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Nacimiento</th>
            <th>Dueño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.id}>
              <td>{mascota.nombre}</td>
              <td>{mascota.especie}</td>
              <td>{mascota.raza}</td>
              <td>{mascota.fecha_nacimiento}</td>
              <td>{mascota.dueno_nombre}</td>
              <td>
                <div className={styles.actions}>
                  <Button label="Editar" onClick={() => handleEdit(mascota)} />
                  <Button
                    label="Eliminar"
                    variant="danger"
                    onClick={() => handleDelete(mascota.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <MascotaForm
          onSubmit={editingMascota ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          initialData={
            editingMascota
              ? {
                  nombre: editingMascota.nombre,
                  especie: editingMascota.especie,
                  raza: editingMascota.raza,
                  fecha_nacimiento: editingMascota.fecha_nacimiento,
                  dueno_id: editingMascota.dueno_id,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
