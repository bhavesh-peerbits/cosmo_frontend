import { ActionableNotification, Theme, ToastNotification } from '@carbon/react';
import Fade from '@components/Fade';
import { createPortal } from 'react-dom';
import useNotification from '@hooks/useNotification';

const PopupNotification = () => {
	const { notificationList, deleteNotification } = useNotification();

	return createPortal(
		<Theme theme='white'>
			<div className='absolute top-0 flex w-full place-content-end pt-3 pr-3'>
				<div className='z-[9999] flex flex-col items-stretch justify-items-stretch space-y-3'>
					{notificationList.map(notification => (
						<Fade key={notification.id}>
							{notification.action ? (
								<ActionableNotification
									className='flex-col'
									kind={notification.type}
									title={notification.title}
									subtitle={notification.message}
									actionButtonLabel={notification.action.label}
									lowContrast
									onCloseButtonClick={() => deleteNotification(notification.id)}
									onActionButtonClick={() => {
										notification.action?.onClick();
										deleteNotification(notification.id);
									}}
								/>
							) : (
								<ToastNotification
									kind={notification.type}
									title={notification.title}
									subtitle={notification.message}
									onCloseButtonClick={() => deleteNotification(notification.id)}
									lowContrast
								/>
							)}
						</Fade>
					))}
				</div>
			</div>
		</Theme>,
		document.getElementById('main') || document.body
	);
};

export default PopupNotification;
