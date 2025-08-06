describe('Weather Forecast Homepage', () => {
  beforeEach(() => {
    cy.visit('/'); // Adjust the path to your homepage
    cy.intercept('GET', '/api/weather*', { fixture: 'current-weather.json' }).as('getWeather');
  });

  it('should display the search input', () => {
    cy.get('input#weather-search-input').should('be.visible');
  });

  it('should show current weather after searching a city', () => {
    cy.get('input#weather-search-input').type('London');
    cy.get('button[type="submit"].search-button').click();
    cy.contains('.current-day-weather .name', 'London', { timeout: 10000 }).should('be.visible');
    cy.get('.current-day-weather').should('be.visible');
  });

  it('should show error message for invalid city', () => {
    cy.get('input#weather-search-input').type('InvalidCityName123');
    cy.get('button[type="submit"]').click();
    cy.contains('.error', /error|city not found|something went wrong/i, { timeout: 10000 }).should('be.visible');
  });

  it('should allow toggling between Celsius and Fahrenheit', () => {
    cy.get('input#weather-search-input').type('London');
    cy.get('button[type="submit"]').click();
    cy.get('.unit-toggle .unit').contains('F').click();
    cy.get('.unit-toggle .unit.selected').should('contain', 'F');
    cy.get('.unit-toggle .unit').contains('C').click();
    cy.get('.unit-toggle .unit.selected').should('contain', 'C');
  });
  it('should redirect when clicking city name', () => {
    cy.get('input#weather-search-input').type('London');
    cy.get('button[type="submit"]').click();
    cy.get('.current-day-weather .name').click();
    cy.url().should('include', '/continous');
  });
});