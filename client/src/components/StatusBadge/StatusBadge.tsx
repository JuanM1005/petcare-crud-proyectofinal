import type { StatusBadgeProps } from './StatusBadge.types';
import styles from './StatusBadge.module.css';

const knownStatuses = ['programada', 'completada', 'cancelada'] as const;

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const normalized = (status || '').toLowerCase();
  const variantClass = (knownStatuses as readonly string[]).includes(normalized)
    ? styles[normalized as (typeof knownStatuses)[number]]
    : '';
  return <span className={`${styles.badge} ${variantClass}`}>{status}</span>;
};
