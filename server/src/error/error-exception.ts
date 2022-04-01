import ErrorCode from '@/error/error-code';

export class ErrorException extends Error {
	public status: number;

	public metaData: unknown;

	constructor(code: ErrorCode = 'UnknownError', metaData: unknown = null) {
		super(code);
		this.name = code;
		this.status = 500;
		this.metaData = metaData;
		switch (code) {
			case 'InvalidArgument':
				this.status = 400;
				break;
			case 'Unauthenticated':
				this.status = 401;
				break;
			case 'Unauthorized':
				this.status = 403;
				break;
			case 'NotFound':
				this.status = 404;
				break;

			default:
				this.status = 500;
				break;
		}
	}
}
