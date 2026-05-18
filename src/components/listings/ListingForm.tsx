import { useState } from 'react';
import { ListingFormData, Listing } from '@/types';
import Button from '@/components/ui/Button';
import styles from '@/components/listings/ListingForm.module.css';

const CATEGORIES = ['Electronics', 'Furniture', 'Kitchen', 'Sports', 'Clothing', 'Books', 'Other'];

type ListingFormProps = {
  initial?: Listing;
  onSubmit: (data: ListingFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ListingForm({ initial, onSubmit, onCancel, isLoading }: ListingFormProps) {
  const [form, setForm] = useState<ListingFormData>({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    price: initial ? String(initial.price) : '',
    category: initial?.category ?? CATEGORIES[0],
    status: initial?.status ?? 'active',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ListingFormData, string>>>({})

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ListingFormData, string>> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0) {
      newErrors.price = 'Enter a valid price.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  function handleChange(field: keyof ListingFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Title</label>
        <input
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          value={form.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value)}
          placeholder="Product title"
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          value={form.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('description', e.target.value)}
          placeholder="Product description"
          rows={3}
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Price ($)</label>
          <input
            className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('price', e.target.value)}
            placeholder="0.00"
          />
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={form.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('category', e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Status</label>
        <div className={styles.radioGroup}>
          {(['active', 'draft'] as const).map(s => (
            <label key={s} className={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value={s}
                checked={form.status === s}
                onChange={() => handleChange('status', s)}
              />
              <span className={form.status === s ? styles.radioTextActive : styles.radioText}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : initial ? 'Save Changes' : 'Create Listing'}
        </Button>
      </div>
    </form>
  );
}
