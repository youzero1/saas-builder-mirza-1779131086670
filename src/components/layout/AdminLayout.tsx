import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Package, LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';
import styles from '@/components/layout/AdminLayout.module.css';

type AdminLayoutProps = {
  onLogout: () => void;
};

export default function AdminLayout({ onLogout }: AdminLayoutProps) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/admin/login');
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <Package size={22} strokeWidth={2} />
            <span>ListingHub</span>
          </div>
          <nav className={styles.nav}>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/listings/new"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <PlusCircle size={18} />
              New Listing
            </NavLink>
          </nav>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}
