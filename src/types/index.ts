export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'active' | 'draft';
  createdAt: string;
  updatedAt: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  role: 'admin' | null;
};

export type ListingFormData = {
  title: string;
  description: string;
  price: string;
  category: string;
  status: 'active' | 'draft';
};
