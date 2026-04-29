import { useState } from 'react';
import type MascotaFormProps from './MascotaForm.types';
import { Button } from '../Button/Button';
import styles from './MascotaForm.module.css';

export const MascotaForm = ({ onSubmit, onCancel }: MascotaFormProps) => {
  const [nombre, setNombre] = useState<string>('');

  const handleSubmit = () => {
    onSubmit({
      nombre,
      especie: '',
      raza: '',
      fecha_nacimiento: '',
      dueno_id: 0,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Nueva Mascota</h3>

        <label className={styles.label}>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Luna"
            className={styles.input}
          />
        </label>

        <div className={styles.buttons}>
          <Button label="Cancelar" variant="cancel" onClick={onCancel} />
          <Button label="Guardar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
