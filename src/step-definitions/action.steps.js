const { Given, When } = require('@wdio/cucumber-framework');
const { pages } = require('../po');

Given('I open the login page', async () => {
    await pages("login").open();
});

When('I enter username {string}', async (username) => {
    await pages("login").enterUsername(username);
});

When('I enter password {string}', async (password) => {
    await pages("login").enterPassword(password);
});

When('I clear the username and password fields', async () => {
    await pages("login").clearAllInputs();
});

When('I clear the password field', async () => {
    await pages("login").clearPassword();
});

When('I click the login button', async () => {
    await pages("login").clickLoginButton();
});
