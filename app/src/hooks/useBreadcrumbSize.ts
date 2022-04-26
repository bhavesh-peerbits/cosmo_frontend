import { useRecoilState } from 'recoil';
import breadcrumbStore from '@store/ui/breadcrumbStore';

const useBreadcrumbSize = () => {
	const [breadcrumbSize, setBreadcrumbSize] = useRecoilState(breadcrumbStore);
	return {
		breadcrumbSize,
		setBreadcrumbSize
	};
};

export default useBreadcrumbSize;
