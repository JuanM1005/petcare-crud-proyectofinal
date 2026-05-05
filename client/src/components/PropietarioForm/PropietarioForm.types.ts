export interface PropietarioFormData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface PropietarioFormProps {
  onSubmit: (data: PropietarioFormData) => void;
  onCancel: () => void;
  initialData?: PropietarioFormData;
}
