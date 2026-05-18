import { Package, Tag, Calendar } from 'lucide-react';
import { Listing } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import styles from '@/components/listings/ListingCard.module.css';

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Package size={28} strokeWidth={1.5} />
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.title}>{listing.title}</h3>
          <span className={styles.price}>{formatPrice(listing.price)}</span>
        </div>
        <p className={styles.description}>{listing.description}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Tag size={13} />
            {listing.category}
          </span>
          <span className={styles.metaItem}>
            <Calendar size={13} />
            {formatDate(listing.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
