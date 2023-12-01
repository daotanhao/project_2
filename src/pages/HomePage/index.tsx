import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate('/login');
  };
  return <div>This is HomePage</div>;
};

export default HomePage;
