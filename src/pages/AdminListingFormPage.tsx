import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Listing, ListingFormData } from '@/types';
import ListingForm from '@/components/listings/ListingForm';
import Button from '@/components/ui/Button';
import styles from '@/pages/AdminListingFormPage.module.css';

type AdminListingFormPageProps =
  | {
      mode: 'create';
      onSubmit: (data: ListingFormData) => Listing;
      onUpdate?: never;
      getListingById?: never;
    }
  | {
      mode: 'edit';
      onSubmit: (data: ListingFormData) => void;
      onUpdate: (id: string, data: ListingFormData) => void;
      getListingById: (id: string) => Listing | undefined;
    };

export default function AdminListingFormPage(props: AdminListingFormPageProps) {
  const { mode, onSubmit, onUpdate, getListingById } = props;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const existing = mode === 'edit' && id && getListingById ? getListingById(id) : undefined;

  function handleSubmit(data: ListingFormData) {
    if (mode === 'edit' && id && onUpdate) {
      onUpdate(id, data);
    } else {
      onSubmit(data);
    }
    navigate('/admin');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft size={16} />
          Back
        </Button>
        <div>
          <h1 className={styles.title}>
            {mode === 'create' ? 'New Listing' : 'Edit Listing'}
          </h1>
          <p className={styles.sub}>
            {mode === 'create' ? 'Add a new product to your catalog.' : 'Update the product details.'}
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <ListingForm
          initial={existing}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
        />
      </div>
    </div>
  );
}
