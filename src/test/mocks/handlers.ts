import { rest } from 'msw';
import example from '@test/mocks/data/example.json';

const handlers = [
	rest.get('https://test-api.com/2', (_, response, context) =>
		response(context.json(example))
	)
];

export default handlers;
