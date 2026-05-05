import type { SelectProps } from './Select.types';
import styles from './Select.module.css';

export const Select = ({
  label,
  options,
  error,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <select
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        {...props}
      >
        <option value="" disabled>
          Seleccionar...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
