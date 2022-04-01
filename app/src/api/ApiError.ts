export default class ApiError extends Error {
	constructor(readonly status: number, message: string) {
		super(message);
	}
}
