import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log('error', err);
  console.log('runnable', runnable);
  return false;
});
