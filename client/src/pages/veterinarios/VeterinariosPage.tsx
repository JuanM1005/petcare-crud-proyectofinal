import { useVeterinarios } from './useVeterinarios';
import type { Veterinario } from './VeterinariosPage.types';
import type { Column } from '../../components/DataTable/DataTable.types';
import { Button, DataTable, VeterinarioForm } from '../../components';
import styles from './VeterinariosPage.module.css';

const columns: Column<Veterinario>[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellidos', label: 'Apellidos' },
  { key: 'cedula_profesional', label: 'Cédula' },
  { key: 'especialidad', label: 'Especialidad' },
  { key: 'email', label: 'Email' },
];

export const VeterinariosPage = () => {
  const {
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
  } = useVeterinarios();

  if (loading) return <p>Cargando veterinarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Veterinarios</h2>
        <Button label="+ Nuevo Veterinario" onClick={handleNew} />
      </div>

      <DataTable
        data={veterinarios}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay veterinarios registrados"
      />

      {showForm && (
        <VeterinarioForm
          onSubmit={editingVeterinario ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          initialData={
            editingVeterinario
              ? {
                  nombre: editingVeterinario.nombre,
                  apellidos: editingVeterinario.apellidos,
                  cedula_profesional: editingVeterinario.cedula_profesional,
                  especialidad: editingVeterinario.especialidad,
                  email: editingVeterinario.email,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
