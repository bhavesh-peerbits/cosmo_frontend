import { screen } from '@testing-library/react';
import renderWithProviders from '@test/testUtils';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { expect } from 'vitest';
import { useEffect, useState } from 'react';
import ApiError from '@api/ApiError';

const ErrComponent = () => {
	// eslint-disable-next-line no-console
	console.error = vi.fn();
	throw new Error('Test Boundary');
};

const ErrApiComponent = () => {
	const [error, setError] = useState<ApiError>();
	useEffect(() => {
		(async () => {
			const resp = await fetch('https://test-error.com/public/error');
			if (!resp.ok) {
				setError(new ApiError(resp.status, 'Test Error'));
			}
		})();
	}, []);
	useEffect(() => {
		if (error) {
			throw error;
		}
	}, [error]);
	return <div />;
};
describe('<ErrorBoundary />', () => {
	it('renders', async () => {
		renderWithProviders(
			<ErrorBoundary>
				<ErrComponent />
			</ErrorBoundary>,
			true
		);

		await expect(screen.findByText('Application error')).resolves.toBeInTheDocument();
	});

	it('render Api error', async () => {
		renderWithProviders(
			<ErrorBoundary>
				<ErrApiComponent />
			</ErrorBoundary>,
			true
		);
		await expect(screen.findByText('API Error')).resolves.toBeInTheDocument();
		await expect(screen.findByText('Code 400')).resolves.toBeInTheDocument();
		await expect(screen.findByText('Message: Test Error')).resolves.toBeInTheDocument();
	});
});
