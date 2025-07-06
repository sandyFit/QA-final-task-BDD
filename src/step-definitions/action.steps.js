const { Given, When } = require('@wdio/cucumber-framework');
const { pages } = require('../po');

Given('I open the login page', async () => {
    console.log('Opening the login page...');
    await pages("login").open();
    console.log('✅ Login page opened.');
});

When('I enter username {string}', async (username) => {
    console.log(`Entering username: "${username}"`);
    await pages("login").enterUsername(username);
    console.log('✅ Username entered.');
});

When('I enter password {string}', async (password) => {
    console.log(`Entering password: "${'*'.repeat(password.length)}"`);
    await pages("login").enterPassword(password);
    console.log('✅ Password entered.');
});

When('I clear the username and password fields', async () => {
    console.log('Clearing both username and password fields...');
    await pages("login").clearAllInputs();
    console.log('✅ Fields cleared.');
});

When('I clear the password field', async () => {
    console.log('Clearing password field...');
    await pages("login").clearPassword();
    console.log('✅ Password field cleared.');
});

When('I click the login button', async () => {
    console.log('Clicking the login button...');
    await pages("login").clickLoginButton();
    console.log('✅ Login button clicked.');
});

