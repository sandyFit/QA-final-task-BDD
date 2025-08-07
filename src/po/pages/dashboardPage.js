const BasePage = require('./basePage');

/**
 * DashboardPage class handles verification and actions on the
 * post-login inventory dashboard page.
 */
class DashboardPage extends BasePage {
    /**
     * Initializes the DashboardPage with its base URL
     */
    constructor() {
        super("https://www.saucedemo.com/");
    }

    /**
     * Override base waitForPageLoad to include dashboard-specific verification
     * Waits for both document ready state AND inventory container visibility
     */
    waitForPageLoad() {
        // First wait for basic page load
        super.waitForPageLoad();

        // Then wait for dashboard-specific elements
        browser.waitUntil(() => {
            return $('[data-test="inventory-container"]').isDisplayed();
        }, {
            timeout: 5000,
            timeoutMsg: 'Dashboard inventory container did not appear in time'
        });

        console.log('Dashboard page fully loaded with inventory container visible');
    }

    /**
     * Check if the dashboard is currently loaded (for verification purposes)
     * @returns {boolean} - True if the inventory container is displayed
     */
    isLoaded() {
        try {
            return $('[data-test="inventory-container"]').isDisplayed();
        } catch (error) {
            return false;
        }
    }
}

module.exports = new DashboardPage();
