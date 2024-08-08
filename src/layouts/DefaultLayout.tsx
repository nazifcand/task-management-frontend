import { useNavigate, useOutlet } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useEffect } from 'react';

const DefaultLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div>
      DefaultLayout
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      {outlet}
    </div>
  );
};

export default DefaultLayout;
