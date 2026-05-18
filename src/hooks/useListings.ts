import { useState, useCallback } from 'react';
import { Listing, ListingFormData } from '@/types';
import { getListings, saveListings } from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function useListings() {
  const [listings, setListings] = useState<Listing[]>(() => getListings());

  const addListing = useCallback((data: ListingFormData): Listing => {
    const now = new Date().toISOString();
    const newListing: Listing = {
      id: generateId(),
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    };
    setListings(prev => {
      const updated = [newListing, ...prev];
      saveListings(updated);
      return updated;
    });
    return newListing;
  }, []);

  const updateListing = useCallback((id: string, data: ListingFormData): void => {
    setListings(prev => {
      const updated = prev.map(l =>
        l.id === id
          ? { ...l, ...data, price: parseFloat(data.price), updatedAt: new Date().toISOString() }
          : l
      );
      saveListings(updated);
      return updated;
    });
  }, []);

  const deleteListing = useCallback((id: string): void => {
    setListings(prev => {
      const updated = prev.filter(l => l.id !== id);
      saveListings(updated);
      return updated;
    });
  }, []);

  const getListingById = useCallback((id: string): Listing | undefined => {
    return listings.find(l => l.id === id);
  }, [listings]);

  return { listings, addListing, updateListing, deleteListing, getListingById };
}
