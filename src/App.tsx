import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { getAuth, setAuth } from '@/lib/storage';
import { useListings } from '@/hooks/useListings';
import PublicLayout from '@/components/layout/PublicLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import PublicListingsPage from '@/pages/PublicListingsPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminListingFormPage from '@/pages/AdminListingFormPage';

const ADMIN_EMAIL = 'admin@listinghub.com';
const ADMIN_PASSWORD = 'admin123';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAuth());
  const listingsApi = useListings();

  const login = useCallback((email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuth(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback((): void => {
    setAuth(false);
    setIsAuthenticated(false);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicListingsPage listings={listingsApi.listings} />} />
        </Route>

        {/* Admin Auth */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated
              ? <Navigate to="/admin" replace />
              : <AdminLoginPage onLogin={login} />
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated
              ? <AdminLayout onLogout={logout} />
              : <Navigate to="/admin/login" replace />
          }
        >
          <Route index element={<AdminDashboardPage {...listingsApi} />} />
          <Route
            path="listings/new"
            element={<AdminListingFormPage mode="create" onSubmit={listingsApi.addListing} />}
          />
          <Route
            path="listings/:id/edit"
            element={
              <AdminListingFormPage
                mode="edit"
                onSubmit={(_data) => {}}
                onUpdate={listingsApi.updateListing}
                getListingById={listingsApi.getListingById}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
