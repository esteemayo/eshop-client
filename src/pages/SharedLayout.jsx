import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/Navbar';
import Announcement from 'components/Announcement';
import Footer from 'components/Footer';

import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'components/ScrollToTop';

const SharedLayout = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <ToastContainer style={{ fontSize: '1.4rem' }} />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
