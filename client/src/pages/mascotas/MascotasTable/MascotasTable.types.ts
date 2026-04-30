import type MascotaConDueno from '../MascotasPage.types';

export default interface MascotasTableProps {
  mascotas: MascotaConDueno[];
  onEdit: (mascota: MascotaConDueno) => void;
  onDelete: (id: number) => void;
}
