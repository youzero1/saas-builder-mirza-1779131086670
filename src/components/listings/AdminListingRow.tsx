import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Listing } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import styles from '@/components/listings/AdminListingRow.module.css';

type AdminListingRowProps = {
  listing: Listing;
  onDelete: (id: string) => void;
};

export default function AdminListingRow({ listing, onDelete }: AdminListingRowProps) {
  const navigate = useNavigate();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>
        <div className={styles.titleCell}>
          <span className={styles.title}>{listing.title}</span>
          <span className={styles.category}>{listing.category}</span>
        </div>
      </td>
      <td className={styles.td}>
        <span className={styles.desc}>{listing.description}</span>
      </td>
      <td className={styles.td}>
        <span className={styles.price}>{formatPrice(listing.price)}</span>
      </td>
      <td className={styles.td}>
        <Badge variant={listing.status === 'active' ? 'success' : 'warning'}>
          {listing.status}
        </Badge>
      </td>
      <td className={styles.td}>
        <span className={styles.date}>{formatDate(listing.updatedAt)}</span>
      </td>
      <td className={styles.td}>
        <div className={styles.actions}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/admin/listings/${listing.id}/edit`)}
          >
            <Pencil size={14} />
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(listing.id)}
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
