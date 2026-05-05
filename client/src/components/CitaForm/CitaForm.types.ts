export interface CitaFormData {
  mascota_id: number;
  veterinario_id: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
  notas: string;
}

export interface CitaFormProps {
  onSubmit: (data: CitaFormData) => void;
  onCancel: () => void;
  initialData?: CitaFormData;
}
