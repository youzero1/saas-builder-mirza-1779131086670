import { clsx } from 'clsx';
import styles from '@/components/ui/Badge.module.css';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'default';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant])}>
      {children}
    </span>
  );
}
