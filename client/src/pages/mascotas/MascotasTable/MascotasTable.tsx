import type MascotasTableProps from './MascotasTable.types';
import { Button } from '../../../components';
import styles from './MascotasTable.module.css';

export const MascotasTable = ({
  mascotas,
  onEdit,
  onDelete,
}: MascotasTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Raza</th>
          <th>Nacimiento</th>
          <th>Dueño</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {mascotas.map((mascota) => (
          <tr key={mascota.id}>
            <td>{mascota.nombre}</td>
            <td>{mascota.especie}</td>
            <td>{mascota.raza}</td>
            <td>{mascota.fecha_nacimiento}</td>
            <td>{mascota.dueno_nombre}</td>
            <td>
              <div className={styles.actions}>
                <Button label="Editar" onClick={() => onEdit(mascota)} />
                <Button
                  label="Eliminar"
                  variant="danger"
                  onClick={() => onDelete(mascota.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
