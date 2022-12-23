import { CellContext } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

const CellLink = ({ getValue }: CellContext<any, unknown>) => {
	const value = getValue() as { name?: string; id?: string };
	if (value.id) {
		return <Link to={`/started-evidence-request/${value.id}`}>{value.name}</Link>;
	}
	return <span>{value.name}</span>;
};
export default CellLink;
