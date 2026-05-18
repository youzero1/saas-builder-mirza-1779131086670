import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Package, TrendingUp, Tag, AlertCircle } from 'lucide-react';
import { Listing, ListingFormData } from '@/types';
import AdminListingRow from '@/components/listings/AdminListingRow';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import styles from '@/pages/AdminDashboardPage.module.css';

type AdminDashboardPageProps = {
  listings: Listing[];
  deleteListing: (id: string) => void;
  addListing: (data: ListingFormData) => Listing;
};

export default function AdminDashboardPage({ listings, deleteListing }: AdminDashboardPageProps) {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const active = listings.filter(l => l.status === 'active');
  const drafts = listings.filter(l => l.status === 'draft');
  const totalValue = active.reduce((sum, l) => sum + l.price, 0);
  const categories = new Set(listings.map(l => l.category)).size;

  const filtered = listings.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.category.toLowerCase().includes(search.toLowerCase())
  );

  function confirmDelete() {
    if (deleteTarget) {
      deleteListing(deleteTarget);
      setDeleteTarget(null);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Listings</h1>
          <p className={styles.pageSub}>Manage your product listings</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/admin/listings/new')}>
          <PlusCircle size={16} />
          New Listing
        </Button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)' }}>
            <Package size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{listings.length}</p>
            <p className={styles.statLabel}>Total Listings</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{active.length}</p>
            <p className={styles.statLabel}>Active</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
            <AlertCircle size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{drafts.length}</p>
            <p className={styles.statLabel}>Drafts</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)' }}>
            <Tag size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{categories}</p>
            <p className={styles.statLabel}>Categories</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All Listings</h2>
          <input
            className={styles.tableSearch}
            placeholder="Search listings..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <th className={styles.th}>Product</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Updated</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>
                    No listings found.
                  </td>
                </tr>
              ) : (
                filtered.map(l => (
                  <AdminListingRow
                    key={l.id}
                    listing={l}
                    onDelete={(id) => setDeleteTarget(id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFoot}>
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''} &middot; Total active value: <strong>{formatPrice(totalValue)}</strong>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Delete Listing"
      >
        <div className={styles.modalBody}>
          <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
