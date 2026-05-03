import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const PublicLayout = () => (
  <div className="layout">
    <Navbar />
    <main className="layout__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
