import { useUserStore } from '../stores/userStore';

const HomePage = () => {
  const { user } = useUserStore();
  return (
    <>
      <div className="container">DASHBOARD</div>
      <pre className="text-xs">
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </>
  );
};

export default HomePage;
