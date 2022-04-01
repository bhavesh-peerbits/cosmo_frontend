import request from 'supertest';
import startExpress from '../start-express';

const app = startExpress({});
describe('Test Endpoint', () => {
	it('Request / should return Dev Mode', async () => {
		const result = await request(app).get('/ping').send();

		expect(result.status).toBe(200);
		expect(result.text).toBe('<h1>Dev Mode</h1>');
	});
});
