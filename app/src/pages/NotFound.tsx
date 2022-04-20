import { ReactComponent as UnauthorizedImg } from '@images/unauthorized.svg';
import { NavLink } from 'react-router-dom';
import HTTPError from '@components/HTTPError';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
	const { t } = useTranslation('httpError');

	return (
		<HTTPError
			errorCode={t('errorCode404')}
			errorTitle={t('errorTitle404')}
			errorDescription={t('errorMessage404')}
			errorImage={<UnauthorizedImg className='bottom-0 h-full w-full' />}
			link={
				<NavLink to='/home' replace>
					{t('goToHomePage')}
				</NavLink>
			}
		/>
	);
};

export default NotFound;
