import useAuthStore from '@hooks/useAuthStore';
import { Navigate } from 'react-router-dom';

const Logout = () => {
	const { logout } = useAuthStore();
	logout();
	return <Navigate replace to='/' />;
};

export default Logout;
