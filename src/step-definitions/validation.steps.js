const { Then } = require('@wdio/cucumber-framework');
const { pages } = require('../po');
const { expect } = require('@wdio/globals');

Then('I should see the error message {string}', async (expectedMsg) => {
    console.log(`Validating error message: "${expectedMsg}"`);
    const actualMessage = await pages("login").getErrorMessage();
    console.log(`✅ Actual message received: "${actualMessage}"`);
    expect(actualMessage).toContain(expectedMsg);
    console.log('✅ Error message validation passed.');
});

Then('I should see the dashboard title "Swag Labs" if login is successful or an error', async () => {
    const errorDisplayed = await pages("login").isErrorMessageDisplayed();

    if (errorDisplayed) {
        const msg = await pages("login").getErrorMessage();
        console.log(`❌ Login failed — error message shown: "${msg}"`);
        expect(msg.length).toBeGreaterThan(0);
        console.log('✅ Error scenario validated.');
    } else {
        const title = await pages("dashboard").getCurrentPageTitle();
        console.log(`✅ Login successful — page title is: "${title}"`);
        expect(title).toBe("Swag Labs");
        console.log('✅ Dashboard title validation passed.');
        await browser.reloadSession();
    }
});

