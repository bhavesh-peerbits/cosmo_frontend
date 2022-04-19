describe('isNumber Utils', () => {
	it('Its a number', () => {
		[0, 1, 2, 1, 8].forEach(n => {
			expect(Number.isInteger(n)).toEqual(true);
		});
	});

	it('Its not a number', () => {
		[false, true, NaN, [], '1a'].forEach(n => {
			expect(Number.isInteger(n)).toEqual(false);
		});
	});
});

export {};
