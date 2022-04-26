import { Column } from '@carbon/react';
import { ComponentProps, FC } from 'react';

type ColumnProps = ComponentProps<typeof Column>;
type FullWidthColumnProps = ColumnProps & {
	children: React.ReactNode;
};

const FullWidthColumn: FC<FullWidthColumnProps> = ({ children, ...props }) => {
	return (
		<Column sm={4} md={8} lg={16} {...props}>
			{children}
		</Column>
	);
};

export default FullWidthColumn;
