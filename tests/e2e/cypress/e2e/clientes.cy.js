describe('Gerenciamento de Clientes', () => {
  beforeEach(() => {
    // Fazer login antes de cada teste
    cy.visit('/login');
    cy.get('[data-testid=email]').type('usuario@exemplo.com');
    cy.get('[data-testid=senha]').type('senha123');
    cy.get('[data-testid=login-button]').click();
    
    // Navegar para a página de clientes
    cy.visit('/clientes');
  });

  it('deve listar clientes', () => {
    cy.get('.cliente-item').should('have.length.at.least', 1);
  });

  it('deve criar um novo cliente', () => {
    cy.get('[data-testid=novo-cliente-btn]').click();
    
    // Preencher formulário
    cy.get('[data-testid=nome]').type('Cliente E2E');
    cy.get('[data-testid=email]').type('cliente-e2e@exemplo.com');
    cy.get('[data-testid=telefone]').type('11999999999');
    
    // Enviar formulário
    cy.get('[data-testid=salvar-btn]').click();
    
    // Verificar se o cliente foi adicionado à lista
    cy.get('.cliente-item').contains('Cliente E2E').should('be.visible');
  });

  it('deve editar um cliente existente', () => {
    // Clicar no botão de editar do primeiro cliente
    cy.get('.cliente-item').first().find('[data-testid=editar-btn]').click();
    
    // Modificar o nome
    cy.get('[data-testid=nome]').clear().type('Cliente Editado');
    
    // Salvar alterações
    cy.get('[data-testid=salvar-btn]').click();
    
    // Verificar se o cliente foi atualizado
    cy.get('.cliente-item').contains('Cliente Editado').should('be.visible');
  });
});
