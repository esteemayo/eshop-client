import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import LoadingToRedirect from './LoadingToRedirect';

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  return !user ? <Navigate to='/login' replace state={{ from: location }} /> : children;
};

export default AuthRoute;
