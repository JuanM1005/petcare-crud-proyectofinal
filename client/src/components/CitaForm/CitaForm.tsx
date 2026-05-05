import type { CitaFormProps } from './CitaForm.types';
import { useCitaForm } from './useCitaForm';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Modal } from '../Modal/Modal';
import styles from './CitaForm.module.css';

const ESTADOS_OPTIONS = [
  { value: 'Programada', label: 'Programada' },
  { value: 'Completada', label: 'Completada' },
  { value: 'Cancelada', label: 'Cancelada' },
  { value: 'No asistio', label: 'No asistió' },
];

export const CitaForm = ({
  onSubmit,
  onCancel,
  initialData,
}: CitaFormProps) => {
  const { formData, handleChange, handleSubmit, mascotas, veterinarios } =
    useCitaForm(onSubmit, initialData);

  const isEditing = !!initialData;

  const mascotasOptions = mascotas.map((m) => ({
    value: m.id,
    label: m.nombre,
  }));
  const veterinariosOptions = veterinarios.map((v) => ({
    value: v.id,
    label: `${v.nombre} ${v.apellidos}`,
  }));

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Editar Cita' : 'Nueva Cita'}
    >
      <div className={styles.formGrid}>
        <Select
          label="Mascota"
          name="mascota_id"
          value={formData.mascota_id || ''}
          onChange={handleChange}
          options={mascotasOptions}
          required
        />

        <Select
          label="Veterinario"
          name="veterinario_id"
          value={formData.veterinario_id || ''}
          onChange={handleChange}
          options={veterinariosOptions}
          required
        />

        <Input
          label="Fecha y hora"
          type="datetime-local"
          name="fecha_hora"
          value={formData.fecha_hora}
          onChange={handleChange}
          required
        />

        {isEditing && (
          <Select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            options={ESTADOS_OPTIONS}
          />
        )}

        <div className={styles.fullWidth}>
          <Input
            label="Motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Motivo de la consulta"
            required
          />
        </div>

        <div className={styles.fullWidth}>
          <Input
            label="Notas"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            placeholder="Notas opcionales"
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
