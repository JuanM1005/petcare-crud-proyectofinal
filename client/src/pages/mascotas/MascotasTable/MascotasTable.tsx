import type MascotasTableProps from './MascotasTable.types';
import type { Mascota } from '../MascotasPage.types';
import { DataTable } from '../../../components';

export const MascotasTable = ({
  mascotas,
  onEdit,
  onDelete,
}: MascotasTableProps) => {
  const columns = [
    { key: 'nombre' as keyof Mascota, label: 'Nombre' },
    { key: 'especie' as keyof Mascota, label: 'Especie' },
    { key: 'raza' as keyof Mascota, label: 'Raza' },
    { key: 'fecha_nacimiento' as keyof Mascota, label: 'Nacimiento' },
    { key: 'propietario_nombre' as keyof Mascota, label: 'Dueño' },
  ];

  return (
    <DataTable
      data={mascotas}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      emptyMessage="No hay mascotas registradas"
    />
  );
};
