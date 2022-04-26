import { atom } from 'recoil';

const breadcrumbStore = atom({
	key: 'breadcrumbStore',
	default: 0
});

export default breadcrumbStore;
