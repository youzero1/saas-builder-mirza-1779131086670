import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Listing } from '@/types';
import ListingCard from '@/components/listings/ListingCard';
import styles from '@/pages/PublicListingsPage.module.css';

type PublicListingsPageProps = {
  listings: Listing[];
};

export default function PublicListingsPage({ listings }: PublicListingsPageProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const activeListings = listings.filter(l => l.status === 'active');

  const categories = ['All', ...Array.from(new Set(activeListings.map(l => l.category)))];

  const filtered = activeListings.filter(l => {
    const matchCat = activeCategory === 'All' || l.category === activeCategory;
    const matchSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Product Listings</h1>
        <p className={styles.heroSub}>Browse our curated selection of quality products.</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <Package size={48} strokeWidth={1} className={styles.emptyIcon} />
          <p className={styles.emptyText}>No products found.</p>
          <p className={styles.emptySub}>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(l => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}

      <div className={styles.count}>
        Showing {filtered.length} of {activeListings.length} product{activeListings.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
