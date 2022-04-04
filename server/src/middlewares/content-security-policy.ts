import helmet from 'helmet';

const contentSecurityPolicy = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
			styleSrc: ["'self'", "'unsafe-inline'"],
			imgSrc: ['*', 'data:', 'blob:'],
			frameSrc: ['*'],
			connectSrc: ['*']
		}
	}
});

export default contentSecurityPolicy;
