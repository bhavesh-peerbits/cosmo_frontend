import { atom, useRecoilState } from 'recoil';

const toastListAtom = atom<string[]>({
	key: 'toastList',
	default: []
});

const useToast = () => {
	const [toastList, setToastList] = useRecoilState(toastListAtom);
	const show = (message: string) => {
		setToastList(old => [...old, message]);
	};

	return { show, toastList };
};

export default useToast;
