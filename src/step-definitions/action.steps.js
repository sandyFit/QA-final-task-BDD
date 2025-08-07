const { Given, When } = require('@wdio/cucumber-framework');
const { pages } = require('../po');
const {logger} = require('../utils/logger');

Given('I open the login page', async () => {
    logger.info('Opening the login page...');
    await pages("login").open();
    logger.info('✅ Login page opened.');
});

When('I enter username {string}', async (username) => {
    logger.info(`Entering username: "${username}"`);
    await pages("login").enterUsername(username);
    logger.info('✅ Username entered.');
});

When('I enter password {string}', async (password) => {
    logger.info(`Entering password: "${'*'.repeat(password.length)}"`);
    await pages("login").enterPassword(password);
    logger.info('✅ Password entered.');
});

When('I clear the username and password fields', async () => {
    logger.info('Clearing both username and password fields...');
    await pages("login").clearAllInputs();
    logger.info('✅ Fields cleared.');
});

When('I clear the password field', async () => {
    logger.info('Clearing password field...');
    await pages("login").clearPassword();
    logger.info('✅ Password field cleared.');
});

When('I click the login button', async () => {
    logger.info('Clicking the login button...');
    await pages("login").clickLoginButton();
    logger.info('✅ Login button clicked.');
});

