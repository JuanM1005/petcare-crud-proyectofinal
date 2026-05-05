export interface VeterinarioFormData {
  nombre: string;
  apellidos: string;
  cedula_profesional: string;
  especialidad: string;
  email: string;
}

export interface VeterinarioFormProps {
  onSubmit: (data: VeterinarioFormData) => void;
  onCancel: () => void;
  initialData?: VeterinarioFormData;
}
