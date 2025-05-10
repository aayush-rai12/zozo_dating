import './BottomNav.css';

const BottomNav = ({ darkMode }) => {
  return (
    <nav className={`bottom-nav ${darkMode ? 'dark' : ''}`}>
      <a href="#" className="nav-item active">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </a>
      <a href="#" className="nav-item">
        <i className="fas fa-comment-dots"></i>
        <span>Messages</span>
        <span className="nav-notification">3</span>
      </a>
      <a href="#" className="nav-item">
        <i className="fas fa-heart"></i>
        <span>Matches</span>
      </a>
      <a href="#" className="nav-item">
        <i className="fas fa-user"></i>
        <span>Profile</span>
      </a>
    </nav>
  );
};

export default BottomNav;