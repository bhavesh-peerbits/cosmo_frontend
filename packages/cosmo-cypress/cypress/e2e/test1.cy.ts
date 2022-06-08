// eslint-disable-next-line @typescript-eslint/no-unused-vars
function get(testId: string) {
	return cy.findByTestId(testId);
}

describe('Basic flow', () => {
	// beforeEach(() => {
	// 	cy.viewport('macbook-13');
	// });

	it('Should render the fruit gallery correctly', () => {
		cy.visit('/');

		// get('title').invoke('text').should('have.length.gt', 2);
	});

	// EXAMPLES
	// it('Should navigate to the details page on click', () => {
	// 	cy.findAllByTestId('FruitCardName').first().click();
	// 	cy.location('pathname').should('eq', `/apple`);
	// });

	// it('Should render a error message', () => {
	// 	cy.viewport('iphone-xr');
	// 	cy.intercept('/fruits', request => request.destroy()).as('getFruits');
	// 	cy.reload();
	// 	cy.wait('@getFruits');
	// 	get('LoadingOrError').should('not.have.text', 'Loading');
	// });

	// it('Should redirect to gallery when trying to access a invalid fruit', () => {
	// 	cy.visit('/cypress');
	// 	cy.location('pathname').should('eq', '/');
	// });
});
