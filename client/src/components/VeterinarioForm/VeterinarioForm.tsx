import type { VeterinarioFormProps } from './VeterinarioForm.types';
import { useVeterinarioForm } from './useVeterinarioForm';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Modal } from '../Modal/Modal';
import styles from './VeterinarioForm.module.css';

export const VeterinarioForm = ({
  onSubmit,
  onCancel,
  initialData,
}: VeterinarioFormProps) => {
  const { formData, handleChange, handleSubmit } = useVeterinarioForm(
    onSubmit,
    initialData,
  );

  const isEditing = !!initialData;

  const especialidadOptions = [
    { value: 'Medicina general', label: 'Medicina general' },
    { value: 'Cirugía', label: 'Cirugía' },
    { value: 'Dermatología', label: 'Dermatología' },
    { value: 'Oftalmología', label: 'Oftalmología' },
    { value: 'Cardiología', label: 'Cardiología' },
    { value: 'Otro', label: 'Otro' },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Editar Veterinario' : 'Nuevo Veterinario'}
    >
      <div className={styles.formGrid}>
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Juan"
          required
        />

        <Input
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Ej: Pérez Gómez"
          required
        />

        <Input
          label="Cédula profesional"
          name="cedula_profesional"
          value={formData.cedula_profesional}
          onChange={handleChange}
          placeholder="VET-2018-0451"
          required
        />

        <Select
          label="Especialidad"
          name="especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          options={especialidadOptions}
        />

        <div className={styles.fullWidth}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: juan.perez@email.com"
            required
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <Button label="Cancelar" variant="cancel" onClick={onCancel} />
        <Button
          label={isEditing ? 'Actualizar' : 'Guardar'}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};
