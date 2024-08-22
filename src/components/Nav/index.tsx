import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

const ROUTES = [
  {
    to: '/organizations',
    title: 'Firmalar',
  },
];

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-2">
      {ROUTES.map((route, index) => (
        <Link
          key={index}
          to={route.to}
          className={cn(
            'px-4 py-2 text-sm',
            'bg-slate-100 hover:bg-slate-200',
            {
              '!bg-sky-100 !text-sky-600 hover:!bg-sky-200/75':
                pathname.startsWith(route.to),
            }
          )}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
