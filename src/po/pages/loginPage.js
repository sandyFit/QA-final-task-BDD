const BasePage = require("./basePage");
const {logger} = require('../../utils/logger');

/**
 * Login Page Object Class
 * Contains all elements and actions specific to the Swag Labs login page
 */
class LoginPage extends BasePage {
    constructor() {
        super("https://www.saucedemo.com/");
        this.selectors = {
            usernameInput: "#user-name",
            passwordInput: "#password",
            loginButton: "#login-button",
            errorMessage: "[data-test='error']",
            credentialsContainer: "#login_credentials",
            passwordContainer: ".login_password"
        };
    }

    /**
     * Navigate to the login page and wait for it to fully load
     */
    async open() {
        await super.open(this.url);
    }

    async waitForPageLoad() {
        logger.info('Waiting for login page to load...');
        await super.waitForPageLoad();

        await browser.waitUntil(async () => {
            return await super.isPageDisplayed(this.selectors.usernameInput);
        }, {
            timeout: 5000,
            timeoutMsg: 'Login page did not load properly'
        });

        logger.info('✅ Login page fully loaded');
    }


    /**
     * Check login page is displayed
     */
    async isLoginPageDisplayed() {
        const isVisible = await super.isPageDisplayed(this.selectors.usernameInput);
        logger.info(`Login page visible: ${isVisible}`);
        return isVisible;
    }


    /**
     * Enter username in the username input
     * @param {string} username 
     */
    async enterUsername(username) {
        logger.info(`Username: ${username}`);
        await $(this.selectors.usernameInput).setValue(username);
    }

    /**
     * Enter password in the password input
     * @param {string} password 
     */
    async enterPassword(password) {
        if (process.env.DEBUG === 'true') {
            logger.info('Filled password field via enterPassword()');
        }
        await $(this.selectors.passwordInput).setValue(password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await $(this.selectors.loginButton).click();
    }

    /**
     * Get the current value of username field
     * @returns {string} - Current username value
     */
    async getUsernameValue() {
        return await this.getElementAttribute(this.selectors.usernameInput, 'value');
    }

    /**
     * Get the current value of password field
     * @returns {string} - Current password value
     */
    async getPasswordValue() {
        return await this.getElementAttribute(this.selectors.passwordInput, 'value');
    }

    /**
     * Check if username field is empty
     * @returns {boolean} - True if username field is empty
     */
    async isUsernameInputEmpty() {
        const value = await this.getUsernameValue();
        const isEmpty = value === '';
        logger.warn(`Username field empty: ${isEmpty}`);
        return isEmpty;
    }

    /**
     * Check if password field is empty
     * @returns {boolean} - True if password field is empty
     */
    async isPasswordInputEmpty() {
        const value = await this.getPasswordValue();
        const isEmpty = value === '';
        logger.warn(`Password field empty: ${isEmpty}`);
        return isEmpty;
    }

    
    /**
  * Clear the username input - Simple and reliable approach
  */
    async clearUsername() {
        await this.clearText(this.selectors.usernameInput);
    }

    /**
     * Clear the password input - Simple and reliable approach
     */
    async clearPassword() {
        await this.clearText(this.selectors.passwordInput);
    }

    /**
     * Clear all inputs
     */
    async clearAllInputs() {
        await this.clearUsername();
        await this.clearPassword();
    }

    /**
     * Get the current error message text
     * @returns {string} Error message shown below the form
     */
    async getErrorMessage() {
        const errorMessage = await $(this.selectors.errorMessage).getText();
        logger.info(`Error message: "${errorMessage}"`);
        return errorMessage;
    }
    
    /**
     * Check if error message is displayed
     * @returns {boolean} - True if error message is displayed
     */
    async isErrorMessageDisplayed() {
        const isDisplayed = await $(this.selectors.errorMessage).isDisplayed();
        logger.info(`Error message displayed: ${isDisplayed}`);
        return isDisplayed;
    }

    /**
     * Perform complete login action
     * @param {string|null} username - Username to use for login
     * @param {string|null} password - Password to use for login
     */
    async login(username, password) {
        if (username !== null) await this.enterUsername(username);
        if (password !== null) await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = new LoginPage();
