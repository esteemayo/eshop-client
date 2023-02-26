import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  return (
    <div>LoadingToRedirect</div>
  );
};

export default LoadingToRedirect;
