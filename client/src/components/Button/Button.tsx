import type ButtonProps from './Button.types';
import styles from './Button.module.css';

/**
 * Componente genérico Button
 * Renderiza un botón estilizado según la variante seleccionada (primary, danger, cancel).
 * Utiliza CSS Modules para aislar y manejar sus estilos dinámicamente.
 */
export const Button = ({
  label,
  onClick,
  variant = 'primary', // Variante por defecto si no se proporciona una
  type = 'button', // Tipo por defecto para evitar envíos accidentales en formularios
}: ButtonProps) => {
  // Combina la clase base obligatoria con la clase dinámica de la variante.
  // Ejemplo: Si variant es 'danger', className será "base danger"
  const className = `${styles.base} ${styles[variant]}`;

  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};
