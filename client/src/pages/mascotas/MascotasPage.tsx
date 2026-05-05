import { useMascotas } from './useMascotas';
import type { Mascota } from './MascotasPage.types';
import type { Column } from '../../components/DataTable/DataTable.types';
import { Button, DataTable, MascotaForm } from '../../components';
import styles from './MascotasPage.module.css';

const columns: Column<Mascota>[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'especie', label: 'Especie' },
  { key: 'raza', label: 'Raza' },
  { key: 'sexo', label: 'Sexo' },
  { key: 'peso_kg', label: 'Peso (kg)' },
  { key: 'propietario_nombre', label: 'Propietario' },
];

export const MascotasPage = () => {
  const {
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
  } = useMascotas();

  if (loading) return <p>Cargando mascotas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mascotas</h2>
        <Button label="+ Nueva Mascota" onClick={handleNew} />
      </div>

      <DataTable
        data={mascotas}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <MascotaForm
          onSubmit={editingMascota ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          initialData={
            editingMascota
              ? {
                  propietario_id: editingMascota.propietario_id,
                  nombre: editingMascota.nombre,
                  especie: editingMascota.especie,
                  raza: editingMascota.raza,
                  sexo: editingMascota.sexo,
                  fecha_nacimiento: editingMascota.fecha_nacimiento
                    ? editingMascota.fecha_nacimiento.split('T')[0]
                    : '',
                  peso_kg: editingMascota.peso_kg,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
