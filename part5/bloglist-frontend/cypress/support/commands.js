//CREATE USER
Cypress.Commands.add('createUser', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/users', {
		username, password
	})
	cy.visit('http://localhost:3000')
})

//LOGIN USER
Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username, password
	}).then(({ body }) => {
		localStorage.setItem('loggedBlogUser', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})

//ADD BLOG
Cypress.Commands.add('createBlog', ({ title, author, url }) => {
	cy.request({
		url: 'http://localhost:3003/api/blogs',
		method: 'POST',
		body: { title, author, url },
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
		}
	})

	cy.visit('http://localhost:3000')
})