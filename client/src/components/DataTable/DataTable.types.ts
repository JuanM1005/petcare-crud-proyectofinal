// Column define cómo se ve una columna de la tabla.
// 'key' es el nombre de la propiedad del objeto que se muestra en esa columna.
// 'label' es el texto del encabezado.
export interface Column<T> {
  key: keyof T;
  label: string;
}

// T es un genérico: significa "cualquier tipo de objeto".
// Cuando se use DataTable con mascotas, T será MascotaConDueno.
// Cuando se use con dueños, T será Dueno.
// La restricción { id: number } dice: "T puede ser lo que sea,
// pero DEBE tener una propiedad id de tipo number".
export interface DataTableProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  emptyMessage?: string;
}
