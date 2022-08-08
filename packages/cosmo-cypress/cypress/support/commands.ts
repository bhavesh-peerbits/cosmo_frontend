/// <reference types = "cypress" />
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			login(): Chainable<Element>;
		}
	}
}
export {};

Cypress.Commands.add('login', () => {
	cy.session('login', () => {
		const body = new FormData();
		body.append('user', 'test');
		body.append('password', 'test');
		body.append('tenant', 'cosmo');
		cy.request({
			method: 'POST',
			url: 'https://172.17.0.46/api/public/login',
			body,
			headers: {
				'content-type': 'multipart/form-data'
			}
		}).then(resp => {
			expect(resp.status).to.eq(200);
			const decoder = new TextDecoder().decode(resp.body);
			const respBody = JSON.parse(decoder);
			cy.setCookie('accessToken', respBody.accessToken);
			cy.setCookie('refreshToken', respBody.refreshToken);
		});
	});
});
