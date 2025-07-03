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
     * Check if the dashboard (inventory) page is fully loaded
     * @returns {boolean} - True if the inventory container is displayed
     */
    isLoaded() {
        return $('[data-test="inventory-container"]').isDisplayed();
    }

    /**
     * Get the header title text (e.g., "Swag Labs")
     * @returns {string} - The text content of the logo header
     */
    getHeaderTitle() {
        return $(".app_logo").getText();
    }
}

module.exports = new DashboardPage();
