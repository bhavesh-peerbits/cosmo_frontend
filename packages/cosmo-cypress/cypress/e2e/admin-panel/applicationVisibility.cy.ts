/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/require-data-selectors */
/* eslint-disable cypress/no-force */

describe('Application Visibility', () => {
	beforeEach(() => {
		cy.viewport('macbook-13');
		cy.login();
		cy.visit('/admin/applications-visibility');
		cy.contains('Items per page')
			.parent()
			.children()
			.eq(1)
			.find('.cds--select-input')
			.select('50');
	});

	it('Should correctly search application by name', () => {
		let totalApps = 0;
		cy.contains('Items per page')
			.parent()
			.children()
			.eq(1)
			.find('.cds--select-input')
			.select('50');
		cy.get('tbody')
			.find('tr')
			.first()
			.find('td')
			.first()
			.invoke('text')
			.then(text => {
				const applicationName = text;
				cy.get('tbody')
					.find('tr')
					.each(row => {
						if (row.find('td').eq(0).text().includes(text)) {
							totalApps += 1;
						}
					})
					.then(() =>
						cy
							.get('input[id="search"]')
							.type(applicationName)
							.then(() => cy.get('tbody').find('tr').should('have.length', totalApps))
					);
			});
		cy.get('[aria-label="Clear search input"]').click();
	});

	it('Should assign a user to an application correctly', () => {
		const usersListModal = '.block>div>div>div>div>div>div';
		const usersCheckbox = '.block>div>div>div>div>div>div>div>input';

		cy.intercept('GET', '/api/users/admin/applications/*').as('applicationUsers');
		cy.get('tbody').find('tr').first().find('td').eq(3).find('button').click();
		cy.wait('@applicationUsers').its('response.statusCode').should('equal', 200);
		cy.get(usersListModal)
			.first()
			.children()
			.eq(1)
			.children()
			.eq(1)
			.children()
			.eq(1)
			.invoke('text')
			.then(text => {
				const userEmail = text;
				cy.get(usersCheckbox)
					.first()
					.invoke('is', ':checked')
					.then(checked => {
						if (checked) {
							// Uncheck
							cy.get(usersCheckbox)
								.first()
								.uncheck({ force: true })
								.then(() => {
									// Verify that the user is not present in the right panel
									cy.get('.cds--accordion__item').should('not.include.text', userEmail);
								});
						} else {
							// Check
							cy.get(usersCheckbox)
								.first()
								.check({ force: true })
								.then(() => {
									// Verify that the user is present in the right panel
									cy.get('.cds--accordion__item').contains(userEmail);
								});
						}
					});
				cy.get('.cds--tag--gray')
					.invoke('text')
					.then(totalUsers => {
						if (totalUsers === '0') {
							cy.get('button[type=button]').contains('Save').should('be.disabled');
							cy.get('button[type=button]').contains('Cancel').click({ force: true });
						} else {
							cy.get('button[type=button]').contains('Save').click({ force: true });
						}
					});
				cy.get('.block').should('not.be.visible');
			});
	});

	it('Should order applications name correctly', () => {
		const startingApplications: string[] = [];
		cy.get('tbody')
			.find('tr')
			.each(row => {
				startingApplications.push(row.find('td').eq(0).text());
			});
		cy.get('thead')
			.find('tr')
			.find('th')
			.first()
			.find('button')
			.click({ force: true })
			.parent()
			.invoke('attr', 'aria-sort')
			.then(sort => {
				const sortedApplications: string[] = [];
				cy.get('tbody')
					.find('tr')
					.each(row => {
						sortedApplications.push(row.find('td').eq(0).text());
					});
				if (sort === 'ascending') {
					const isCorrectlySorted = sortedApplications.every(
						(value, index) => value === startingApplications.sort()[index]
					);
					expect(isCorrectlySorted).equal(true);
				}
			});
		cy.get('thead')
			.find('tr')
			.find('th')
			.first()
			.find('button')
			.click({ force: true })
			.parent()
			.invoke('attr', 'aria-sort')
			.then(sort => {
				const sortedApplications: string[] = [];
				cy.get('tbody')
					.find('tr')
					.each(row => {
						sortedApplications.push(row.find('td').eq(0).text());
					});
				if (sort === 'descending') {
					const isCorrectlySorted = sortedApplications.every(
						(value, index) => value === startingApplications.sort().reverse()[index]
					);
					expect(isCorrectlySorted).equal(true);
				}
			});
	});
});
