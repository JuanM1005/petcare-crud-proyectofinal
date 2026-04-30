import { useMascotas } from './useMascotas';
import type MascotaConDueno from './MascotasPage.types';
import type { Column } from '../../components/DataTable/DataTable.types';
import { Button, DataTable, MascotaForm } from '../../components';
import styles from './MascotasPage.module.css';

// Definimos las columnas fuera del componente porque son constantes.
// Nota cómo TypeScript sabe qué keys son válidas gracias al genérico.
const columns: Column<MascotaConDueno>[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'especie', label: 'Especie' },
  { key: 'raza', label: 'Raza' },
  { key: 'fecha_nacimiento', label: 'Nacimiento' },
  { key: 'dueno_nombre', label: 'Dueño' },
];

export const MascotasPage = () => {
  const {
    mascotas,
    showForm,
    editingMascota,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  } = useMascotas();

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
