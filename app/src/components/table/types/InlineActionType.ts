import { ReactNode } from 'react';

export interface InlineActions {
	label: string;
	icon?: ReactNode;
	onClick: () => void;
}
