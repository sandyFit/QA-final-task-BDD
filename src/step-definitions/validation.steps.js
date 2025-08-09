const { Then } = require('@wdio/cucumber-framework');
const { pages } = require('../po');
const { expect } = require('@wdio/globals');
const {logger} = require('../utils/logger');

// ✅ Dashboard redirect verification
Then('I should be redirected to the dashboard', async () => {
    logger.info('Verifying dashboard redirect...');

    // Wait for dashboard to fully load
    await pages("dashboard").waitForPageLoad();

    // Verify dashboard is ready
    const isLoaded = await pages("dashboard").isDashboardDisplayed();
    expect(isLoaded).toBe(true);

    // Verify page title is correct 
    const title = await pages("dashboard").getCurrentPageTitle();
    expect(title).toBe("Swag Labs");

    logger.info(`✅ Successfully redirected to dashboard: "${title}"`);
});

// 🆕 Login success verification using page objects
Then('login should be successful', async () => {
    logger.info('Verifying login success using page object methods...');

    // Wait until dashboard loads
    await pages("dashboard").waitForPageLoad();

    // Additional verification
    const isLoaded = await pages("dashboard").isDashboardDisplayed();
    expect(isLoaded).toBe(true);

    logger.info('✅ Login successful - dashboard loaded via page object methods.');
});

// 🔄 Error validation stays on login page
Then(/^I should see the error message "([^"]+)"$/, async (expectedMessage) => {
    logger.info(`Checking for login failure: expecting "${expectedMessage}"`);

    const loginPageReady = await pages("login").isLoginPageDisplayed();
    expect(loginPageReady).toBe(true);

    const errorDisplayed = await pages("login").isErrorMessageDisplayed();
    expect(errorDisplayed).toBe(true);

    const actualMessage = await pages("login").getErrorMessage();
    expect(actualMessage).toContain(expectedMessage); // <-- allows prefix/suffix

    logger.info(`✅ Correct error message displayed: "${actualMessage}"`);
});

// Dashboard title or error fallback
Then(/^I should see the dashboard title "([^"]+)" if login is successful or an error$/, async (expectedTitle) => {
    logger.info(`Verifying if dashboard is visible or an error is shown...`);

    const dashboardVisible = await pages("dashboard").isDashboardDisplayed();
    if (dashboardVisible) {
        const actualTitle = await pages("dashboard").getCurrentPageTitle();
        expect(actualTitle).toBe(expectedTitle);
        logger.info(`✅ Dashboard title is "${actualTitle}"`);
    } else {
        const errorDisplayed = await pages("login").isErrorMessageDisplayed();
        expect(errorDisplayed).toBe(true);
        const actualMessage = await pages("login").getErrorMessage();
        logger.info(`ℹ️ Login failed with error: "${actualMessage}"`);
    }
});
