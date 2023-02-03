import IconResolver from '@components/IconResolver';
import { CellContext } from '@tanstack/react-table';

const IconCell = ({ getValue, row }: CellContext<any, unknown>) => {
	const value = getValue() as string;
	const { icon } = row.original;
	return (
		<div className='flex items-center space-x-3'>
			<div>{icon && <IconResolver icon={icon} />}</div>
			<p>{value ?? '-'}</p>
		</div>
	);
};
export default IconCell;
