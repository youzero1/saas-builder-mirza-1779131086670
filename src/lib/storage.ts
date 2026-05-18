import { Listing } from '@/types';

const LISTINGS_KEY = 'listinghub_listings';
const AUTH_KEY = 'listinghub_auth';

const SEED_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation. 30-hour battery life and premium build quality.',
    price: 199.99,
    category: 'Electronics',
    status: 'active',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '2',
    title: 'Ergonomic Office Chair',
    description: 'Lumbar support, adjustable armrests, and breathable mesh back. Designed for long work sessions.',
    price: 349.00,
    category: 'Furniture',
    status: 'active',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-12T09:00:00Z',
  },
  {
    id: '3',
    title: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated, keeps drinks cold 24h and hot 12h. BPA-free and dishwasher safe.',
    price: 29.95,
    category: 'Kitchen',
    status: 'active',
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z',
  },
  {
    id: '4',
    title: 'Standing Desk Converter',
    description: 'Convert any desk into a sit-stand workstation. Supports dual monitors and keyboard tray.',
    price: 249.00,
    category: 'Furniture',
    status: 'draft',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: '5',
    title: 'Mechanical Keyboard',
    description: 'Tactile brown switches, RGB backlight, and compact TKL layout. USB-C connection.',
    price: 119.99,
    category: 'Electronics',
    status: 'active',
    createdAt: '2024-01-16T12:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z',
  },
  {
    id: '6',
    title: 'Yoga Mat Premium',
    description: 'Non-slip surface, 6mm cushioning, eco-friendly TPE material. Includes carry strap.',
    price: 45.00,
    category: 'Sports',
    status: 'active',
    createdAt: '2024-01-17T13:00:00Z',
    updatedAt: '2024-01-17T13:00:00Z',
  },
];

export function getListings(): Listing[] {
  const raw = localStorage.getItem(LISTINGS_KEY);
  if (!raw) {
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(SEED_LISTINGS));
    return SEED_LISTINGS;
  }
  return JSON.parse(raw) as Listing[];
}

export function saveListings(listings: Listing[]): void {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

export function getAuth(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuth(value: boolean): void {
  localStorage.setItem(AUTH_KEY, String(value));
}
