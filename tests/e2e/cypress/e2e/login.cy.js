describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve fazer login com credenciais válidas', () => {
    cy.get('[data-testid=email]').type('usuario@exemplo.com');
    cy.get('[data-testid=senha]').type('senha123');
    cy.get('[data-testid=login-button]').click();
    
    // Verifica se foi redirecionado para o dashboard
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');
  });

  it('deve mostrar erro com credenciais inválidas', () => {
    cy.get('[data-testid=email]').type('invalido@exemplo.com');
    cy.get('[data-testid=senha]').type('senhaerrada');
    cy.get('[data-testid=login-button]').click();
    
    // Verifica se a mensagem de erro aparece
    cy.get('.error-message').should('be.visible');
    cy.get('.error-message').should('contain', 'Credenciais inválidas');
  });
});
