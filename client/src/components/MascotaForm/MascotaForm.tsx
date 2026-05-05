import type { MascotaFormProps } from './MascotaForm.types';
import { useMascotaForm } from './useMascotaForm';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Modal } from '../Modal/Modal';
import styles from './MascotaForm.module.css';

const ESPECIE_OPTIONS = [
  { value: 'Perro', label: 'Perro' },
  { value: 'Gato', label: 'Gato' },
  { value: 'Ave', label: 'Ave' },
  { value: 'Conejo', label: 'Conejo' },
  { value: 'Otro', label: 'Otro' },
];

const SEXO_OPTIONS = [
  { value: 'M', label: 'Macho' },
  { value: 'H', label: 'Hembra' },
];

// Opciones hardcodeadas por ahora, idealmente vendrían del backend
const PROPIETARIO_OPTIONS = [
  { value: 1, label: 'Maria Gonzalez Lopez' },
  { value: 2, label: 'Carlos Ramirez Soto' },
  { value: 3, label: 'Ana Martinez Perez' },
];

export const MascotaForm = ({
  onSubmit,
  onCancel,
  initialData,
}: MascotaFormProps) => {
  const { formData, handleChange, handleSubmit } = useMascotaForm(
    onSubmit,
    initialData,
  );

  const isEditing = !!initialData;

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Editar Mascota' : 'Nueva Mascota'}
    >
      <div className={styles.formGrid}>
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Luna"
          required
        />

        <Select
          label="Especie"
          name="especie"
          value={formData.especie}
          onChange={handleChange}
          options={ESPECIE_OPTIONS}
          required
        />

        <Input
          label="Raza"
          name="raza"
          value={formData.raza}
          onChange={handleChange}
          placeholder="Ej: Labrador"
        />

        <Select
          label="Sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          options={SEXO_OPTIONS}
          required
        />

        <Input
          label="Fecha de nacimiento"
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />

        <Input
          label="Peso (kg)"
          type="number"
          name="peso_kg"
          value={formData.peso_kg || ''}
          onChange={handleChange}
          placeholder="Ej: 12.5"
          step="0.01"
          min="0"
        />

        <div className={styles.fullWidth}>
          <Select
            label="Propietario"
            name="propietario_id"
            value={formData.propietario_id || ''}
            onChange={handleChange}
            options={PROPIETARIO_OPTIONS}
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
