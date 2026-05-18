import { Outlet } from 'react-router-dom';
import PublicHeader from '@/components/layout/PublicHeader';
import styles from '@/components/layout/PublicLayout.module.css';

export default function PublicLayout() {
  return (
    <div className={styles.wrapper}>
      <PublicHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} ListingHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
