describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			username: 'Dinai',
			password: 'test123'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('Log in to application')
		cy.get('#username')
		cy.get('#password')
		cy.get('#login-btn')
	})
	describe('Login form is shown', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('Dinai')
			cy.get('#password').type('test123')
			cy.get('#login-btn').click()
			cy.contains('blogs')
		})
		it('fails with wrong credentials', function() {
			cy.get('#username').type('Dinai')
			cy.get('#password').type('test')
			cy.get('#login-btn').click()
			cy.get('div.message')
				.should('be.visible')
				.should('contain', 'Wrong credentials')
				.and('have.css', 'background', 'rgb(211, 211, 211) none repeat scroll 0% 0% / auto padding-box border-box')
		})
	})
})