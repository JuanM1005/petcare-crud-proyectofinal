export interface ServicioFormData {
  nombre: string;
  descripcion: string;
  precio_base: string;
  duracion_minutos: number;
}

export interface ServicioFormProps {
  onSubmit: (data: ServicioFormData) => void;
  onCancel: () => void;
  initialData?: ServicioFormData;
}
