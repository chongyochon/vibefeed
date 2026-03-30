import { NavLink } from 'react-router-dom';
import { Home, PlusSquare, User } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home className="nav-icon" />
        <span>Feed</span>
      </NavLink>
      <NavLink to="/write" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <PlusSquare className="nav-icon" />
        <span>Write</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User className="nav-icon" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
