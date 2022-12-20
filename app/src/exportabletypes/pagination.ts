export type Sort = {
	field: string;
	direction?: 'asc' | 'des';
};

export type Pagination = {
	page: number;
	size: number;
	sort?: Sort[];
};

export type OpenApiPagination = Omit<Pagination, 'sort'> & {
	sort: string[];
	filter: Record<string, unknown | unknown[]>;
};
