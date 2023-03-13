describe("It should create a kid", () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
        cy.get('#welcome-email').should('exist').should('contain.text', 'Logged in as')
    })
    it('adds a new kid', {
        defaultCommandTimeout: 30000
    }, () => {
        cy.get('.modal-header').should('not.exist')
        cy.get('#add-kid-btn').should('exist').click()
        cy.get('.modal-header').should('be.visible')
        let kidName = 'kid'+new Date().getTime();
        cy.get('#name').type(kidName)
        cy.get('#initialSpend').type('55')
        cy.get('#initialShare').type('66')
        cy.get('#initialSave').type('77')
        cy.get('#add-kid-confirm').click()
        cy.get('.d-block:last-child').should('contain.text', kidName)
    })
})