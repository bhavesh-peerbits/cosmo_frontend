import { atom, useRecoilState } from 'recoil';
import PopupNotification from '@model/common/CosmoNotification';
import { v4 as uuidv4 } from 'uuid';

type AtomNotification = PopupNotification & { id: string };
const notificationtListAtom = atom<AtomNotification[]>({
	key: 'notificationList',
	default: []
});

const useNotification = () => {
	const [notificationList, setNotificationList] = useRecoilState(notificationtListAtom);
	const showNotification = (notification: PopupNotification) => {
		const notificationId = uuidv4();
		setNotificationList(old => [...old, { ...notification, id: notificationId }]);
		setTimeout(
			() => {
				setNotificationList(old => old.filter(item => item.id !== notificationId));
			},
			notification.timeout === 'long' ? 10000 : 5000
		);
	};

	const deleteNotification = (id: string) => {
		setNotificationList(old => old.filter(item => item.id !== id));
	};

	return { showNotification, notificationList, deleteNotification };
};

export default useNotification;
