import { useState } from 'react';
import mascotasMock from './mockData';
import type MascotaConDueno from './MascotasPage.types';
import type { MascotaFormData } from '../../components/MascotaForm/MascotaForm.types';
import { Button, MascotaForm } from '../../components';
import styles from './MascotasPage.module.css';

export const MascotasPage = () => {
  const [mascotas, setMascotas] = useState<MascotaConDueno[]>(mascotasMock);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar esta mascota?',
    );

    if (confirmado) {
      setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    }
  };

  const handleCreate = (data: MascotaFormData) => {
    const nuevaMascota: MascotaConDueno = {
      ...data,
      id: Date.now(),
      dueno_id: Number(data.dueno_id),
      dueno_nombre: 'Dueño temporal',
    };

    setMascotas([...mascotas, nuevaMascota]);
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mascotas</h2>
        <Button label="+ Nueva Mascota" onClick={() => setShowForm(true)} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Nacimiento</th>
            <th>Dueño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.id}>
              <td>{mascota.nombre}</td>
              <td>{mascota.especie}</td>
              <td>{mascota.raza}</td>
              <td>{mascota.fecha_nacimiento}</td>
              <td>{mascota.dueno_nombre}</td>
              <td>
                <div className={styles.actions}>
                  <Button label="Editar" onClick={() => { }} />
                  <Button
                    label="Eliminar"
                    variant="danger"
                    onClick={() => handleDelete(mascota.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <MascotaForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};