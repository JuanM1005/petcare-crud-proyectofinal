// Los datos que el formulario maneja internamente.
export interface MascotaFormData {
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
  dueno_id: number;
}

// Las props que el componente recibe de su padre.
export default interface MascotaFormProps {
  onSubmit: (data: MascotaFormData) => void;
  onCancel: () => void;
}
