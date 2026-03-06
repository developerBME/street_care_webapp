describe('Get App Overlay Module', () => {

  beforeEach(() => {
    cy.visit('/')   // homepage
  })

  it('should load the primary module when homepage loads', () => {
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
  })

  it('should open secondary module when primary module is clicked', () => {
    cy.get('[data-testid="get-app-overlay"]').should('be.visible').click()
    cy.get('[data-testid="secondary-overlay"]').should('be.visible')
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
    
  })

  it('should close secondary module when X is clicked but keep primary open', () => {
    cy.get('[data-testid="get-app-overlay"]').should('be.visible').click()
    cy.get('[data-testid="secondary-overlay"]').should('be.visible')

    cy.get('[data-testid="secondary-close"]').click()

    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
  })

  it('should close entire module when primary X is clicked', () => {
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
    cy.get('[data-testid="primary-close"]').click()
    cy.get('[data-testid="get-app-overlay"]').should('not.exist')
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
  })

  it('should close both modules when primary X is clicked', () => {
    cy.get('[data-testid="get-app-overlay"]').should('be.visible').click()
    cy.get('[data-testid="secondary-overlay"]').should('be.visible')
    cy.get('[data-testid="primary-close"]').click()

    cy.get('[data-testid="get-app-overlay"]').should('not.exist')
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
  })

})