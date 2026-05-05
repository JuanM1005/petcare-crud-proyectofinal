import type { ServicioFormProps } from './ServicioForm.types';
import { useServicioForm } from './useServicioForm';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import styles from './ServicioForm.module.css';

export const ServicioForm = ({
  onSubmit,
  onCancel,
  initialData,
}: ServicioFormProps) => {
  const { formData, handleChange, handleSubmit } = useServicioForm(
    onSubmit,
    initialData,
  );

  const isEditing = !!initialData;

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}
    >
      <div className={styles.formGrid}>
        <div className={styles.fullWidth}>
          <Input
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Consulta general"
            required
          />
        </div>

        <div className={styles.fullWidth}>
          <Input
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción del servicio"
          />
        </div>

        <Input
          label="Precio base"
          type="number"
          name="precio_base"
          value={formData.precio_base}
          onChange={handleChange}
          placeholder="350.00"
          step="0.01"
          min="0"
          required
        />

        <Input
          label="Duración en minutos"
          type="number"
          name="duracion_minutos"
          value={
            formData.duracion_minutos === 0 ? '' : formData.duracion_minutos
          }
          onChange={handleChange}
          placeholder="30"
          min="1"
          required
        />
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
