import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/Navbar';
import Announcement from 'components/Announcement';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import DarkMode from 'components/DarkMode';

import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <ToastContainer style={{ fontSize: '1.4rem' }} />
      <DarkMode />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
