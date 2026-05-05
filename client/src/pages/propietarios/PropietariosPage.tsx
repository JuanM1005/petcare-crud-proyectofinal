import { usePropietarios } from './usePropietarios';
import type { Propietario } from './PropietariosPage.types';
import type { Column } from '../../components/DataTable/DataTable.types';
import { Button, DataTable, PropietarioForm } from '../../components';
import styles from './PropietariosPage.module.css';

const columns: Column<Propietario>[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellidos', label: 'Apellidos' },
  { key: 'email', label: 'Email' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'direccion', label: 'Dirección' },
];

export const PropietariosPage = () => {
  const {
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
  } = usePropietarios();

  if (loading) return <p>Cargando propietarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Propietarios</h2>
        <Button label="+ Nuevo Propietario" onClick={handleNew} />
      </div>

      <DataTable
        data={propietarios}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay propietarios registrados"
      />

      {showForm && (
        <PropietarioForm
          onSubmit={editingPropietario ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          initialData={
            editingPropietario
              ? {
                  nombre: editingPropietario.nombre,
                  apellidos: editingPropietario.apellidos,
                  email: editingPropietario.email,
                  telefono: editingPropietario.telefono,
                  direccion: editingPropietario.direccion,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
