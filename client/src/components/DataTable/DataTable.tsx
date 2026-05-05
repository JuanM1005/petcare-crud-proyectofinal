import { FileX, Pencil, Trash2 } from 'lucide-react';
import type { DataTableProps } from './DataTable.types';
import styles from './DataTable.module.css';

/**
 * Componente genérico DataTable
 * Permite renderizar cualquier lista de objetos con un identificador (id) único,
 * y expone acciones para editar o eliminar cada registro.
 *
 * @template T - Interfaz que representa la estructura de los datos (debe tener un campo 'id').
 */
export const DataTable = <T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  emptyMessage = 'No hay registros para mostrar',
}: DataTableProps<T>) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {/* Renderizado de las cabeceras basado en las columnas configuradas */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            <th className={styles.actionsHeader}>Acciones</th>
          </tr>
        </thead>

        {/* Renderizado del cuerpo de la tabla */}
        <tbody>
          {data.length === 0 ? (
            /* Estado vacío: Se muestra cuando la lista de datos está vacía */
            <tr>
              <td colSpan={columns.length + 1} className={styles.emptyState}>
                <div className={styles.emptyContent}>
                  <FileX size={48} className={styles.emptyIcon} />
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            /* Iteración sobre los datos para renderizar cada fila */
            data.map((item) => (
              <tr key={item.id}>
                {/* Iteración de columnas para renderizar las celdas de la fila actual */}
                {columns.map((col) => (
                  <td key={String(col.key)}>{String(item[col.key])}</td>
                ))}

                {/* Columna final con los botones de acción (Editar y Eliminar) */}
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.iconButton}
                      onClick={() => onEdit(item)}
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className={`${styles.iconButton} ${styles.iconButtonDanger}`}
                      onClick={() => onDelete(item.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
