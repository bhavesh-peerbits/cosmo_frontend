declare module '@carbon/layout' {
	const breakpoints: {
		[key: string]: {
			width: string;
			columns: number;
		};
	};
	function rem(px: number): string;
}
