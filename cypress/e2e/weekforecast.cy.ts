describe('Week Forecast Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/3.0/onecall*', { fixture: 'weather.json' }).as('getWeekForecast');
    cy.visit('/continous', {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
        cb({ coords: { latitude: 10, longitude: 20 } });
      });
    }
  });
  });

  it('should display the week forecast container', () => {
    cy.get('.week-forecast-conainer').should('be.visible');
  });

  it('should display the title with location or "your place"', () => {
    cy.get('.week-forecast-conainer > p').should('contain.text', 'Daily weather in');
    cy.get('.week-forecast-conainer > p > b').should('contain.text', 'your place');
  });

  it('should show exactly 7 day forecast cards', () => {
    cy.get('.continous-day-weather-container', { timeout: 10000 }).should('be.visible');
    cy.get('.weather-eachday-container').should('have.length', 7);
  });


});