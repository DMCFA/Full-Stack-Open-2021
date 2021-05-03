/* eslint-disable no-trailing-spaces */
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
		describe('When logged in', function() {
			beforeEach(function() {
				cy.login({ username: 'Dinai', password: 'test123' })
			})

			it('A blog can be created', function() {
				cy.get('#addBlog').click()
				cy.get('#title').type('cypress')
				cy.get('#author').type('Dinai')
				cy.get('#url').type('http://saturn.com')
				cy.get('#create').click()
				cy.get('.head')
					.should('be.visible')
					.should('contain', 'cypress')
					.should('contain', 'Dinai')
			})

			it('User can like a blog', function() {
				cy.get('#addBlog').click()
				cy.get('#title').type('cypress')
				cy.get('#author').type('Dinai')
				cy.get('#url').type('http://saturn.com')
				cy.get('#create').click()
				cy.get('.toggleBtn').click()
				cy.get('#like').click()
				cy.contains('likes 1')
			})

			describe('delete options', function() {
				beforeEach(function() {
					cy.login({ username: 'Dinai', password: 'test123' })
					cy.createBlog({
						title: 'cypress blog',
						author: 'Jeremy',
						url: 'http://venus.com'
					})
				})
				
				it('User can delete a blog', function() {
					//LOCAL STORAGE NOT WORKING SO NEED TO LOG IN EACH TIME//
					cy.get('#username').type('Dinai')
					cy.get('#password').type('test123')
					cy.get('#login-btn').click()
					cy.get('.head')
						.should('be.visible')
						.should('contain', 'cypress blog')
						.should('contain', 'Jeremy')
					cy.get('.toggleBtn').click()
					cy.get('#remove').click()
					cy.should('not.contain', '.head')
					cy.should('not.contain', 'cypress blog')
				})
				it('Other users cannot delete blog', function() {
					//CREATE OTHER USER
					cy.createUser({
						username: 'Jeremy',
						password: 'test321'
					})

					//LOGIN AS LS NOT LOGGING IN
					cy.get('#username').type('Jeremy')
					cy.get('#password').type('test321')
					cy.get('#login-btn').click()


					//CREATE BLOG AND LOGOUT
					cy.get('#addBlog').click()
					cy.get('#title').type('Full stack open')
					cy.get('#author').type('Jer')
					cy.get('#url').type('http://rover.com')
					cy.get('#create').click()
					cy.get('#logout').click()

					//LOGIN IN AS DIFFERENT USER
					cy.get('#username').type('Dinai')
					cy.get('#password').type('test123')
					cy.get('#login-btn').click()

					cy.contains('Full stack open Jer').parent().find('button')
						.should('contain', 'view')
						.click({ multiple: true })
					cy.get('#remove').click()
					cy.get('div.message')
						.should('be.visible')
						.should('contain', 'Error updating blog')		
				})
			})
		})
	})
})