import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  return !user ? <LoadingToRedirect /> : children;
};

export default AuthRoute;
