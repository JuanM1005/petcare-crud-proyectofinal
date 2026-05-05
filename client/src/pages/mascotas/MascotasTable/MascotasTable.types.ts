import type { Mascota } from '../MascotasPage.types';

export default interface MascotasTableProps {
  mascotas: Mascota[];
  onEdit: (mascota: Mascota) => void;
  onDelete: (id: number) => void;
}
