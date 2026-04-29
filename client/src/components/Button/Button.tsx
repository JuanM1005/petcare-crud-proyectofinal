import type ButtonProps from './Button.types';
import styles from './Button.module.css';

export const Button = ({
  label,
  onClick,
  variant = 'primary',
  type = 'button',
}: ButtonProps) => {
  // Combina la clase base con la clase de la variante.
  // Si variant es 'danger', className será "base danger"
  const className = `${styles.base} ${styles[variant]}`;

  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};
