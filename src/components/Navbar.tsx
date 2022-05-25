import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
  return (
    <div className="my-3 ml-20">
      <nav>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="about">About</Link>
      </nav>
    </div>
  );
};

export default Navbar;
