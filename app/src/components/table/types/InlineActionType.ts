import { Row } from '@tanstack/react-table';
import { ReactNode } from 'react';

export interface InlineActions<T> {
	label: string;
	icon?: ReactNode;
	onClick: (row: Row<T>) => void;
}
