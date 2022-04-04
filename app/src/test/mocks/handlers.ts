import { rest } from 'msw';
import example from '@test/mocks/data/example.json';

const handlers = [
	rest.get('https://gorest.co.in/public/v2/posts', (_, response, context) =>
		response(context.json(example))
	),

	rest.get('https://test-error.com/public/error', (_, response, ctx) =>
		response(ctx.status(400, 'Test Error'))
	)
];

export default handlers;
