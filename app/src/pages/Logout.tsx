import { Navigate } from 'react-router-dom';
import useLogout from '@hooks/auth/useLogout';

const Logout = () => {
	const { logout } = useLogout();
	logout();
	return <Navigate replace to='/' />;
};

export default Logout;
