import { CellContext } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

interface CellLinkProps {
	info: CellContext<any, unknown>;
	preUrl?: string;
}

const CellLink = ({ info, preUrl }: CellLinkProps) => {
	const value = info.getValue() as string;
	const { id } = info.row.original;
	if (id) {
		return <Link to={`${preUrl}/${id}`}>{value}</Link>;
	}
	return <span>{value}</span>;
};
export default CellLink;
