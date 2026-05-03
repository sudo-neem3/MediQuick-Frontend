import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <MdErrorOutline className="not-found__icon" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn--primary">Back to Home</Link>
    </div>
  );
};

export default NotFound;
