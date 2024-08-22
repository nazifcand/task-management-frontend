import { useNavigate, useOutlet } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useEffect } from 'react';
import { fetchMe } from '../services/authService';
import Header from '../components/Header';

const DefaultLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();

  useEffect(() => {
    (async () => {
      const { token } = localStorage;

      if (!user && !token) {
        return navigate('/login');
      }

      if (!user && token) {
        const [meError, me] = await fetchMe();

        if (meError) {
          localStorage.removeItem('token');
          return navigate('/login');
        }

        setUser(me);
      }
    })();
  }, [navigate, setUser, user]);

  return (
    user && (
      <main className="w-full min-h-full flex flex-col gap-6">
        <Header />
        {outlet}
      </main>
    )
  );
};

export default DefaultLayout;
