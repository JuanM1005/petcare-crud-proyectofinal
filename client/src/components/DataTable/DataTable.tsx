import type { DataTableProps } from './DataTable.types';
import { Button } from '../Button/Button';
import styles from './DataTable.module.css';

// La sintaxis <T extends { id: number }> declara el genérico.
// Es como decirle a TypeScript: "este componente funciona con
// cualquier tipo de objeto, siempre que tenga un id numérico".
export const DataTable = <T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
}: DataTableProps<T>) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={String(col.key)}>{String(item[col.key])}</td>
            ))}
            <td>
              <div className={styles.actions}>
                <Button label="Editar" onClick={() => onEdit(item)} />
                <Button
                  label="Eliminar"
                  variant="danger"
                  onClick={() => onDelete(item.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
