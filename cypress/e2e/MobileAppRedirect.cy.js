describe('Get App Overlay Module', () => {

  // Runs before each test case
  // Navigates to the homepage to ensure a clean starting state
  beforeEach(() => {
    cy.visit('/')   // homepage
  })

  it('should load the primary module when homepage loads', () => {
    // Verify primary overlay is visible on initial load
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
    // Secondary overlay should not exist yet
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
  })

  it('should open secondary module when primary module is clicked', () => {
    // Ensure primary overlay is visible, then click it
    cy.get('[data-testid="get-app-overlay"]').should('be.visible').click()
    // Secondary overlay should now appear
    cy.get('[data-testid="secondary-overlay"]').should('be.visible')
    // Primary overlay should remain visible
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
    
  })

  it('should close secondary module when X is clicked but keep primary open', () => {
    // Open secondary overlay first
    cy.get('[data-testid="get-app-overlay"]').should('be.visible').click()
    cy.get('[data-testid="secondary-overlay"]').should('be.visible')

    // Click the close button on the secondary overlay
    cy.get('[data-testid="secondary-close"]').click()

    // Secondary overlay should be removed
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
    // Primary overlay should still be visible
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
  })

  it('should close entire module when primary X is clicked', () => {
    // Ensure primary overlay is visible
    cy.get('[data-testid="get-app-overlay"]').should('be.visible')
    // Click primary close button
    cy.get('[data-testid="primary-close"]').click()
    // Both overlays should be removed
    cy.get('[data-testid="get-app-overlay"]').should('not.exist')
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
  })

  it('should close both modules when primary X is clicked', () => {
    // Open secondary overlay
    cy.get('[data-testid="get-app-overlay"]').should('be.visible').click()
    cy.get('[data-testid="secondary-overlay"]').should('be.visible')
    // Click primary close button
    cy.get('[data-testid="primary-close"]').click()
    // Both overlays should be removed regardless of state
    cy.get('[data-testid="get-app-overlay"]').should('not.exist')
    cy.get('[data-testid="secondary-overlay"]').should('not.exist')
  })

})