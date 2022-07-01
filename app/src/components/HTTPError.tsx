import { Content, Stack } from '@carbon/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import removeLoadingScreen from '@hooks/removeLoadingScreen';

interface HTTPErrorProps {
	errorCode: string;
	errorTitle: string;
	errorDescription: string;
	errorImage: ReactNode;
	link: ReactNode;
}

const HTTPError = ({
	errorCode,
	errorTitle,
	errorDescription,
	errorImage,
	link
}: HTTPErrorProps) => {
	const { removeLoading } = removeLoadingScreen();
	const navigate = useNavigate();
	const { t } = useTranslation('httpError');

	useEffect(() => {
		removeLoading();
	}, [removeLoading]);

	return (
		<Content className='relative h-full w-full bg-background'>
			<div className='fixed top-1/2 left-1/2 -translate-y-3/4 -translate-x-1/2'>
				<p className='mb-2 text-productive-heading-2'>{errorCode}</p>
				<h1 className='mb-4 text-productive-heading-5'>{errorTitle}</h1>
				<p className='mb-6 text-body-short-1'>{errorDescription}</p>
				<Stack gap={5}>
					<>
						<NavLink
							onClick={() => {
								navigate(-1);
							}}
							to='#'
						>
							{t('goBack')}
						</NavLink>
						{link}
					</>
				</Stack>
			</div>
			{errorImage}
		</Content>
	);
};

export default HTTPError;
