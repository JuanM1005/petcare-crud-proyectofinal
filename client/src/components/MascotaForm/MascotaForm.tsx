import type MascotaFormProps from './MascotaForm.types';
import { useMascotaForm } from './useMascotaForm';
import { Button } from '../Button/Button';
import styles from './MascotaForm.module.css';

export const MascotaForm = ({
  onSubmit,
  onCancel,
  initialData,
}: MascotaFormProps) => {
  const { formData, handleChange, handleSubmit } = useMascotaForm(
    onSubmit,
    initialData,
  );

  const isEditing = !!initialData; // Convierte initialData a booleano: true si existe (modo edición), false si no (modo creación)

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>
          {isEditing ? 'Editar Mascota' : 'Nueva Mascota'}
        </h3>

        <label className={styles.label}>
          Nombre
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Luna"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Especie
          <select
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Seleccionar...</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Ave">Ave</option>
            <option value="Reptil">Reptil</option>
            <option value="Otro">Otro</option>
          </select>
        </label>

        <label className={styles.label}>
          Raza
          <input
            type="text"
            name="raza"
            value={formData.raza}
            onChange={handleChange}
            placeholder="Ej: Golden Retriever"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Fecha de nacimiento
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Dueño
          <select
            name="dueno_id"
            value={formData.dueno_id}
            onChange={handleChange}
            className={styles.input}
          >
            <option value={0}>Seleccionar...</option>
            <option value={1}>Carlos Ramírez</option>
            <option value={2}>Ana López</option>
            <option value={3}>María Torres</option>
          </select>
        </label>

        <div className={styles.buttons}>
          <Button label="Cancelar" variant="cancel" onClick={onCancel} />
          <Button
            label={isEditing ? 'Actualizar' : 'Guardar'}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
