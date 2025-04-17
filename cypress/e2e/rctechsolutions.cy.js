describe('RC Tech Solutions - Homepage Test', () => {
    it('Should visit homepage and verify key elements', () => {
      cy.visit('https://www.rctechsolutions.com');
  
      // ✅ Check title contains
      cy.title().should('include', 'RC Tech Solutions');
  
      // ✅ Check navbar visibility
      cy.get('nav').should('be.visible');
  
      // ✅ Check for Hero section text
      cy.contains('Your Digital Partner').should('be.visible');
  
      // ✅ Check for presence of a service
      cy.contains('Web Development').should('exist');
  
      // ✅ Check footer is there
      cy.get('footer').should('be.visible');
    });
  });
  