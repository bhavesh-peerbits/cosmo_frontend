import { ReactComponent as UnauthorizedImg } from '@images/unauthorized.svg';
import { Navigate, NavLink } from 'react-router-dom';
import HTTPError from '@components/HTTPError';
import { useTranslation } from 'react-i18next';
import useAuthStore from '@hooks/useAuthStore';

const Unauthorized = () => {
	const { auth } = useAuthStore();
	const { t } = useTranslation('httpError');
	if (auth.authenticated) {
		return <Navigate to='/home' replace />;
	}

	return (
		<HTTPError
			errorCode={t('errorCode401')}
			errorTitle={t('errorTitle401')}
			errorDescription={t('errorMessage401')}
			errorImage={<UnauthorizedImg className='bottom-0 h-full w-full' />}
			link={
				<NavLink to='/' replace>
					{t('goToLoginPage')}
				</NavLink>
			}
		/>
	);
};

export default Unauthorized;
