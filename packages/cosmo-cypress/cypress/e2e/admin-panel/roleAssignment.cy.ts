/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/require-data-selectors */
/* eslint-disable cypress/no-force */

describe('Role Assignment', () => {
	beforeEach(() => {
		cy.viewport('macbook-13');
		cy.login();
		cy.visit('/admin/role-assignment');
		cy.contains('Items per page')
			.parent()
			.children()
			.eq(1)
			.find('.cds--select-input')
			.select('50');
	});

	const name = 'prova';
	const surname = 'prova';
	const email = 'prova@email.com';
	const username = 'prova';

	it('Should render the Add User modal correctly', () => {
		cy.contains('Add').click({ force: true });
		cy.get('#user-name').should('be.visible');
		cy.findAllByTitle('Close').click();
		cy.get('#user-name').should('not.be.visible');
	});

	//  it('Should create new user correctly', () => {
	//   cy.contains('Add').click({force: true})
	//   .get('#user-name').type((name)).should('have.value',name)
	//   .get('#user-surname').type(surname).should('have.value',surname)
	//   .get('#username').type(username).should('have.value',username)
	//   .get('#email').type(email).should('have.value',email)
	//   .get('#USER_UNKNOWN').check({force: true})
	//   .get('form').submit()
	//   .get('#user-name')
	//   .should('not.be.visible')
	// })

	it('Should not allow to enter existing username or email', () => {
		cy.contains('Add').click({ force: true });
		cy.get('#user-name').should('be.visible');
		cy.get('#user-name')
			.type(name)
			.should('have.value', name)
			.get('#user-surname')
			.type(surname)
			.should('have.value', surname)
			.get('#username')
			.type(username)
			.should('have.value', username)
			.get('#email')
			.type(email)
			.should('have.value', email)
			.get('#USER_UNKNOWN')
			.check({ force: true });
		cy.contains('Email already exists');
		cy.get("[type='submit']").should('be.disabled');
		cy.contains('Cancel').click();
	});

	it('Should apply filters on users correctly', () => {
		cy.get('button[type=button]')
			.get('.cds--accordion__heading')
			.parent()
			.children()
			.eq(3)
			.children()
			.its('length')
			.then(lenght => {
				if (lenght > 1) {
					cy.get('button[type=button]')
						.get('.cds--accordion__heading')
						.parent()
						.children()
						.eq(3)
						.children()
						.eq(0)
						.children()
						.eq(0)
						.check({ force: true });
					cy.get('button[type=button]')
						.get('.cds--accordion__heading')
						.parent()
						.children()
						.eq(3)
						.children()
						.eq(1)
						.invoke('text')
						.then(role =>
							cy
								.get('tbody')
								.should('not.contain', role)
								.get('button[type=button]')
								.get('.cds--accordion__heading')
								.parent()
								.children()
								.eq(3)
								.children()
								.eq(0)
								.children()
								.eq(0)
								.uncheck({ force: true })
						);
				}
			});
	});

	it('Should active user correctly', () => {
		// Get status of user
		cy.get('tbody')
			.contains(email)
			.closest('tr')
			.find('td')
			.eq(5)
			.invoke('text')
			.then(s => {
				const status = s;
				cy.get('tbody')
					.contains(email)
					.closest('tr')
					.find('td')
					// Click to open Actions
					.eq(6)
					.click()
					.then(() => {
						if (status !== 'Active') {
							// Open modal to unblock user
							cy.contains('Unblock user')
								.click()
								.then(() =>
									cy
										.get('button[type=button]')
										.contains('Unblock')
										.click({ force: true })
										.intercept('GET', 'https://172.17.0.46:3000/api/users')
										.as('useGetUsers')
										// Check if user is active in data table
										.then(() =>
											cy
												.wait('@useGetUsers')
												.its('response.statusCode')
												.should('equal', 200)
												.get('tbody')
												.contains(email)
												.closest('tr')
												.find('td')
												.eq(5)
												.contains('Active')
										)
								);
						}
					});
			});
	});

	it('Should edit user roles correctly', () => {
		// Open edit modal
		cy.get('tbody')
			.contains(email)
			.closest('tr')
			.find('td')
			.eq(5)
			.invoke('text')
			.then(text => {
				if (text === 'Active') {
					cy.get('tbody')
						.contains(email)
						.closest('tr')
						.find('td')
						.eq(6)
						.click()
						.then(() =>
							cy
								.contains('Edit')
								.click({ force: true })
								.then(() =>
									cy
										.get('input[id="SYS_ADMIN-edit"]')
										.invoke('is', ':checked')
										.then(checked => {
											// Uncheck 'System Admin'
											if (checked) {
												cy.get('input[id="SYS_ADMIN-edit"]')
													.uncheck({ force: true })
													.then(() =>
														cy
															.get('button[type=button]')
															.contains('Edit')
															.click({ force: true })
															.intercept('GET', 'https://172.17.0.46:3000/api/users')
															.as('useGetUsers')
													);
												cy.wait('@useGetUsers')
													.its('response.statusCode')
													.should('equal', 200);
												// Check if user doesn't have 'System Admin' role in the table
												cy.get('tbody')
													.findAllByText(email)
													.parent()
													.should('not.include.text', 'System Admin');
											}
											// Check 'System Admin'
											else {
												cy.get('input[id="SYS_ADMIN-edit"]')
													.check({ force: true })
													.then(() =>
														cy
															.get('button[type=button]')
															.contains('Edit')
															.click({ force: true })
															.intercept('GET', 'https://172.17.0.46:3000/api/users')
															.as('useGetUsers')
													);
												cy.wait('@useGetUsers')
													.its('response.statusCode')
													.should('equal', 200);
												// Check if user has 'System Admin' role in the table
												cy.get('tbody')
													.findAllByText(email)
													.parent()
													.contains('System Admin');
											}
										})
								)
						);
				} else {
					cy.get('tbody')
						.contains(email)
						.closest('tr')
						.find('td')
						.eq(6)
						.click()
						.then(() => cy.contains('Edit').should('be.disabled'));
				}
			});
	});

	it('Should block user correctly', () => {
		// Get status of user
		cy.get('tbody')
			.contains(email)
			.closest('tr')
			.find('td')
			.eq(5)
			.invoke('text')
			.then(s => {
				const status = s;
				cy.get('tbody')
					.contains(email)
					.closest('tr')
					.find('td')
					// Click to open Actions
					.eq(6)
					.click()
					.then(() => {
						if (status === 'Active') {
							// Open modal to block user
							cy.contains('Block user')
								.click()
								.then(() =>
									cy
										.get('button[type=button]')
										.contains('Block')
										.click({ force: true })
										.intercept('GET', 'https://172.17.0.46:3000/api/users')
										.as('useGetUsers')
										// Check if user is blocked in data table
										.then(() =>
											cy
												.wait('@useGetUsers')
												.its('response.statusCode')
												.should('equal', 200)
												.get('tbody')
												.contains(email)
												.closest('tr')
												.find('td')
												.eq(5)
												.contains('Blocked')
										)
								);
						}
					});
			});
	});
});
