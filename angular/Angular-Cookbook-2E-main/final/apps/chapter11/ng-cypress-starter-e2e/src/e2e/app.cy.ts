import { getHeaderTitle } from '../support/app.po';

describe('ng-cypress-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the correct header title', () => {
    getHeaderTitle().should('contain.text', 'Your first Cypress test in Angular');
  });
});
