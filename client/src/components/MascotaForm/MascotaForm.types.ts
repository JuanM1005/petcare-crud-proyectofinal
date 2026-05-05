// Los datos que el formulario maneja internamente.
export interface MascotaFormData {
  propietario_id: number;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fecha_nacimiento: string;
  peso_kg: number;
}

export interface MascotaFormProps {
  onSubmit: (data: MascotaFormData) => void;
  onCancel: () => void;
  initialData?: MascotaFormData;
}
