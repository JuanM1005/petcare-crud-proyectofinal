import { useState } from 'react';
import mascotasMock from './mockData';
import type MascotaConDueno from './MascotasPage.types';
import { Button } from '../../components';
import styles from './MascotasPage.module.css';

export const MascotasPage = () => {
  // useState guarda la lista de mascotas en memoria.
  // Inicializamos con los datos mock por ahora.
  const [mascotas, setMascotas] = useState<MascotaConDueno[]>(mascotasMock);

  // Función para eliminar una mascota del estado
  const handleDelete = (id: number) => {
    // Muestra un cuadro de confirmación antes de eliminar
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar esta mascota?',
    );

    if (confirmado) {
      // filter recorre el arreglo y devuelve uno nuevo
      // conservando solo las mascotas cuyo id es diferente
      // al id que queremos eliminar
      setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mascotas</h2>
        <button className={styles.addButton}>+ Nueva Mascota</button>
      </div>

      {/* La "R" de CRUD — Read */}
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
                  <Button label="Editar" onClick={() => {}} />
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
    </div>
  );
};
