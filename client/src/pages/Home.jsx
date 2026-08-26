import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-center">
      <h1>🗺️ TripVault</h1>
      <p>Your personal travel memory journal.</p>
      <div className="home-actions">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button className="btn-secondary">Register</button>
        </Link>
      </div>
    </div>
  );
}
