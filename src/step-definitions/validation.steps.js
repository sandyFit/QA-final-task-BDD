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
Then('I should see an error if login fails', async () => {
    logger.info('Checking for login failure indicators...');

    // Verify we're still on login page using page object
    try {
        // Check if login page elements are still present
        const loginPageReady = await pages("login").isLoginPageDisplayed(); 
        expect(loginPageReady).toBe(true);
    } catch (error) {
        // Fallback: Check URL doesn't contain inventory
        const currentUrl = browser.getUrl();
        const isOnLoginPage = !currentUrl.includes('inventory');
        expect(isOnLoginPage).toBe(true);
    }

    // Error checking
    const errorDisplayed = await pages("login").isErrorMessageDisplayed();
    expect(errorDisplayed).toBe(true);

    const errorMessage = await pages("login").getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
    

    logger.info(`✅ Login failure properly handled. Error: "${errorMessage}"`);
});

