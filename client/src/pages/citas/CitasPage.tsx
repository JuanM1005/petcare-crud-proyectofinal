import { CalendarCheck } from 'lucide-react';
import { useCitas } from './useCitas';
import type { Cita } from './CitasPage.types';
import type { Column } from '../../components/DataTable/DataTable.types';
import { Button, DataTable, CitaForm, StatusBadge } from '../../components';
import styles from './CitasPage.module.css';

const columns: Column<Cita>[] = [
  { key: 'mascota_nombre', label: 'Mascota' },
  { key: 'veterinario_nombre', label: 'Veterinario' },
  {
    key: 'fecha_hora',
    label: 'Fecha/Hora',
    render: (value) => {
      if (!value) return '';
      const date = new Date(value as string);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
  },
  { key: 'motivo', label: 'Motivo' },
  {
    key: 'estado',
    label: 'Estado',
    render: (value) => <StatusBadge status={value as string} />,
  },
];

export const CitasPage = () => {
  const {
    citas,
    loading,
    error,
    showForm,
    editingCita,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleNew,
    handleCancel,
  } = useCitas();

  if (loading) return <p>Cargando citas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.titleGroup}>
        <div className={styles.iconWrap}>
          <CalendarCheck size={22} />
        </div>
        <h2 className={styles.title}>Citas</h2>
      </div>
      <div className={styles.accentLine} />

      <div className={styles.header}>
        <Button label="+ Nueva Cita" onClick={handleNew} />
      </div>

      <DataTable
        data={citas}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay citas registradas"
      />

      {showForm && (
        <CitaForm
          onSubmit={editingCita ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          initialData={
            editingCita
              ? {
                  mascota_id: editingCita.mascota_id,
                  veterinario_id: editingCita.veterinario_id,
                  fecha_hora: editingCita.fecha_hora,
                  motivo: editingCita.motivo,
                  estado: editingCita.estado,
                  notas: editingCita.notas || '',
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
