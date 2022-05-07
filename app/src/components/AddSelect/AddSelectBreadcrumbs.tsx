import { Breadcrumb, BreadcrumbItem } from '@carbon/react';

const AddSelectBreadcrumbs = ({
	itemsLabel,
	path = [],
	setPath = () => {}
}: AddSelectBreadcrumbsProps) => {
	const clickHandler = (id: string) => {
		const pathIdx = path.findIndex(entry => entry.id === id);
		const finalPath = [...path].splice(0, pathIdx + 1);
		setPath(finalPath);
	};

	const resetPath = () => {
		setPath([]);
	};

	return (
		<Breadcrumb noTrailingSlash>
			<BreadcrumbItem className='cursor-pointer' onClick={resetPath}>
				{itemsLabel}
			</BreadcrumbItem>
			{path.map((entry, idx, arr) => {
				const isCurrentPage = idx === arr.length - 1;
				const crumbHandler = () => {
					if (!isCurrentPage) {
						clickHandler(entry.id);
					}
				};
				return (
					<BreadcrumbItem
						className='cursor-pointer'
						key={entry.id}
						isCurrentPage={isCurrentPage}
						onClick={crumbHandler}
					>
						{entry.title}
					</BreadcrumbItem>
				);
			})}
		</Breadcrumb>
	);
};

interface AddSelectBreadcrumbsProps {
	itemsLabel?: string;
	path: { id: string; title: string }[];
	setPath: (data: AddSelectBreadcrumbsProps['path']) => void;
}

export default AddSelectBreadcrumbs;
