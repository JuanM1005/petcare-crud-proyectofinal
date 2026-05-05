import type { PropietarioFormProps } from './PropietarioForm.types';
import { usePropietarioForm } from './usePropietarioForm';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import styles from './PropietarioForm.module.css';

export const PropietarioForm = ({
  onSubmit,
  onCancel,
  initialData,
}: PropietarioFormProps) => {
  const { formData, handleChange, handleSubmit } = usePropietarioForm(
    onSubmit,
    initialData,
  );

  const isEditing = !!initialData;

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Editar Propietario' : 'Nuevo Propietario'}
    >
      <div className={styles.formGrid}>
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Maria"
          required
        />

        <Input
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Ej: Gonzalez Lopez"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ej: maria@email.com"
          required
        />

        <Input
          label="Teléfono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ej: 5551234567"
          required
        />

        <div className={styles.fullWidth}>
          <Input
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ej: Av. Reforma 123, CDMX"
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
