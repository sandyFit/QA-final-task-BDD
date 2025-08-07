const BasePage = require('./basePage');
const {logger} = require('../../utils/logger');

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

        // Define dashboard-specific selectors
        this.selectors = {
            inventoryContainer: '[data-test="inventory-container"]',
            inventoryList: '[data-test="inventory-list"]',
            shoppingCartBadge: '[data-test="shopping-cart-badge"]',
            menuButton: '[data-test="react-burger-menu-btn"]'
        };
    }

    /**
     * Override base waitForPageLoad to include dashboard-specific verification
     * Waits for both document ready state AND inventory container visibility
     */
    async waitForPageLoad() {
        logger.info('Waiting for dashboard page to load...');

        // First wait for basic page load
        await super.waitForPageLoad();

        // Then wait for dashboard-specific elements using BasePage method
        await browser.waitUntil(async () => {
            return await super.isPageDisplayed(this.selectors.inventoryContainer);
        }, {
            timeout: 10000,
            timeoutMsg: 'Dashboard inventory container did not appear in time'
        });

        logger.info('✅ Dashboard page fully loaded with inventory container visible');
    }

    /**
     * Check if the dashboard is currently loaded (for verification purposes)
     * Uses BasePage isPageDisplayed method for consistency
     * @returns {Promise<boolean>} - True if the inventory container is displayed
     */
    async isDashboardDisplayed() {
        logger.info('Checking if dashboard is loaded...');
        const isDisplayed = await super.isPageDisplayed(this.selectors.inventoryContainer);
        logger.info(`Dashboard loaded status: ${isDisplayed}`);
        return isDisplayed;
    }

    /**
     * Get the current page title
     * @returns {Promise<string>} - The page title
     */
    async getCurrentPageTitle() {
        try {
            const title = await super.getCurrentPageTitle();
            logger.info(`Dashboard page title: "${title}"`);
            return title;
        } catch (error) {
            logger.error(`Error getting page title: ${error.message}`);
            throw new Error(`Failed to get dashboard page title: ${error.message}`);
        }
    }
}

module.exports = new DashboardPage();
