import { useRecoilValue } from 'recoil';
import policyStore from '@store/auth/policyStore';

const usePolicyStore = () => {
	const policies = useRecoilValue(policyStore);

	return {
		...policies
	};
};

export default usePolicyStore;
