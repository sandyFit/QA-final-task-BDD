const {logger} = require('../../utils/logger');

class BasePage {
    /**
     * @param {string} url - The base URL of the page
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Get current URL
     * @returns {Promise<string>} - Current page URL
     */
    async getCurrentUrl() {
        return await browser.getUrl();
    }

    /**
     * Navigate to the specified URL and wait for the page to fully load
     * @param {string} url - The URL to navigate to
     */
    open(url) {
        logger.info(`Navigating to: ${url}`);
        browser.url(url);
        this.waitForPageLoad();
        logger.info(`Successfully navigated to: ${browser.getUrl()}`);
    }

    /**
     * Check if a specific page element is displayed
     * Should be overridden by subclasses to check page-specific elements
     * @param {string} selector - The selector of the element to check (optional)
     * @returns {boolean} - True if the page/element is displayed
     */
    isPageDisplayed(selector = null) {
        if (!selector) {
            logger.warn('isPageDisplayed called without selector - subclass should override this method');
            return true; // Base implementation assumes page is displayed
        }

        try {
            const element = $(selector);
            const isVisible = element.isDisplayed();

            if (isVisible) {
                logger.info(`✅ Element '${selector}' is displayed on the page.`);
            } else {
                logger.warn(`❌ Element '${selector}' is not displayed.`);
            }

            return isVisible;
        } catch (error) {
            logger.error(`❌ Error checking element '${selector}': ${error.message}`);
            return false;
        }
    }

    /**
     * Get the current page title
     * @returns {Promise<string>} - The title of the current page
     */
    async getCurrentPageTitle() {
        return await browser.getTitle();
    }

    /**
     * Wait for the page to be fully loaded (readyState === "complete")
     * Can be overridden by subclasses for page-specific loading verification
     * Throws an error if the page doesn't load within the timeout
     */
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await browser.execute(() => document.readyState === "complete");
        }, {
            timeout: 5000, // Increased from 2000 for better reliability
            timeoutMsg: 'Page did not load in time'
        });
        logger.info('✅ Page loaded successfully');
    }


    /**
     * Type text into a given element (input field)
     * @param {string} selector - The selector of the input element
     * @param {string} text - The text to type into the input
     */
    typeText(selector, text) {
        const el = $(selector);
        el.waitForDisplayed();
        el.setValue(text);
    }

    /**
     * Clear the value of a given input field - WORKING VERSION FOR SAUCEDEMO
     * @param {string} selector - The selector of the input element
    */
    async clearText(selector) {
        const el = await $(selector);
        await el.waitForDisplayed();
        await el.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        logger.info(`✅ Successfully cleared field: ${selector}`);
    }

    /**
     * Get text content from a given element
    * @param { string } selector - The selector of the element
    * @returns { Promise < string >} - The text content of the element
    */
    async getElementText(selector) {
    logger.info(`Getting text from element: ${selector}`);
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 5000 });
    const text = await el.getText();
    logger.info(`✅ Text retrieved from ${selector}: "${text}"`);
    return text;
}


    /**
    * Get attribute value of an element
    * @param selector - CSS selector of the element
    * @param attribute - Attribute name
    * @returns {string} - Attribute value
    */
    async getElementAttribute(selector, attribute) {
        logger.info(`Getting attribute '${attribute}' from element: ${selector}`)
        try {
            const element = await $(selector)
            await element.waitForDisplayed({ timeout: 5000 })
            const value = await element.getAttribute(attribute)
            const attributeValue = value || ''
            logger.info(`Attribute '${attribute}' value: "${attributeValue}"`)
            return attributeValue
        } catch (error) {
            logger.error(`Failed to get attribute '${attribute}' from ${selector}: ${error}`)
            throw new Error(`Unable to get attribute '${attribute}' from element '${selector}': ${error}`)
        }
    }
}

module.exports = BasePage;

