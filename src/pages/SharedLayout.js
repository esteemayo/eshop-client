import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Announcement from 'components/Announcement';

import 'react-toastify/dist/ReactToastify.css';

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
