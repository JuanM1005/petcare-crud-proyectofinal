import { useMascotas } from './useMascotas';
import { MascotasTable } from './MascotasTable/MascotasTable';
import { Button, MascotaForm } from '../../components';
import styles from './MascotasPage.module.css';

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

      <MascotasTable
        mascotas={mascotas}
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
