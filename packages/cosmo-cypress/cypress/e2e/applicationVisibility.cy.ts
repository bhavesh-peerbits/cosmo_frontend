/* eslint-disable cypress/no-force */
/* eslint-disable cypress/require-data-selectors */
describe('Application Visibility', () => {
	beforeEach(() => {
		cy.viewport('macbook-13');
	});

	it('Should render the application visibility page correctly', () => {
		cy.visit('/');
		cy.contains('Admin').click();
		cy.location('pathname').should('eq', `/admin`);
		cy.contains('Applications Visibility').click();
		cy.location('pathname').should('eq', `/admin/applications-visibility`);
	});

	it('Should correctly search application by name', () => {
		let totalApps = 0;
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
		cy.intercept('GET', 'https://172.17.0.46:3000/api/applications').as(
			'useGetApplications'
		);
		cy.wait('@useGetApplications').its('response.statusCode').should('equal', 200);
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.get('tbody')
			.find('tr')
			.first()
			.find('td')
			.eq(3)
			.click()
			.wait(1000)
			.then(() =>
				cy
					.get('.block>div>div>div>div>div>div')
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
						cy.get('.block>div>div>div>div>div>div>div>input')
							.first()
							.invoke('is', ':checked')
							.then(checked => {
								if (checked) {
									// Uncheck
									cy.get('.block>div>div>div>div>div>div>div>input')
										.first()
										.uncheck({ force: true })
										.then(() => {
											// Verify that the user is not present in the right panel
											cy.get('.cds--accordion__item').should(
												'not.include.text',
												userEmail
											);
										});
								} else {
									// Check
									cy.get('.block>div>div>div>div>div>div>div>input')
										.first()
										.check({ force: true })
										.then(() => {
											// Verify that the user is present in the right panel
											cy.get('.cds--accordion__item').contains(userEmail);
										});
								}
							});
					})
			);
	});

	it('Should submit application assignment correctly', () => {
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
