import { useOutlet } from 'react-router-dom';

const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <div className="w-full h-full flex items-center justify-center">
      {outlet}
    </div>
  );
};

export default AuthLayout;
