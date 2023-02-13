export const toMap = <T extends { id: string }>(data: T[]) => {
	return new Map(data.map(item => [item.id, item]));
};

export default {};
