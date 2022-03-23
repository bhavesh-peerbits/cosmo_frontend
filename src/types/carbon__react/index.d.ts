import '@carbon/react';
import React from 'react';

declare module '@carbon/react' {
	const Theme: React.FC<{ theme: 'white' | 'g10' | 'g90' | 'g100'; className: string }>;
	const Layer: React.FC;
	const ActionableNotification: React.FC<{
		onActionButtonClick?: () => void;
		inline?: boolean;
		actionButtonLabel?: string;
		kind?: 'error' | 'info' | 'warning';
		className?: string;
	}>;
}
