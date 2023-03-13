describe('login', () => {
    it('shows a login button', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.btn-outline-light').should('exist')
    });
    it('Shows Login Page', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.btn-outline-light').click()
        cy.url().should('contain', 'emulator/auth' )
    });
    it('Logs In', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.btn-outline-light').click()
        cy.url().should('contain', 'emulator/auth' )
        cy.get('#add-account-button > button > div').click();
        cy.get('#autogen-button > div').click();
        cy.get('#sign-in > span').click();
        cy.url().should('contain', 'localhost:8080' )
    });
})