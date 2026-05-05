import type { InputProps } from './Input.types';
import styles from './Input.module.css';

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
