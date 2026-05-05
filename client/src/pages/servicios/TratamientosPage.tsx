import { useTratamientos } from './useTratamientos';
import type { Servicio } from './TratamientosPage.types';
import type { Column } from '../../components/DataTable/DataTable.types';
import { Button, DataTable, ServicioForm } from '../../components';
import styles from './TratamientosPage.module.css';

const columns: Column<Servicio>[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'precio_base', label: 'Precio base' },
  { key: 'duracion_minutos', label: 'Duración (min)' },
];

export const TratamientosPage = () => {
  const {
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
  } = useTratamientos();

  if (loading) return <p>Cargando tratamientos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tratamientos</h2>
        <Button label="+ Nuevo Tratamiento" onClick={handleNew} />
      </div>

      <DataTable
        data={servicios}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay tratamientos registrados"
      />

      {showForm && (
        <ServicioForm
          onSubmit={editingServicio ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          initialData={
            editingServicio
              ? {
                  nombre: editingServicio.nombre,
                  descripcion: editingServicio.descripcion,
                  precio_base: editingServicio.precio_base,
                  duracion_minutos: editingServicio.duracion_minutos,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
