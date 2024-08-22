import { Link } from 'react-router-dom';
import Nav from '../Nav';

const Header = () => {
  return (
    <header className="w-full flex flex-col bg-white shadow-sm">
      <div className="w-full h-[70px] flex items-center">
        <div className="container flex items-center gap-6">
          <Link to="/">
            <img src="https://placehold.co/250x50" alt="" />
          </Link>

          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
