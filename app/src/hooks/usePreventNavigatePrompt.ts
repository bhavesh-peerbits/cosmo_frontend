import preventActionModalStore from '@store/ui/preventActionModalStore';
import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function useConfirmExit(message: string, when = true) {
	const { navigator } = useContext(NavigationContext);
	const [preventActionProp, setPreventActionProp] = useRecoilState(
		preventActionModalStore
	);
	useEffect(() => {
		if (!when) {
			return;
		}
		const { push } = navigator;
		if (!preventActionProp.isOpen) {
			navigator.push = (...args: Parameters<typeof push>) => {
				setPreventActionProp(old => ({
					...old,
					message,
					isOpen: true,
					onSuccess: () => {
						push(...args);
					}
				}));
			};
		}
		// eslint-disable-next-line consistent-return
		return () => {
			navigator.push = push;
		};
	}, [navigator, when, preventActionProp, setPreventActionProp, message]);
}

const usePrompt = (message: string, when = true) => {
	useEffect(() => {
		if (when) {
			window.onbeforeunload = () => {
				return message;
			};
		}

		return () => {
			window.onbeforeunload = null;
		};
	}, [message, when]);

	useConfirmExit(message, when);
};

export default usePrompt;
