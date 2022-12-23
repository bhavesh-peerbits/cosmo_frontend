import IconResolver from '@components/IconResolver';
import { CellContext } from '@tanstack/react-table';

const IconCell = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as {
		content: string | undefined;
		icon: 'mobile' | 'web' | 'virtual';
	};
	return (
		<div className='flex items-center space-x-3'>
			<div>
				<IconResolver icon={value.icon} />
			</div>
			<p>{value.content ?? '-'}</p>
		</div>
	);
};
export default IconCell;
