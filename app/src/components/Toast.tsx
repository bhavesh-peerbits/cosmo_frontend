import useUiStore from '@hooks/useUiStore';
import { Theme, ToastNotification } from '@carbon/react';
import Fade from '@components/Fade';
import { createPortal } from 'react-dom';
import useToast from '@hooks/useToast';

const Toast = () => {
	const { toastList } = useToast();
	const { theme } = useUiStore();
	return createPortal(
		<Theme theme={theme}>
			<div className='absolute bottom-5 z-[9999] flex w-full flex-col items-center justify-center space-y-4'>
				{toastList.map(toast => (
					<Fade>
						<ToastNotification
							kind='success'
							className='text-left'
							hideCloseButton
							title='Are you sure you want to delete this app?'
							subtitle={toast}
						/>
					</Fade>
				))}
			</div>
		</Theme>,
		document.body
	);
};

export default Toast;
