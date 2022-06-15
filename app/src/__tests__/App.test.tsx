import App from 'App';
import renderWithProviders from '@test/testUtils';

describe('<App />', () => {
	it('renders', async () => {
		window.history.pushState({}, 'Home', '/');
		renderWithProviders(<App />, true);


		// expect(screen.getByText('Loading...')).toBeInTheDocument();
		// await expect(screen.findByText('Apple')).resolves.toBeInTheDocument();
		// userEvent.click(screen.getByText('Apple'));

		// expect(screen.getByText('Loading...')).toBeInTheDocument();
		// await expect(
		// 	screen.findByText('Vitamins per 100 g (3.5 oz)')
		// ).resolves.toBeInTheDocument();
	});
});
