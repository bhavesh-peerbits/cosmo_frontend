import { rest } from 'msw';
import example from '@test/mocks/data/example.json';

const handlers = [
	rest.get('https://gorest.co.in/public/v2/posts', (_, response, context) =>
		response(context.json(example))
	)
];

export default handlers;
