/**
 * BasePage class provides shared utility methods and navigation helpers
 * for all page objects in the test suite.
 */
class BasePage {
    /**
     * @param {string} url - The base URL of the page
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Navigate to the specified URL and wait for the page to fully load
     * @param {string} url - The URL to navigate to
     */
    open(url) {
        console.log(`Navigating to: ${url}`);
        browser.url(url);
        this.waitForPageLoad();
        console.log(`Successfully navigated to: ${browser.getUrl()}`);
    }

    /**
     * Get the current page title
     * @returns {string} - The title of the current page
     */
    getCurrentPageTitle() {
        return browser.getTitle();
    }

    /**
     * Wait for the page to be fully loaded (readyState === "complete")
     * Throws an error if the page doesn't load within the timeout
     */
    waitForPageLoad() {
        browser.waitUntil(() => {
            return browser.execute(() => document.readyState === "complete");
        }, {
            timeout: 2000,
            timeoutMsg: 'Page did not load in time'
        });
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
        await el.setValue(''); // This is the ONLY reliable way for SauceDemo
        console.log(`✅ Successfully cleared field: ${selector}`);
    }

    /**
     * Get text content from a given element
     * @param {string} selector - The selector of the element
     * @returns {string} - The text content of the element
     */
    getElementText(selector) {
        const el = $(selector);
        el.waitForDisplayed();
        return el.getText();
    }

    /**
    * Get attribute value of an element
    * @param selector - CSS selector of the element
    * @param attribute - Attribute name
    * @returns {string} - Attribute value
    */
    async getElementAttribute(selector, attribute) {
        console.log(`🏷️ Getting attribute '${attribute}' from element: ${selector}`)
        try {
            const element = await $(selector)
            await element.waitForDisplayed({ timeout: 5000 })
            const value = await element.getAttribute(attribute)
            const attributeValue = value || ''
            console.log(`Attribute '${attribute}' value: "${attributeValue}"`)
            return attributeValue
        } catch (error) {
            console.log(`Failed to get attribute '${attribute}' from ${selector}: ${error}`)
            throw new Error(`Unable to get attribute '${attribute}' from element '${selector}': ${error}`)
        }
    }
}

module.exports = BasePage;
