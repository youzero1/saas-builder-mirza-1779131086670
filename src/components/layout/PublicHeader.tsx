import { Link } from 'react-router-dom';
import { Package, ShieldCheck } from 'lucide-react';
import styles from '@/components/layout/PublicHeader.module.css';

export default function PublicHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <Package size={24} strokeWidth={2} />
          <span>ListingHub</span>
        </Link>
        <Link to="/admin/login" className={styles.adminLink}>
          <ShieldCheck size={16} />
          <span>Admin</span>
        </Link>
      </div>
    </header>
  );
}
