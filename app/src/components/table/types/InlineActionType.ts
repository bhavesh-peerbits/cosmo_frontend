import { Row } from '@tanstack/react-table';
import { ReactNode } from 'react';

export interface InlineActions<T> {
	label?: string;
	conditionalLabel?: (row: Row<T>) => string;
	icon?: ReactNode;
	disabled?: (row: Row<T>) => boolean;
	isDelete?: (row: Row<T>) => boolean;
	onClick: (row: Row<T>) => void;
}
