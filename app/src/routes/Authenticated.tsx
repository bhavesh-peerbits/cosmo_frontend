import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import useLoginStore from '@hooks/auth/useLoginStore';
import useLogout from '@hooks/auth/useLogout';
import removeLoadingScreen from '@hooks/removeLoadingScreen';

type AuthenticatedProps = {
	children: ReactNode;
};

const Authenticated = ({ children }: AuthenticatedProps) => {
	const { auth } = useLoginStore();
	const { logout } = useLogout();
	const { removeLoading } = removeLoadingScreen();

	if (auth.authenticated) {
		removeLoading();
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}

	logout(true);
	return <Navigate replace to='/?error=authentication-needed' />;
};

export default Authenticated;
