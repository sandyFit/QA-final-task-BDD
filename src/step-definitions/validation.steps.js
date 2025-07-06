const { Then } = require('@wdio/cucumber-framework');
const { pages } = require('../po');
const { expect } = require('@wdio/globals');

Then('I should see the error message {string}', async (expectedMsg) => {
    const actualMessage = await pages("login").getErrorMessage();
    expect(actualMessage).toContain(expectedMsg);
});

Then('I should see the dashboard title "Swag Labs" if login is successful or an error', async () => {
    const errorDisplayed = await pages("login").isErrorMessageDisplayed();

    if (errorDisplayed) {
        const msg = await pages("login").getErrorMessage();
        console.log(`❌ Login failed with error: ${msg}`);
        expect(msg.length).toBeGreaterThan(0);
    } else {
        const title = await pages("dashboard").getCurrentPageTitle();
        console.log(`✅ Login successful, dashboard title: ${title}`);
        expect(title).toBe("Swag Labs");
        await browser.reloadSession();
    }
});

