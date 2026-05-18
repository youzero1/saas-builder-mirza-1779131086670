import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from '@/pages/AdminLoginPage.module.css';

type AdminLoginPageProps = {
  onLogin: (email: string, password: string) => boolean;
};

export default function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = onLogin(email, password);
      if (ok) {
        navigate('/admin');
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 400);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.iconWrap}>
            <Package size={28} strokeWidth={2} />
          </div>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.sub}>Sign in to manage your listings</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorBanner}>{error}</div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="admin@listinghub.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.passWrap}>
              <input
                className={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass(p => !p)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className={styles.hint}>
          Demo: <code>admin@listinghub.com</code> / <code>admin123</code>
        </p>
      </div>
    </div>
  );
}
